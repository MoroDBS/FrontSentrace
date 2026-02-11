import { Fab } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useRestriction } from '../../common/util/permissions';

const useStyles = makeStyles()((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    right: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      bottom: `calc(${theme.tokens?.bottomBar || theme.dimensions.bottomBarHeight}px + ${theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2)})`,
    },
  },
}));

const CollectionFab = ({ editPath, disabled }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const readonly = useRestriction('readonly');

  if (!readonly && !disabled) {
    return (
      <div className={classes.fab}>
        <Fab 
          size="medium" 
          color="primary" 
          onClick={() => navigate(editPath)}
          sx={{
            boxShadow: (theme) => theme.tokens?.shadows?.md || theme.shadows[6],
            '&:hover': {
              boxShadow: (theme) => theme.tokens?.shadows?.lg || theme.shadows[8],
            },
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
  return '';
};

export default CollectionFab;
