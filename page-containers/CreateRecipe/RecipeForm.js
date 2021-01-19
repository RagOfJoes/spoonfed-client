import Head from "next/head";
import redirect from "lib/redirect";
import Layout from "Components/Layout";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { useMutation } from "@apollo/client";
import RecipeForm from "Components/RecipeForm";
import Typography from "@material-ui/core/Typography";
import { CreateRecipeMutation } from "graphql/Mutations";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { handleAuthError, isAuthError } from "graphql/handlers";

const useStyles = makeStyles(
  ({ shape, spacing }) => ({
    container: {
      overflow: "hidden",
      paddingTop: spacing(1),
      borderRadius: shape.borderRadius,
    },
  }),
  { name: "RecipeCreateForm" }
);

const RecipeFormComponent = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [createRecipeMutation] = useMutation(CreateRecipeMutation, {
    onCompleted: async ({ createRecipe }) => {
      try {
        if (!createRecipe?.slug) return;

        redirect({}, `/r/${createRecipe.slug}`);
      } catch {}
    },
  });

  return (
    <Layout>
      <Head>
        <title>Create a Recipe | Spoonfed</title>
        <meta
          key="title"
          property="og:title"
          content="Create a Recipe | Spoonfed"
        />
      </Head>
      <Grid container direction="column" className={classes.container}>
        <RecipeForm
          mutation={createRecipeMutation}
          Header={
            <Grid item container alignItems="center">
              <Grid item>
                <Typography variant="h5">Create a recipe</Typography>
              </Grid>
            </Grid>
          }
          onError={async (e) => {
            if (isAuthError(e)) {
              await handleAuthError(e, null, enqueueSnackbar);
            } else {
              enqueueSnackbar(
                "Something went wrong while creating new recipe. Try again later.",
                {
                  variant: "error",
                }
              );
            }
          }}
          onSubmitted={() => {
            // TODO: Create action to view recipe by passing
            // slug to this callback
            enqueueSnackbar("Successfully created Recipe!", {
              variant: "success",
              autoHideDuration: 3000,
            });
          }}
        />
      </Grid>
    </Layout>
  );
};

export default RecipeFormComponent;
