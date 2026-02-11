import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material';
import { loadImage, prepareIcon } from './mapUtil';

import directionSvg from '../../resources/images/direction.svg';
import backgroundSvg from '../../resources/images/background.svg';
import animalSvg from '../../resources/images/icon/animal.svg';
import bicycleSvg from '../../resources/images/icon/bicycle.svg';
import boatSvg from '../../resources/images/icon/boat.svg';
import busSvg from '../../resources/images/icon/bus.svg';
import carSvg from '../../resources/images/icon/car.svg';
import camperSvg from '../../resources/images/icon/camper.svg';
import craneSvg from '../../resources/images/icon/crane.svg';
import defaultSvg from '../../resources/images/icon/default.svg';
import startSvg from '../../resources/images/icon/start.svg';
import finishSvg from '../../resources/images/icon/finish.svg';
import helicopterSvg from '../../resources/images/icon/helicopter.svg';
import motorcycleSvg from '../../resources/images/icon/motorcycle.svg';
import personSvg from '../../resources/images/icon/person.svg';
import planeSvg from '../../resources/images/icon/plane.svg';
import scooterSvg from '../../resources/images/icon/scooter.svg';
import shipSvg from '../../resources/images/icon/ship.svg';
import tractorSvg from '../../resources/images/icon/tractor.svg';
import trailerSvg from '../../resources/images/icon/trailer.svg';
import trainSvg from '../../resources/images/icon/train.svg';
import tramSvg from '../../resources/images/icon/tram.svg';
import truckSvg from '../../resources/images/icon/truck.svg';
import vanSvg from '../../resources/images/icon/van.svg';

export const mapIcons = {
  animal: animalSvg,
  bicycle: bicycleSvg,
  boat: boatSvg,
  bus: busSvg,
  car: carSvg,
  camper: camperSvg,
  crane: craneSvg,
  default: defaultSvg,
  finish: finishSvg,
  helicopter: helicopterSvg,
  motorcycle: motorcycleSvg,
  person: personSvg,
  plane: planeSvg,
  scooter: scooterSvg,
  ship: shipSvg,
  start: startSvg,
  tractor: tractorSvg,
  trailer: trailerSvg,
  train: trainSvg,
  tram: tramSvg,
  truck: truckSvg,
  van: vanSvg,
};

// Ensure imported asset modules expose a string URL (handle ESM module objects)
Object.keys(mapIcons).forEach((k) => {
  const v = mapIcons[k];
  mapIcons[k] = (v && typeof v === 'object' && 'default' in v) ? v.default : v;
});

const resolveIconUrl = (icon) => {
  if (!icon) return mapIcons.default;
  if (typeof icon === 'string') return icon;
  if (typeof icon === 'object' && 'default' in icon) return icon.default;
  return mapIcons.default;
};

export const getMapIcon = (category) => {
  const key = mapIconKey(category);
  return resolveIconUrl(mapIcons[key]);
};

export const mapIconKey = (category) => {
  switch (category) {
    case 'offroad':
    case 'pickup':
      return 'car';
    case 'trolleybus':
      return 'bus';
    default:
      return mapIcons.hasOwnProperty(category) ? category : 'default';
  }
};

export const mapImages = {};

const theme = createTheme({
  palette: {
    neutral: { main: grey[500] },
  },
});

export default async () => {
  // Resolve possible ESM module objects for background/direction
  const resolve = (v) => (v && typeof v === 'object' && 'default' in v) ? v.default : v;
  const bgUrl = resolve(backgroundSvg);
  const dirUrl = resolve(directionSvg);

  let background = null;
  try {
    background = await loadImage(bgUrl);
  } catch (e) {
     
    console.warn('preloadImages: failed to load background image', e);
    // Create a tiny fallback canvas as background
    const c = document.createElement('canvas');
    c.width = 32 * devicePixelRatio;
    c.height = 32 * devicePixelRatio;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);
    background = c;
  }

  try {
    mapImages.background = await prepareIcon(background);
  } catch (e) {
     
    console.warn('preloadImages: prepareIcon(background) failed', e);
    mapImages.background = await prepareIcon(background);
  }

  try {
    const dirImg = await loadImage(dirUrl);
    mapImages.direction = await prepareIcon(dirImg);
  } catch (e) {
     
    console.warn('preloadImages: failed to load direction image', e);
    mapImages.direction = await prepareIcon(background);
  }

  // Ensure we create entries for every category-color combination,
  // falling back to background-only icon if the specific icon fails to load.
  await Promise.all(Object.keys(mapIcons).map(async (category) => {
    const results = [];
    ['info', 'success', 'error', 'neutral'].forEach((color) => {
      results.push((async () => {
        try {
          const iconUrl = mapIcons[category];
          const icon = await loadImage(iconUrl);
          mapImages[`${category}-${color}`] = prepareIcon(background, icon, theme.palette[color].main);
        } catch (e) {
           
          console.warn(`preloadImages: failed to load icon for ${category}-${color}`, e);
          // Fallback to background with tint
          mapImages[`${category}-${color}`] = prepareIcon(background, null, theme.palette[color].main);
        }
      })());
    });
    await Promise.all(results);
  }));
};
