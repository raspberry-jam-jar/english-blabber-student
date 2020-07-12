import {
  ApolloClient, InMemoryCache, HttpLink, gql, ApolloLink,
} from 'apollo-boost';

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SERVER}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token');
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
  query {
    myUser{
      hero {
        coins
        capacity
        heroClass {
          capacity
          name
          level
          skills {
            id
            name
          }
        }
        backpack {
          id
          name
          quantity
          price
          image
          giftClass {
            id
          }
        }
      }
    }
}`;

const GIFTS = gql`
  query {
    availableGifts(isGroupWide: false){
      id
      name
      price
      remain
      canBuy
      isGroupWide
  } availableGroupGifts: availableGifts(isGroupWide: true){
      id
      name
      price
      remain
      canBuy
      isGroupWide
  }
}`;

const BUY_OR_USE_GIFT = gql`
  mutation BuyOrUseUserGiftMutation($giftClassId:Int!, $quantity:Float!){
    buyOrUseGift(giftClassId: $giftClassId, quantity: $quantity){
        userGift {
            id
        }
    }
}`;

export {
  blabberClient, GET_TOKENS, MY_USER, GIFTS, BUY_OR_USE_GIFT,
};
