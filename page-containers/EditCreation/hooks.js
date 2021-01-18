import Router from "next/router";
import { handleAuthError } from "graphql/handlers";
import { useQuery, useMutation } from "@apollo/client";
import { EditCreationMutation } from "graphql/Mutations";
import { GetCreationDetailQuery } from "graphql/Queries";

export const useCreationDetail = (enqueueSnackbar, onError) =>
  useQuery(GetCreationDetailQuery, {
    skip: !Router?.query?.creationSlug,
    variables: {
      slug: Router?.query?.creationSlug,
    },
    onError: async (e) => {
      if (onError && typeof onError === "function") await onError(e);

      await handleAuthError(e, null, enqueueSnackbar);
    },
  });

export const useEditCreation = (enqueueSnackbar) =>
  useMutation(EditCreationMutation, {
    onCompleted: ({ editCreation }) => {
      if (editCreation?.slug) {
        const { slug } = editCreation;
        enqueueSnackbar("Successfully edited Recipe!", {
          variant: "success",
        });
        Router.push(
          { query: { creationSlug: slug }, pathname: "/c/[creationSlug]" },
          `/c/${slug}`
        );
        return;
      }
    },
  });
