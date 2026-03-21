import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI, 
    cache: new InMemoryCache(),
    headers: {
      "X-Parse-Application-Id": import.meta.env.VITE_APP_ID,
      "X-Parse-REST-API-Key": import.meta.env.VITE_API_KEY, 
    }
});
export default client ;
