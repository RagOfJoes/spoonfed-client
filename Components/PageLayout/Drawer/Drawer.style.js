import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "constants/index";

const drawerStyle = (theme) => ({
  // Drawer Styles
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: DRAWER_WIDTH,
    },
  },
  paper: {
    width: DRAWER_WIDTH,
    overflowX: "hidden",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  backdrop: {
    backgroundColor: "rgba(196,208,211,0.4)",
  },
  // Drawer Logo
  logo: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginLeft: 5,
    userSelect: "none",
    fontWeight: theme.typography.fontWeightMedium,
  },
  // Drawer Section Link
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(9),
  },
  sectionTItle: {
    fontSize: 15,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  sectionButton: {
    fontSize: 15,
    cursor: "pointer",
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create("", { duration: "0.12s" }),

    "&:hover": {
      padding: theme.spacing(1),
      boxShadow: theme.shadows[1.25],
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },

    "&.sectionActive": {
      padding: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        "0px -2px 4px rgba(38, 41, 42, 0.06), 0px 4px 4px rgba(38, 41, 42, 0.08)",
    },
  },

  // Call to action
  cta: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(9),
    borderRadius: theme.shape.borderRadius,
  },
  ctaDescription: {
    color: theme.palette.text.primary,
    ...theme.typography.body2,
  },
  ctaButton: {
    marginTop: theme.spacing(2),
    boxShadow:
      "0px -2px 4px rgba(38, 41, 42, 0.06), 0px 4px 4px rgba(38, 41, 42, 0.08)",
  },
});

const useDrawerStyle = makeStyles(drawerStyle, { name: "Drawer" });

export { drawerStyle, useDrawerStyle };

export default { drawerStyle, useDrawerStyle };
