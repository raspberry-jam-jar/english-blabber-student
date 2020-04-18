import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import {
  View, Panel, PanelHeader, Div, Button, Epic, Tabbar, TabbarItem,
  Group, Cell, Avatar,
} from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user';
import Icon24ChatsOutline from '@vkontakte/icons/dist/24/chats';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  const buttonSendRequestHandler = () => {
    console.log('Отправлена заявка:');
    console.log(user.id, user.first_name, user.last_name);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userFromVK = await bridge.send('VKWebAppGetUserInfo', {});
        setUser(userFromVK);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <View activePanel="main" popout={popout}>
      <Panel id="main">
        <PanelHeader>Welcome</PanelHeader>
        {user
        && (
          <Div>
            <Group title="User Data Fetched with VK Bridge">
              <Cell
                before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
                description="нажмите кнопку ниже чтобы отправить заявку:"
              >
                {`${user.first_name} ${user.last_name}`}
              </Cell>
            </Group>
            <Button
              onClick={buttonSendRequestHandler}
              size="xl"
              mode="secondary"
            >
              Отправить заявку
            </Button>
          </Div>
        )}
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
};

export default App;
