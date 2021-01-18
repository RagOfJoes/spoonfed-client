import { memo } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import { GetRecipeDetail } from "graphql/Queries";
import RecipeDetailError from "./RecipeDetail.error";
import Typography from "@material-ui/core/Typography";
import RecipeDetailLoading from "./RecipeDetail.loading";
import RecipeDetailContent from "./RecipeDetail.content";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { handleAuthError, isAuthError } from "graphql/handlers";

const useStyles = makeStyles(
  (theme) => ({
    content: {
      overflow: "hidden",
      padding: theme.spacing(2),
    },
  }),
  { name: "RecipeDetail" }
);

export default memo(({ onLike, onError }) => {
  const router = useRouter();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, loading } = useQuery(GetRecipeDetail, {
    skip: !router?.query?.recipeSlug,
    variables: {
      slug: router?.query?.recipeSlug,
    },
    onError: async (e) => {
      if (onError && typeof onError === "function") await onError(e);

      await handleAuthError(e, null, enqueueSnackbar);
    },
  });

  if (error) {
    if (isAuthError(error)) return <RecipeDetailLoading />;

    return (
      <Grid container direction="column" className={classes.content}>
        <Typography>An Error has Occured</Typography>
      </Grid>
    );
  }

  if (!loading && data?.getRecipeDetail)
    return <RecipeDetailContent {...data?.getRecipeDetail} onLike={onLike} />;

  if (!loading && !error && router?.query?.recipeSlug && !data?.getRecipeDetail)
    return <RecipeDetailError />;

  if (loading) return <RecipeDetailLoading />;

  return null;
});
