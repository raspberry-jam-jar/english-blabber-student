import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import {
  View, Panel, PanelHeader, Div, Button, Epic, Group, Cell, Avatar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useLocation } from 'react-router-dom';

import BlabberAPI from './api';

import BottomMenu from './components/BottomMenu';

const App = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [status] = useState('не получен');
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [activePanel, setActivePanel] = useState('main');
  console.log(location);

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

  useEffect(() => {
    const api = new BlabberAPI();
    if (user && user.id) {
      api.postApply(user.id, user.first_name, user.last_name)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    } else {
      console.log('id пустой - не могу получить статус');
    }
  }, [user]);

  return (
    <Epic tabbar={<BottomMenu activePanel={activePanel} setActivePanel={setActivePanel} />}>
      {/* <p>{new URLSearchParams(location.search).get('name')}</p> */}
      <View activePanel={activePanel} popout={popout}>
        <Panel id="main">
          <PanelHeader>Профиль</PanelHeader>
          {user
          && (
            <Div>
              <Group title="User Data Fetched with VK Bridge">
                <Cell
                  before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
                  description="нажмите кнопку ниже чтобы отправить заявку:"
                >
                  {`${user.first_name} ${user.last_name}`}
                  {` (статус: ${status})`}
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

export default App;
