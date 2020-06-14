import {
  ApolloClient, InMemoryCache, HttpLink, gql, ApolloLink,
} from 'apollo-boost';

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SERVER}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      Authorization: token ? `JWT ${token}` : '',
    },
  });
  return forward(operation);
});

const blabberClient = new ApolloClient({
  credentials: 'include',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GET_TOKENS = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
    }
  }`;

const MY_USER = gql`
  query myUser {
    myUser {
      username
    }
}`;

export { blabberClient, GET_TOKENS, MY_USER };