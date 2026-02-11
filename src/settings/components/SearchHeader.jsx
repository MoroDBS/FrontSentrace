import { TextField, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from '../../common/components/LocalizationProvider';

export const filterByKeyword = (keyword) => (item) => !keyword || JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase());

const useStyles = makeStyles()((theme) => ({
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.tokens?.spacing ? `${theme.tokens.spacing(3)} ${theme.tokens.spacing(2)} ${theme.tokens.spacing(2)}` : theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  searchInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.tokens?.borderRadius?.lg || 8,
      backgroundColor: theme.palette.background.paper,
      transition: theme.tokens?.transition?.base || 'all 200ms',
      '&:hover': {
        boxShadow: theme.tokens?.shadows?.xs || 'none',
      },
    },
  },
}));

const SearchHeader = ({ keyword, setKeyword }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const t = useTranslation();

  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  return phone ? (
    <div className={classes.header}>
      <TextField
        variant="outlined"
        placeholder={t('sharedSearch')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={classes.searchInput}
        size="small"
        fullWidth
      />
    </div>
  ) : '';
};

export default SearchHeader;
