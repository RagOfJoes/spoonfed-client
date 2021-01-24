import { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Drawer from "./Drawer";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
    },
    // Main Content
    content: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      paddingTop: theme.spacing(9),
    },
    container: {
      height: "100vh",
      marginLeft: "unset",
      marginRight: "unset",
    },
  }),
  { name: "PageLayout" }
);

const PageLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header open={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Drawer mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default PageLayout;
