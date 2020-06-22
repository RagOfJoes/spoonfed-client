import gql from 'graphql-tag';
import {
	RecipeOverviewFragment,
	RecipeDetailFragment,
	CreationOverviewFragment,
	CreationDetailFragment,
	RecipesForCreationsFragment,
} from 'graphql/Fragments';

export const MeQuery = gql`
	query MeQuery {
		me {
			sub
			bio
			avatar
			username
		}
	}
`;

export const GetUserProfileQuery = gql`
	query GetUserProfileQuery($username: String!) {
		getProfile(username: $username) {
			sub
			bio
			avatar
			username
			name {
				full
				last
				first
			}
		}
	}
`;

export const UserSearchQuery = gql`
	query UserSearchQuery($username: String!, $limit: Int!, $cursor: ID) {
		userSearch(username: $username, limit: $limit, cursor: $cursor) @connection(key: "UserSearch", filter: ["username"]) {
			edges {
				sub
				avatar
				username
				name {
					full
				}
			}

			pageInfo {
				cursor
				hasNextPage
			}
		}
	}
`;

export const GetUserRecipesQuery = gql`
	query GetUserRecipesQuery(
		$user: String!
		$limit: Int!
		$cursor: ID
		$filters: [RecipesFilterInput]
		$sort: CursorSortInput!
	) {
		getUserRecipes(user: $user, limit: $limit, cursor: $cursor, filters: $filters, sort: $sort)
			@connection(key: "UserRecipes", filter: ["user"]) {
			pageInfo {
				cursor
				hasNextPage
			}
			edges {
				...RecipeOverview
			}
		}
	}
	${RecipeOverviewFragment}
`;

export const GetAllRecipesQuery = gql`
	query GetAllRecipesQuery($limit: Int!, $cursor: ID, $filters: [RecipesFilterInput], $sort: CursorSortInput!) {
		getAllRecipes(limit: $limit, cursor: $cursor, filters: $filters, sort: $sort) @connection(key: "AllRecipes") {
			pageInfo {
				cursor
				hasNextPage
			}
			edges {
				...RecipeOverview
			}
		}
	}
	${RecipeOverviewFragment}
`;

export const GetRecipesForCreationsQuery = gql`
	query GetRecipesForCreationsQuery($limit: Int!, $cursor: ID, $filters: [RecipesFilterInput], $sort: CursorSortInput!) {
		getAllRecipes(limit: $limit, cursor: $cursor, filters: $filters, sort: $sort) @connection(key: "RecipesForCreations") {
			pageInfo {
				cursor
				hasNextPage
			}
			edges {
				...RecipeForCreations
			}
		}
	}
	${RecipesForCreationsFragment}
`;

export const GetRecipeDetail = gql`
	query GetRecipeDetail($slug: String!) {
		getRecipeDetail(slug: $slug) @connection(key: "RecipeDetail", filter: ["slug"]) {
			...RecipeDetail
		}
	}
	${RecipeDetailFragment}
`;

export const GetAllCreationsQuery = gql`
	query GetAllCreationsQuery($limit: Int!, $cursor: ID, $sort: CursorSortInput!, $filters: [CreationsFilterInput]) {
		getAllCreations(limit: $limit, cursor: $cursor, sort: $sort, filters: $filters) @connection(key: "AllCreations") {
			pageInfo {
				cursor
				hasNextPage
			}
			edges {
				...CreationOverview
			}
		}
	}
	${CreationOverviewFragment}
`;

export const GetUserCreationsQuery = gql`
	query GetUserCreationsQuery($user: String!, $limit: Int!, $cursor: ID, $sort: CursorSortInput!) {
		getUserCreations(user: $user, limit: $limit, cursor: $cursor, sort: $sort)
			@connection(key: "UserCreations", filter: ["user"]) {
			pageInfo {
				cursor
				hasNextPage
			}
			edges {
				...CreationOverview
			}
		}
	}
	${CreationOverviewFragment}
`;

export const GetCreationDetailQuery = gql`
	query GetCreationDetailQuery($slug: String!) {
		getCreationDetail(slug: $slug) @connection(key: "CreationDetail", filter: ["slug"]) {
			...CreationDetail
		}
	}
	${CreationDetailFragment}
`;
