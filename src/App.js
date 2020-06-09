import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import {
  View, Panel, PanelHeader, Button, Placeholder,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useLocation } from 'react-router-dom';

import BlabberAPI from './api';
import GameApp from './GameApp';

const userStatusesMapper = {
  400: 'error',
  401: 'applied',
  403: 'unknown_user',
};

const App = () => {
  const location = useLocation();
  const [authStr] = useState(location.search);
  const [isKnownUser] = useState(false);
  const [user, setUser] = useState(null);
  const [activePanel, setActivePanel] = useState('loading');

  const buttonSendRequestHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Здесь мы отправляем apply:');
    // eslint-disable-next-line no-console
    console.log(user.id, user.first_name, user.last_name);
    const api = new BlabberAPI();
    if (user && user.id) {
      api.postApply(user.id, user.first_name, user.last_name)
        .then((resp) => {
          setActivePanel('applied');
          // eslint-disable-next-line no-console
          console.log(resp);
        })
        .catch((err) => {
          setActivePanel('error');
          // eslint-disable-next-line no-console
          console.log(err);
        });
    } else {
      // eslint-disable-next-line no-console
      console.log('id пустой - не могу отправить данные');
    }
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
    }
    fetchData();
  }, []);

  useEffect(() => {
    const api = new BlabberAPI();
    api.getAuth(authStr)
      .then((resp) => {
        // запросить токены
        // eslint-disable-next-line no-console
        console.log(resp);
        setActivePanel(userStatusesMapper[resp.code]);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [authStr]);

  if (isKnownUser) {
    return <GameApp />;
  }
  return (
    <View activePanel={activePanel}>
      <Panel id="unknown_user">
        <PanelHeader>Профенж</PanelHeader>
        <Placeholder
          header="Подай заявку на участие в игре"
          action={<Button size="l" onClick={buttonSendRequestHandler}>Хочу играть!</Button>}
        >
          Эта игра разработана для учеников ПрофЦентра. Чтобы участвовать, нужно подать заявку и
          дождаться решения администратора.
        </Placeholder>
      </Panel>
      <Panel id="applied">
        <Placeholder header="Ваша заявка находится на рассмотрении">
          Нужно просто подождать...
          Еще чуть-чуть и можно будет играть!
        </Placeholder>
      </Panel>
      <Panel id="error">
        <Placeholder header="Что-то пошло не так">
          Попробуйте перезагрузить страницу или вернуться сюда позже.
        </Placeholder>
      </Panel>
      <Panel id="loading">
        <Placeholder header="Ждем ответа от сервера">
          <ScreenSpinner size="large" />
        </Placeholder>
      </Panel>
    </View>
  );
};

export default App;
