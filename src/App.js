import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { blabberClient, GET_TOKENS } from './apiGraphQl';
import BlabberRestAPI from './api';
import NewUser from './components/NewUser/NewUser';
import GameApp from './components/GameApp/GameApp';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';

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
  const [signedPassword, setSignedPassword] = useState(null);

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
    const api = new BlabberRestAPI();
    api.getAuth(authStr)
      .then((res) => {
        if (res.code === 200) {
          res.body.then(
            (result) => {
              setSignedPassword(result.password);
              setLoading(false);
            },
            () => {
              setError(true);
              setLoading(false);
            },
          );
        }
        setIsKnownUser(res.code === 200);
        setStatus(userStatusesMapper[res.code]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setError(true);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [authStr]);

  const obtainTokens = () => (
    blabberClient.mutate({
      mutation: GET_TOKENS,
      variables: { username: user.id, password: signedPassword },
      errorPolicy: 'all', // Значит, что в результате ответа мы получим поле с ошибками
    }).then(
      (result) => {
        localStorage.setItem('token', result.data.tokenAuth.token);
      },
      () => setError(true),
    )
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
  if (isKnownUser && user && signedPassword) {
    obtainTokens();
    return (
      <ApolloProvider client={blabberClient}>
        <GameApp user={user} />
      </ApolloProvider>
    );
  }

  return null;
};

export default App;
