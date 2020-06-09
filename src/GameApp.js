import React, { useState } from 'react';
import {
  View, Panel, PanelHeader, Epic, ScreenSpinner,
} from '@vkontakte/vkui';

import BottomMenu from './components/BottomMenu';

const GameApp = () => {
  const [activePanel, setActivePanel] = useState('main');
  const [popout] = useState(<ScreenSpinner size="large" />);

  return (
    <Epic tabbar={<BottomMenu activePanel={activePanel} setActivePanel={setActivePanel} />}>
      <View activePanel={activePanel} popout={popout}>
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

export default GameApp;
