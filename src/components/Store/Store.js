import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Div,
} from '@vkontakte/vkui';
import { Query } from 'react-apollo';

import { GIFTS } from '../../apiGraphQl';
import GiftCart from '../GiftCart/GiftCart';
import Loader from '../Loader/Loader';
import styles from '../GameApp/gameApp.module.scss';

const Store = ({ setPopout, setSnackbar }) => (
  <Query query={GIFTS}>
    {
      ({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return `Error! ${error.message}`;
        return (
          <Div>
            <Header mode="secondary">Подарки</Header>
            <Div className={styles.giftsGroup}>
              {data.availableGifts.map(
                (gift) => (
                  <GiftCart
                    key={gift.id}
                    gift={gift}
                    setPopout={setPopout}
                    setSnackbar={setSnackbar}
                  />
                ),
              )}
            </Div>
            <Header mode="secondary">Групповые подарки</Header>
            <Div className={styles.giftsGroup}>
              {data.availableGroupGifts.map(
                (gift) => (
                  <GiftCart
                    key={gift.id}
                    gift={gift}
                    setPopout={setPopout}
                    setSnackbar={setSnackbar}
                  />
                ),
              )}
            </Div>
          </Div>
        );
      }
  }
  </Query>
);

Store.propTypes = {
  setPopout: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

export default Store;
