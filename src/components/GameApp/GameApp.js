import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, Epic,
} from '@vkontakte/vkui';

import BottomMenu from '../BottomMenu/BottomMenu';

const GameApp = () => {
  const [activePanel, setActivePanel] = useState('profile');

  return (
    <Epic tabbar={<BottomMenu activePanel={activePanel} setActivePanel={setActivePanel} />}>
      <View activePanel={activePanel}>
        <Panel id="profile">
          <PanelHeader>Профиль</PanelHeader>
        </Panel>
        <Panel id="chat">
          <PanelHeader>Чат</PanelHeader>
        </Panel>
        <Panel id="store">
          <PanelHeader>Магазин</PanelHeader>
        </Panel>
      </View>
    </Epic>
  );
};

GameApp.propTypes = {};

export default GameApp;
