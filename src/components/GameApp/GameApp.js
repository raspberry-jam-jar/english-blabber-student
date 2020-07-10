import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, Epic,
} from '@vkontakte/vkui';
import BottomMenu from '../BottomMenu/BottomMenu';

import ProfileContent from '../ProfileContent/ProfileContent';
import Store from '../Store/Store';

const GameApp = ({ user }) => {
  const [activePanel, setActivePanel] = useState('profile');
  return (
    <Epic tabbar={<BottomMenu activePanel={activePanel} setActivePanel={setActivePanel} />}>
      <View activePanel={activePanel}>
        <Panel id="profile">
          <PanelHeader separator={false}>Профиль</PanelHeader>
          <ProfileContent userPhotoUrl={user.photo_200} />
        </Panel>
        <Panel id="chat">
          <PanelHeader>Чат</PanelHeader>
        </Panel>
        <Panel id="store">
          <Store />
        </Panel>
      </View>
    </Epic>
  );
};

GameApp.propTypes = {
  user: PropTypes.shape({
    photo_200: PropTypes.string,
  }).isRequired,
};

export default GameApp;
