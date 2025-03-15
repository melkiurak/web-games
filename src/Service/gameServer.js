import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://parseapi.back4app.com/graphql', 
    cache: new InMemoryCache(),
    headers: {
      "X-Parse-Application-Id": 'W00fMNVAVSA81A93tAeB3tmOu9zHfoFPK0PbTZpE',
      "X-Parse-REST-API-Key": 'MBDP7Y3nqVGJIdYdFWEqjVIGTGbdaj5WhwKxZIeD', 
    }
});
export default client ;