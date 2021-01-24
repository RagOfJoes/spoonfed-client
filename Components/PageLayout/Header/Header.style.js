import { DRAWER_WIDTH } from "constants/index";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { darken } from "@material-ui/core";

const headerStyle = (theme) => ({
  appbar: {
    border: "none",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up("sm")]: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
  },
  appbarContainer: {},

  // MenuButton
  menuContainer: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
    },
    [theme.breakpoints.down("xs")]: {
      // marginLeft: theme.spacing(1),
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },

  // Search Bar
  searchBarContainer: {
    width: "100%",
    maxWidth: "65%",
    [theme.breakpoints.down("xs")]: {
      // marginLeft: theme.spacing(1),
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  searchBar: {
    height: 40,
    width: "100%",
    border: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(1, 2),
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.subtitle2,
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },

  // Account
  avatar: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
  },
  signInButton: {
    height: 40,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  myAccountButton: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
});

const useHeaderStyle = makeStyles(headerStyle, { name: "PageLayoutHeader" });

export { headerStyle, useHeaderStyle };

export default { headerStyle, useHeaderStyle };
