import { darken, Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

/**
 *
 * @param {Theme} theme
 */
const recipeCardStyle = ({
  shape,
  spacing,
  palette,
  typography,
  transitions,
}) => ({
  container: {
    height: "100%",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: palette.background.default,
  },
  imageBtn: {
    overflow: "hidden",
    position: "relative",
    borderRadius: shape.borderRadius * 2,
  },
  image: {
    height: 0,
    paddingBottom: "75%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    padding: spacing(1, 0),
    justifyContent: "space-between",
  },
  createdBy: {
    minWidth: 0,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 25,
    height: 25,
    cursor: "pointer",
    backgroundColor: palette.text.secondary,
  },
  username: {
    width: "100%",
    fontSize: 12.25,
    cursor: "pointer",
    overflow: "hidden",
    userSelect: "none",
    marginLeft: spacing(1),
    textOverflow: "ellipsis",
    color: palette.text.primary,
    fontWeight: typography.fontWeightMedium,

    "&:hover": {
      textDecoration: "underline",
    },
  },
  metaContainer: {
    display: "flex",
    flexDirection: "row",
  },
  meta: {
    alignItems: "center",
    display: "inline-flex",

    "&:not(:first-child)": {
      marginLeft: spacing(1),
    },
  },
  metaIcon: {
    width: 18,
    height: 18,
    fill: palette.text.secondary,
    fontWeight: typography.fontWeightMedium,
  },
  metaValue: {
    fontSize: 12,
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginLeft: spacing(1),
    textOverflow: "ellipsis",
    color: palette.text.secondary,
    fontWeight: typography.fontWeightMedium,
  },
  overlay: {
    top: 0,
    zIndex: 1,
    opacity: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    padding: spacing(2),
    position: "absolute",
    alignItems: "flex-end",
    color: palette.background.default,
    background: `
    linear-gradient(
      180deg,
      transparent 62%,
      rgba(0,0,0,0.00345888) 63.94%,
      rgba(0,0,0,0.014204) 65.89%, 
      rgba(0,0,0,0.0326639) 67.83%, 
      rgba(0,0,0,0.0589645) 69.78%, 
      rgba(0,0,0,0.0927099) 71.72%, 
      rgba(0,0,0,0.132754) 73.67%, 
      rgba(0,0,0,0.177076) 75.61%, 
      rgba(0,0,0,0.222924) 77.56%, 
      rgba(0,0,0,0.267246) 79.5%, 
      rgba(0,0,0,0.30729) 81.44%, 
      rgba(0,0,0,0.341035) 83.39%,
      rgba(0,0,0,0.367336) 85.33%,
      rgba(0,0,0,0.385796) 87.28%,
      rgba(0,0,0,0.396541) 89.22%, 
      rgba(0,0,0,0.4) 91.17%
    )`,
  },
  overlayWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    minWidth: 0,
    fontSize: 16,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: typography.fontWeightBold,
  },
  actionButton: {
    padding: spacing(1),
    alignItems: "center",
    marginLeft: spacing(2),
    display: "inline-flex",
    color: palette.text.primary,
    transition: transitions.create(),
    borderRadius: shape.borderRadius,
    backgroundColor: palette.background.default,

    "&:hover": {
      backgroundColor: darken(palette.background.default, 0.2),
    },
  },
  actionIcon: {
    width: 16,
    height: 16,
    fill: palette.text.primary,
  },
});

const useRecipeCardStyle = makeStyles(recipeCardStyle, { name: "RecipeCard" });

export { recipeCardStyle, useRecipeCardStyle };
