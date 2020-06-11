import React from 'react';
import {
  View, Panel, PanelHeader, Placeholder, Button,
} from '@vkontakte/vkui';
import styles from './newUser.module.scss';

import BlabberAPI from '../../api';

// eslint-disable-next-line object-curly-newline
const NewUser = ({ user, status, setStatus, setLoading, setError }) => {
  const buttonSendRequestHandler = () => {
    setLoading(true);
    const api = new BlabberAPI();
    if (user && user.id) {
      api.postApply(user.id, user.first_name, user.last_name)
        .then(() => {
          setStatus('applied');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // eslint-disable-next-line no-console
      console.log('id пустой - не могу отправить данные');
    }
  };

  return (
    <View activePanel="unknown_user" className={styles.new}>
      <Panel id="unknown_user">
        {status === 'applied'
          ? (
            <Placeholder header="Ваша заявка находится на рассмотрении">
              Нужно просто подождать...
              Еще чуть-чуть и можно будет играть!
            </Placeholder>
          ) : (
            <>
              <PanelHeader>Профенж</PanelHeader>
              <Placeholder
                header="Подай заявку на участие в игре"
                action={<Button size="l" onClick={buttonSendRequestHandler}>Хочу играть!</Button>}
              >
                Эта игра разработана для учеников ПрофЦентра.
                Чтобы участвовать, нужно подать заявку и дождаться решения администратора.
              </Placeholder>
            </>
          )}
      </Panel>
    </View>
  );
};

export default NewUser;
