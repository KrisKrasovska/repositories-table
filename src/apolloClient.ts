import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const KEY = process.env.REACT_APP_GITHUB_TOKEN;
console.log(KEY)
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
