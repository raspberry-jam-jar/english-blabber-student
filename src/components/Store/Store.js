import React from 'react';
import {
  PanelHeader, Header, Div,
} from '@vkontakte/vkui';
import { Query } from 'react-apollo';

import { GIFTS } from '../../apiGraphQl';
import GiftCart from '../GiftCart/GiftCart';
import Loader from '../Loader/Loader';
import styles from '../GameApp/gameApp.module.scss';

const Store = () => (
  <Query query={GIFTS}>
    {
      ({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return `Error! ${error.message}`;
        return (
          <Div>
            <PanelHeader>Магазин</PanelHeader>
            <Header mode="secondary">Подарки</Header>
            <Div className={styles.giftsGroup}>
              {data.availableGifts.map((gift) => <GiftCart key={gift.id} gift={gift} />)}
            </Div>
            <Header mode="secondary">Групповые подарки</Header>
            <Div className={styles.giftsGroup}>
              {data.availableGroupGifts.map((gift) => <GiftCart key={gift.id} gift={gift} />)}
            </Div>
          </Div>
        );
      }
  }
  </Query>
);

export default Store;
