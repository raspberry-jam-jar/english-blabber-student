import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Header, Div, Gallery,
} from '@vkontakte/vkui';
import { Query } from 'react-apollo';

import GiftCart from '../GiftCart/GiftCart';
import { MY_USER } from '../../apiGraphQl';
import styles from './profileContent.module.scss';

const ProfileContent = ({ userPhotoUrl }) => (
  <Query query={MY_USER}>
    {
      ({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <Div>
            <Div
              className={styles.roundedContainer}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '50%',
                marginTop: 12,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              <Avatar size={96} src={userPhotoUrl} />
              <Header mode="primary" style={{ textAlign: 'center' }} subtitle={`Уровень ${data.myUser.hero.heroClassLevel}`}>
                {data.myUser.hero.heroClassName}
              </Header>
              <Div>
                {
                  data.myUser.hero.heroClassSkills.map(
                    // eslint-disable-next-line max-len
                    (skill) => <Div key={skill.id} className={styles.roundedContainer}>{skill.name}</Div>,
                  )
                }
                <Div className={styles.roundedContainer}>
                  Here will appear new hero`s skills
                </Div>
              </Div>
            </Div>
            <Header mode="secondary">Инвентарь</Header>
            <Gallery
              slideWidth="custom"
              style={{ height: 220, marginTop: 12 }}
              bullets="dark"
            >
              {
                data.myUser.hero.backpack.map(
                  (boughtGift) => <GiftCart gift={boughtGift} isBackpack />,
                )
              }
            </Gallery>
          </Div>
        );
      }
    }
  </Query>
);

ProfileContent.propTypes = {
  userPhotoUrl: PropTypes.string.isRequired,
};

export default ProfileContent;
