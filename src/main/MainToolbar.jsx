import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Toolbar, IconButton, OutlinedInput, InputAdornment, Popover, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Badge, ListItemButton, ListItemText, Tooltip, Box, Switch, Stack,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import DnsIcon from '@mui/icons-material/Dns';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useDeviceReadonly } from '../common/util/permissions';
import { sessionActions } from '../store';
import { useCatch } from '../reactHelper';
import fetchOrThrow from '../common/util/fetchOrThrow';
import DeviceRow from './DeviceRow';

const useStyles = makeStyles()((theme) => ({
  toolbar: {
    display: 'flex',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    padding: `${theme.tokens?.spacing ? theme.tokens.spacing(1.5) : theme.spacing(1.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2)}`,
    backgroundColor: theme.palette.mode === 'dark' 
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
      : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.gray?.[50] || '#f5f5f5'} 100%)`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.tokens?.shadows?.xs || 'none',
    alignItems: 'center',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
  searchInput: {
    borderRadius: theme.tokens?.borderRadius?.lg || 12,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`,
    transition: theme.tokens?.transition?.base || 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.tokens?.shadows?.md || `0 0 0 4px ${theme.palette.primary.main}30`,
    },
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    gap: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    width: theme.tokens?.drawer?.widthTablet || theme.dimensions.drawerWidthTablet,
  },
  filterButton: {
    transition: theme.tokens?.transition?.base || 'all 250ms',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  iconButton: {
    transition: theme.tokens?.transition?.base || 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    color: theme.palette.text.primary,
    borderRadius: theme.tokens?.borderRadius?.lg || 10,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'scale(1.05)',
    },
  },
  themeSwitch: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
    padding: `${theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)}`,
    borderRadius: theme.tokens?.borderRadius?.lg || 12,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    boxShadow: theme.tokens?.shadows?.sm || 'none',
  },
  themeLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    minWidth: 30,
    color: theme.palette.text.primary,
  },
}));

const MainToolbar = ({
  filteredDevices,
  devicesOpen,
  setDevicesOpen,
  keyword,
  setKeyword,
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  filterMap,
  setFilterMap,
}) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslation();

  const deviceReadonly = useDeviceReadonly();
  const user = useSelector((state) => state.session.user);

  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);

  const toolbarRef = useRef();
  const inputRef = useRef();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [devicesAnchorEl, setDevicesAnchorEl] = useState(null);

  const deviceStatusCount = (status) => Object.values(devices).filter((d) => d.status === status).length;

  const handleThemeToggle = useCatch(async () => {
    const newDarkMode = theme.palette.mode === 'light';
    const updatedUser = {
      ...user,
      attributes: {
        ...user.attributes,
        darkMode: newDarkMode,
      },
    };
    const response = await fetchOrThrow(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    dispatch(sessionActions.updateUser(await response.json()));
  });

  return (
    <Toolbar ref={toolbarRef} className={classes.toolbar}>
      <Box className={classes.logoBox}>
        <Box
          component="img"
          src="/logo.svg"
          alt="Logo"
          sx={{
            height: '100%',
            aspectRatio: '1',
            filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'brightness(0.8)',
            transition: 'filter 250ms ease-in-out',
          }}
        />
      </Box>
      <IconButton
        edge="start"
        onClick={() => setDevicesOpen(!devicesOpen)}
        className={classes.iconButton}
      >
        {devicesOpen ? <MapIcon /> : <DnsIcon />}
      </IconButton>
      <OutlinedInput
        ref={inputRef}
        placeholder={t('sharedSearchDevices')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setDevicesAnchorEl(toolbarRef.current)}
        onBlur={() => setDevicesAnchorEl(null)}
        className={classes.searchInput}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              onClick={() => setFilterAnchorEl(inputRef.current)}
              className={classes.filterButton}
            >
              <Badge color="info" variant="dot" invisible={!filter.statuses.length && !filter.groups.length}>
                <TuneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </InputAdornment>
        )}
        size="small"
        fullWidth
      />
      <Popover
        open={!!devicesAnchorEl && !devicesOpen}
        anchorEl={devicesAnchorEl}
        onClose={() => setDevicesAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: Number(theme.spacing(2).slice(0, -2)),
        }}
        marginThreshold={0}
        slotProps={{
          paper: {
            style: { width: `calc(${toolbarRef.current?.clientWidth}px - ${theme.spacing(4)})` },
          },
        }}
        elevation={1}
        disableAutoFocus
        disableEnforceFocus
      >
        {filteredDevices.slice(0, 3).map((_, index) => (
          <DeviceRow key={filteredDevices[index].id} devices={filteredDevices} index={index} />
        ))}
        {filteredDevices.length > 3 && (
          <ListItemButton alignItems="center" onClick={() => setDevicesOpen(true)}>
            <ListItemText
              primary={t('notificationAlways')}
              style={{ textAlign: 'center' }}
            />
          </ListItemButton>
        )}
      </Popover>
      <Popover
        open={!!filterAnchorEl}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={classes.filterPanel}>
          <FormControl>
            <InputLabel>{t('deviceStatus')}</InputLabel>
            <Select
              label={t('deviceStatus')}
              value={filter.statuses}
              onChange={(e) => setFilter({ ...filter, statuses: e.target.value })}
              multiple
            >
              <MenuItem value="online">{`${t('deviceStatusOnline')} (${deviceStatusCount('online')})`}</MenuItem>
              <MenuItem value="offline">{`${t('deviceStatusOffline')} (${deviceStatusCount('offline')})`}</MenuItem>
              <MenuItem value="unknown">{`${t('deviceStatusUnknown')} (${deviceStatusCount('unknown')})`}</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>{t('settingsGroups')}</InputLabel>
            <Select
              label={t('settingsGroups')}
              value={filter.groups}
              onChange={(e) => setFilter({ ...filter, groups: e.target.value })}
              multiple
            >
              {Object.values(groups).sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>{t('sharedSortBy')}</InputLabel>
            <Select
              label={t('sharedSortBy')}
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">{'\u00a0'}</MenuItem>
              <MenuItem value="name">{t('sharedName')}</MenuItem>
              <MenuItem value="lastUpdate">{t('deviceLastUpdate')}</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filterMap} onChange={(e) => setFilterMap(e.target.checked)} />}
              label={t('sharedFilterMap')}
            />
          </FormGroup>
        </div>
      </Popover>
      <IconButton
        edge="end"
        onClick={() => router.push('/settings/device')}
        disabled={deviceReadonly}
        className={classes.iconButton}
      >
        <Tooltip open={!deviceReadonly && Object.keys(devices).length === 0} title={t('deviceRegisterFirst')} arrow>
          <AddIcon />
        </Tooltip>
      </IconButton>
      <Stack direction="row" alignItems="center" className={classes.themeSwitch}>
        <LightModeIcon sx={{ fontSize: 16, opacity: theme.palette.mode === 'light' ? 1 : 0.4 }} />
        <Switch
          size="small"
          checked={theme.palette.mode === 'dark'}
          onChange={handleThemeToggle}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}15`,
              },
            },
            '& .MuiSwitch-thumb': {
              boxShadow: theme.tokens?.shadows?.sm || 'none',
            },
          }}
        />
        <DarkModeIcon sx={{ fontSize: 16, opacity: theme.palette.mode === 'dark' ? 1 : 0.4 }} />
      </Stack>
    </Toolbar>
  );
};

export default MainToolbar;
