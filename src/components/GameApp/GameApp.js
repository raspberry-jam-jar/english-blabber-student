import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, Epic,
} from '@vkontakte/vkui';
import { useQuery, useLazyQuery } from '@apollo/client';

import {
  MY_USER, GET_CHATROOM_HISTORY, NEW_MESSAGES_SUBSCRIPTION, blabberClient,
} from '../../apiGraphQl';
import BottomMenu from '../BottomMenu/BottomMenu';
import Loader from '../Loader/Loader';
import HeroRate from '../HeroRate/HeroRate';
import ProfileContent from '../ProfileContent/ProfileContent';
import Store from '../Store/Store';
import Chatroom from '../Chatroom/Chatroom';

const GameApp = ({ user }) => {
  const [activePanel, setActivePanel] = useState(sessionStorage.getItem('activePanel') || 'profile');
  const [popout, setPopout] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const keepActivePanel = (activePanelName) => {
    sessionStorage.setItem('activePanel', activePanelName);
    setActivePanel(activePanelName);
  };

  const {
    loading, error, data: myUserData, refetch,
  } = useQuery(MY_USER, { client: blabberClient });

  const [loadHistory, {
    called, subscribeToMore, loading: loadingHistory, data: chatroomHistoryData,
  }] = useLazyQuery(
    GET_CHATROOM_HISTORY, { client: blabberClient },
  );

  if (loading || loadingHistory) return <Loader />;
  if (error) return `Error! ${error.message}`;

  if (myUserData.myUser && !called) {
    loadHistory(
      {
        variables: { chatroomId: myUserData.myUser.learningGroups[0].id },
      },
    );
  }

  if (chatroomHistoryData && chatroomHistoryData.chatroomHistory) {
    return (
      <Epic tabbar={
        <BottomMenu activePanel={activePanel} setActivePanel={keepActivePanel} />
      }
      >
        <View activePanel={activePanel} popout={popout}>
          <Panel id="profile">
            <PanelHeader separator={false}>Профиль</PanelHeader>
            <HeroRate hero={myUserData.myUser.hero} />
            <ProfileContent
              userPhotoUrl={user.photo_200}
              hero={myUserData.myUser.hero}
              setPopout={setPopout}
              setSnackbar={setSnackbar}
              refetchMyUserState={refetch}
            />
            {snackbar}
          </Panel>
          <Panel id="chat">
            <PanelHeader separator={false}>Чат</PanelHeader>
            <HeroRate hero={myUserData.myUser.hero} />
            <Chatroom
              userId={myUserData.myUser.id}
              chatRoomId={myUserData.myUser.learningGroups[0].id}
              chatroomHistory={chatroomHistoryData.chatroomHistory}
              subscribeToNewMessages={() => subscribeToMore({
                document: NEW_MESSAGES_SUBSCRIPTION,
                variables: { chatroomId: myUserData.myUser.learningGroups[0].id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  if (!subscriptionData.data.onNewChatMessage.message) return prev;
                  const newMessage = subscriptionData.data.onNewChatMessage.message;
                  // eslint-disable-next-line prefer-object-spread
                  return Object.assign({}, prev, {
                    chatroomHistory: [...prev.chatroomHistory, newMessage],
                  });
                },
              })}
            />
          </Panel>
          <Panel id="store">
            <PanelHeader separator={false}>Магазин</PanelHeader>
            <HeroRate hero={myUserData.myUser.hero} />
            <Store
              setPopout={setPopout}
              setSnackbar={setSnackbar}
              refetchMyUserState={refetch}
            />
            {snackbar}
          </Panel>
        </View>
      </Epic>
    );
  }

  return null;
};

GameApp.propTypes = {
  user: PropTypes.shape({
    photo_200: PropTypes.string,
  }).isRequired,
};

export default GameApp;
