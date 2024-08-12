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

interface GithubState {
  repositories: Repository[];
  selectedRepository: Repository | null;
  loading: boolean;
  error: string | null;
}

const initialState: GithubState = {
 repositories: [],
  selectedRepository: null,
  loading: false,
  error: null,
};

const KEY = process.env.GITHUB_TOKEN

export const fetchRepositories = createAsyncThunk<
  Repository[],
  string,
  { rejectValue: string }
>('github/fetchRepositories', async (query, { rejectWithValue }) => {
  const GET_REPOSITORIES = gql`
    query($query: String!) {
      search(query: $query, type: REPOSITORY, first: 10) {
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
        }
      }
    }
  `;

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
      variables: { query },
    });

    return data.search.edges.map((edge: any) => ({
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
        state.repositories = action.payload;
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
