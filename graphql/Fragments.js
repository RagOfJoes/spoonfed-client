import gql from 'graphql-tag';

export const ParsedRecipeFragment = gql`
	fragment ParsedRecipeFragment on ParsedRecipe {
		name
		image
		servings
		time {
			prep
			cook
			ready
			active
			inactive
			total
		}

		ingredients
		instructions
	}
`;

export const RecipeOverviewFragment = gql`
	fragment RecipeOverview on Recipe {
		id
		name
		slug
		isLiked
		servings
		time {
			total
		}
		images {
			name
			url
		}
		createdBy {
			sub
			avatar
			username

			name {
				full
			}
		}
		date {
			creation
		}
	}
`;

export const RecipeDetailFragment = gql`
	fragment RecipeDetail on Recipe {
		id
		name
		slug
		isLiked
		servings
		importUrl
		ingredients
		instructions
		images {
			url
			name
		}
		createdBy {
			sub
			avatar
			username
			name {
				full
			}
		}
		date {
			creation
			lastUpdate
		}
		time {
			prep
			cook
			ready
			total
			active
			inactive
		}
	}
`;

export const CreationOverviewFragment = gql`
	fragment CreationOverview on Creation {
		id
		slug
		title
		isLiked
		images {
			url
			name
		}

		createdBy {
			sub
			avatar
			username
			name {
				full
			}
		}
	}
`;

export const CreationDetailFragment = gql`
	fragment CreationDetail on Creation {
		id
		slug
		title
		isLiked
		description
		images {
			url
			name
		}

		recipe {
			id
			name
			slug
		}

		createdBy {
			sub
			avatar
			username
			name {
				full
			}
		}
	}
`;
