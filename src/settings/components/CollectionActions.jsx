import { useState } from 'react';
import {
  IconButton, Menu, MenuItem, useMediaQuery, useTheme,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { makeStyles } from 'tss-react/mui';
import RemoveDialog from '../../common/components/RemoveDialog';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles()((theme) => ({
  row: {
    display: 'flex',
    gap: theme.tokens?.spacing(0.5) || theme.spacing(0.5),
  },
  iconButton: {
    borderRadius: theme.tokens?.borderRadius?.md || 6,
    transition: theme.tokens?.transition?.base || 'all 200ms',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const CollectionActions = ({
  itemId, editPath, endpoint, setTimestamp, customActions, readonly,
}) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const router = useRouter();
  const t = useTranslation();

  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [removing, setRemoving] = useState(false);

  const handleEdit = () => {
    router.push(`${editPath}/${itemId}`);
    setMenuAnchorEl(null);
  };

  const handleRemove = () => {
    setRemoving(true);
    setMenuAnchorEl(null);
  };

  const handleCustom = (action) => {
    action.handler(itemId);
    setMenuAnchorEl(null);
  };

  const handleRemoveResult = (removed) => {
    setRemoving(false);
    if (removed) {
      setTimestamp(Date.now());
    }
  };

  return (
    <>
      {phone ? (
        <>
          <IconButton size="small" onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu open={!!menuAnchorEl} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)}>
            {customActions && customActions.map((action) => (
              <MenuItem onClick={() => handleCustom(action)} key={action.key}>{action.title}</MenuItem>
            ))}
            {!readonly && (
              <>
                {editPath && <MenuItem onClick={handleEdit}>{t('sharedEdit')}</MenuItem>}
                <MenuItem onClick={handleRemove}>{t('sharedRemove')}</MenuItem>
              </>
            )}
          </Menu>
        </>
      ) : (
        <div className={classes.row}>
          {customActions && customActions.map((action) => (
            <Tooltip title={action.title} key={action.key}>
              <IconButton size="small" onClick={() => handleCustom(action)} className={classes.iconButton}>
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}
          {!readonly && (
            <>
              {editPath && (
                <Tooltip title={t('sharedEdit')}>
                  <IconButton size="small" onClick={handleEdit} className={classes.iconButton}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t('sharedRemove')}>
                <IconButton size="small" onClick={handleRemove} className={classes.iconButton}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
      )}
      <RemoveDialog style={{ transform: 'none' }} open={removing} endpoint={endpoint} itemId={itemId} onResult={handleRemoveResult} />
    </>
  );
};

export default CollectionActions;
