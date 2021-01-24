import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Account from "./Account";
import { useHeaderStyle } from "./Header.style";

const Header = (props) => {
  const { onDrawerToggle } = props;
  const classes = useHeaderStyle();
  return (
    <AppBar
      elevation={0}
      color="default"
      position="fixed"
      className={classes.appbar}
    >
      <Grid
        container
        justify="center"
        direction="column"
        className={classes.appbarContainer}
      >
        <Grid
          container
          wrap="nowrap"
          direction="row"
          component={Toolbar}
          justify="space-between"
        >
          <Grid item className={classes.menuContainer}>
            <IconButton
              size="small"
              disableRipple
              onClick={onDrawerToggle}
              className={classes.menuButton}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.searchBarContainer}>
            <input
              type="text"
              className={classes.searchBar}
              placeholder="Search for a user..."
            />
          </Grid>
          <Account />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
