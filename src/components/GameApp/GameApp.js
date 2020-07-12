import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, Epic,
} from '@vkontakte/vkui';
import { Query } from 'react-apollo';

import { MY_USER } from '../../apiGraphQl';
import BottomMenu from '../BottomMenu/BottomMenu';
import Loader from '../Loader/Loader';
import HeroRate from '../HeroRate/HeroRate';
import ProfileContent from '../ProfileContent/ProfileContent';
import Store from '../Store/Store';

const GameApp = ({ user }) => {
  const [activePanel, setActivePanel] = useState(sessionStorage.getItem('activePanel') || 'profile');
  const [popout, setPopout] = useState(null);

  const keepActivePanel = (activePanelName) => {
    sessionStorage.setItem('activePanel', activePanelName);
    setActivePanel(activePanelName);
  };

  return (
    <Query query={MY_USER}>
      {
        ({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;
          return (
            <Epic tabbar={
              <BottomMenu activePanel={activePanel} setActivePanel={keepActivePanel} />
            }
            >
              <View activePanel={activePanel} popout={popout}>
                <Panel id="profile">
                  <PanelHeader separator={false}>Профиль</PanelHeader>
                  <HeroRate hero={data.myUser.hero} />
                  <ProfileContent
                    userPhotoUrl={user.photo_200}
                    hero={data.myUser.hero}
                    setPopout={setPopout}
                  />
                </Panel>
                <Panel id="chat">
                  <PanelHeader separator={false}>Чат</PanelHeader>
                  <HeroRate hero={data.myUser.hero} />
                </Panel>
                <Panel id="store">
                  <PanelHeader separator={false}>Магазин</PanelHeader>
                  <HeroRate hero={data.myUser.hero} />
                  <Store setPopout={setPopout} />
                </Panel>
              </View>
            </Epic>
          );
        }
      }
    </Query>
  );
};

GameApp.propTypes = {
  user: PropTypes.shape({
    photo_200: PropTypes.string,
  }).isRequired,
};

export default GameApp;
