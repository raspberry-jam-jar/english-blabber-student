import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, Epic, Group, Header, CardGrid, Card,
} from '@vkontakte/vkui';

import BottomMenu from '../BottomMenu/BottomMenu';
import GiftCart from '../GiftCart/GiftCart';
import styles from './gameApp.module.scss';
import ProfileContent from '../ProfileContent/ProfileContent';

const gift = {
  canBuy: true,
  image: '',
  price: 10,
  name: 'Дополнительное время на тесте',
  remain: 3,
};

const GameApp = ({ user }) => {
  const [activePanel, setActivePanel] = useState('store');
  return (
    <Epic tabbar={<BottomMenu activePanel={activePanel} setActivePanel={setActivePanel} />}>
      <View activePanel={activePanel}>
        <Panel id="profile">
          <PanelHeader>Профиль</PanelHeader>
          <ProfileContent userPhotoUrl={user.photo_200} />
        </Panel>
        <Panel id="chat">
          <PanelHeader>Чат</PanelHeader>
        </Panel>
        <Panel id="store">
          <PanelHeader>Магазин</PanelHeader>
          <Header mode="secondary">Подарки</Header>
          <div className={styles.giftsGroup}>
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
            <GiftCart gift={gift} />
          </div>
          <Group header={<Header mode="secondary">Групповые подарки</Header>}>
            <CardGrid>
              <Card size="s">
                <div style={{ height: 96 }} />
              </Card>
            </CardGrid>
          </Group>
        </Panel>
      </View>
    </Epic>
  );
};

GameApp.propTypes = {
  user: PropTypes.shape({
    photo_200: PropTypes.string,
  }).isRequired,
};

export default GameApp;
