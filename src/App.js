import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { View, Panel, Placeholder } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useLocation } from 'react-router-dom';

import BlabberAPI from './api';
import NewUser from './components/NewUser/NewUser';
import GameApp from './components/GameApp/GameApp';
import Error from './components/Error/Error';

const userStatusesMapper = {
  400: 'error',
  401: 'applied',
  403: 'unknown_user',
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('нет дополнительных данных');
  const location = useLocation();
  const [authStr] = useState(location.search);
  const [status, setStatus] = useState('');
  const [isKnownUser, setIsKnownUser] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userFromVK = await bridge.send('VKWebAppGetUserInfo', {});
        setUser(userFromVK);
      } catch (err) {
        setErrorMessage(err.message);
        setError(true);
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const api = new BlabberAPI();
    api.getAuth(authStr)
      .then((res) => {
        // запросить токены
        setIsKnownUser(res.code === 200);
        setStatus(userStatusesMapper[res.code]);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setError(true);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [authStr]);

  const Loader = () => (
    <View activePanel="loading">
      <Panel id="loading">
        <Placeholder header="Ждем ответа от сервера">
          <ScreenSpinner size="large" />
        </Placeholder>
      </Panel>
    </View>
  );

  if (loading) return <Loader />;
  if (error) return <Error message={errorMessage} />;

  if (!isKnownUser && user && status) {
    return (
      <NewUser
        user={user}
        status={status}
        setStatus={setStatus}
        setLoading={setLoading}
        setError={setError}
      />
    );
  }

  return <GameApp />;
};

export default App;
