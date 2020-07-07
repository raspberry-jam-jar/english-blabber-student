import React from 'react';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { View, Panel, Placeholder } from '@vkontakte/vkui';

const Loader = () => (
  <View activePanel="loading">
    <Panel id="loading">
      <Placeholder header="Ждем ответа от сервера">
        <ScreenSpinner size="large" />
      </Placeholder>
    </Panel>
  </View>
);

export default Loader;
