import {
  ApolloClient, InMemoryCache, HttpLink, gql, ApolloLink,
} from 'apollo-boost';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split } from '@apollo/client';

const httpLink = new HttpLink({ uri: `https://${process.env.REACT_APP_SERVER}/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token');
  operation.setContext({
    headers: {
      Authorization: token ? `JWT ${token}` : '',
    },
  });
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_SERVER}/ws/graphql/`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const blabberClient = new ApolloClient({
  credentials: 'include',
  link: splitLink,
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
      id
      learningGroups {
        id
      }
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
  mutation BuyOrUseUserGiftMutation($giftClassId:Int!, $quantity:Int!){
    buyOrUseGift(giftClassId: $giftClassId, quantity: $quantity){
        userGift {
            id
        }
    }
}`;

const GET_CHATROOM_HISTORY = gql`
  query History($chatroomId: String!) {
    chatroomHistory(chatroomId: $chatroomId) {
      id
      datetimeCreated
      text
      author {
        firstName
        lastName
        hero {
          heroClass {
            name
          }
        }
      }
    }
  }
`;

const SEND_MESSAGE = gql`
mutation SendMessageMutation($chatroomId: String!, $authorId: Int!, $text: String!) {
  sendChatMessage(chatroomId: $chatroomId, authorId: $authorId, text: $text){
    message {
     id
    }
  }
}`;

const NEW_MESSAGES_SUBSCRIPTION = gql`
subscription OnNewChatMessage($chatroomId: String!) {
  onNewChatMessage(chatroomId: $chatroomId){
    message {
      id
      datetimeCreated
      text
      author {
        firstName
        lastName
        hero {
          heroClass {
            name
          }
        }
      }
    }
  }
}`;

export {
  blabberClient, GET_TOKENS, MY_USER, GIFTS, BUY_OR_USE_GIFT,
  GET_CHATROOM_HISTORY, SEND_MESSAGE, NEW_MESSAGES_SUBSCRIPTION,
};
