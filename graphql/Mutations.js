import gql from 'graphql-tag';
import { RecipeOverviewFragment, RecipeDetailFragment, ParsedRecipeFragment, CreationDetailFragment } from './Fragments';

export const SignS3SingleMutation = gql`
	mutation SignS3SingleMutation($file: FileUpload!) {
		signS3Single(file: $file) {
			fileUrl
			signedUrl
		}
	}
`;

export const SignS3MultipleMutation = gql`
	mutation SignS3MultipleMutation($files: [FileUpload!]!) {
		signS3Multiple(files: $files) {
			fileUrl
			signedUrl
		}
	}
`;

export const EditProfileMutation = gql`
	mutation EditProfileMutation($profile: EditProfileInput!) {
		editProfile(profile: $profile) {
			sub
			bio
			avatar
			username
		}
	}
`;

export const LogoutMutation = gql`
	mutation LogoutMutation {
		logout
	}
`;

export const CreateRecipeMutation = gql`
	mutation CreateRecipeMutation($recipe: NewRecipeInput!) {
		createRecipe(recipe: $recipe) {
			...RecipeOverview
		}
	}
	${RecipeOverviewFragment}
`;

export const EditRecipeMutation = gql`
	mutation EditRecipeMutation($id: ObjectId!, $recipe: EditRecipeInput!) {
		editRecipe(id: $id, recipe: $recipe) {
			...RecipeDetail
		}
	}
	${RecipeDetailFragment}
`;

export const ParseRecipeURLMutation = gql`
	mutation ParseRecipeURLMutation($url: String!) {
		parseRecipeUrl(url: $url) {
			...ParsedRecipeFragment
		}
	}
	${ParsedRecipeFragment}
`;

export const LikeRecipeMutation = gql`
	mutation LikeRecipeMutation($recipeId: ObjectId!) {
		likeRecipe(recipeId: $recipeId) {
			id
			isLiked
		}
	}
`;

export const UnlikeRecipeMutation = gql`
	mutation UnlikeRecipeMutation($recipeId: ObjectId!) {
		unlikeRecipe(recipeId: $recipeId) {
			id
			isLiked
		}
	}
`;

export const NewCreationMutation = gql`
	mutation NewCreationMutation($creation: NewCreationInput!) {
		newCreation(creation: $creation) {
			...CreationDetail
		}
	}
	${CreationDetailFragment}
`;

export const EditCreationMutation = gql`
	mutation EditCreationMutation($id: ObjectId!, $creation: EditCreationInput!) {
		editCreation(id: $id, creation: $creation) {
			...CreationDetail
		}
	}
	${CreationDetailFragment}
`;

export const LikeCreationMutation = gql`
	mutation LikeCreationMutation($creationId: ObjectId!) {
		likeCreation(creationId: $creationId) {
			id
			isLiked
		}
	}
`;

export const UnlikeCreationMutation = gql`
	mutation UnlikeCreationMutation($creationId: ObjectId!) {
		unlikeCreation(creationId: $creationId) {
			id
			isLiked
		}
	}
`;