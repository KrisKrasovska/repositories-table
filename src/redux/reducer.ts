import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  language: string | null;
  forksCount: number;
  stargazersCount: number;
  updatedAt: string;
  licenseInfo: {
    name: string;
  } | null;
}

export interface GithubState {
  repositories: Repository[];
  selectedRepository: Repository | null;
  loading: boolean;
  error: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

const initialState: GithubState = {
  repositories: [],
  selectedRepository: null,
  loading: false,
  error: null,
  endCursor: null,
  hasNextPage: false,
};

const KEY = process.env.REACT_APP_GITHUB_TOKEN;

const GET_REPOSITORIES = gql`
  query($query: String!, $first: Int!, $after: String) {
  search(query: $query, type: REPOSITORY, first: $first, after: $after) {
    edges {
      node {
        ... on Repository {
          id
          name
          url
          description
          primaryLanguage {
            name
          }
          forkCount
          stargazerCount
          updatedAt
          licenseInfo {
            name
          }
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

`;

export const fetchRepositories = createAsyncThunk<
  { repositories: Repository[]; endCursor: string | null; hasNextPage: boolean },
  { query: string; first: number; after?: string | null },
  { rejectValue: string }
>('github/fetchRepositories', async ({ query, first, after }, { rejectWithValue }) => {
  try {
    const client = new ApolloClient({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: GET_REPOSITORIES,
      variables: { query, first, after: after || undefined },
    });

    console.log('GraphQL response:', data);  // Отладочное сообщение

    const repositories = data.search.edges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      url: edge.node.url,
      description: edge.node.description,
      language: edge.node.primaryLanguage?.name || 'N/A',
      forksCount: edge.node.forkCount,
      stargazersCount: edge.node.stargazerCount,
      updatedAt: edge.node.updatedAt,
      licenseInfo: edge.node.licenseInfo,
    }));

    return {
      repositories,
      endCursor: data.search.pageInfo.endCursor,
      hasNextPage: data.search.pageInfo.hasNextPage,
    };
  } catch (error) {
    return rejectWithValue('Failed to fetch repositories');
  }
});


const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    selectRepository(state, action) {
      state.selectedRepository = action.payload;
    },
    clearSelectedRepository(state) {
      state.selectedRepository = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.repositories = [...state.repositories, ...action.payload.repositories];
        state.endCursor = action.payload.endCursor;
        state.hasNextPage = action.payload.hasNextPage;
        state.loading = false;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error';
        state.loading = false;
      });
  },
});

export const { selectRepository, clearSelectedRepository } = githubSlice.actions;

export default githubSlice.reducer;
