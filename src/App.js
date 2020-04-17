import React from 'react';
import {
  View, Panel, PanelHeader, Div, Button, Epic, Tabbar, TabbarItem,
} from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user';
import Icon24ChatsOutline from '@vkontakte/icons/dist/24/chats';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';
import '@vkontakte/vkui/dist/vkui.css';

function App() {
  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader>Welcome</PanelHeader>
        <Div>
          <Button size="xl" mode="secondary">Отправить заявку</Button>
        </Div>
        <Epic tabbar={(
          <Tabbar>
            <TabbarItem text="Профиль"><Icon24UserOutline /></TabbarItem>
            <TabbarItem text="Чат"><Icon24ChatsOutline /></TabbarItem>
            <TabbarItem text="Магазин"><Icon24Gift /></TabbarItem>
          </Tabbar>
        )}
        />
      </Panel>
    </View>
  );
}

export default App;
