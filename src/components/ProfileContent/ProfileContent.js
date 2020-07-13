import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Header, Div, Gallery,
} from '@vkontakte/vkui';

import GiftCart from '../GiftCart/GiftCart';
import styles from './profileContent.module.scss';

const ProfileContent = ({
  userPhotoUrl, hero, setPopout, setSnackbar, refetchMyUserState,
}) => (
  <div>
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
      <Header mode="primary" style={{ textAlign: 'center' }} subtitle={`Уровень ${hero.heroClass.level}`}>
        {hero.heroClass.name}
      </Header>
      <Div>
        {
          // eslint-disable-next-line react/prop-types
          hero.heroClass.skills.map(
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
      style={{ height: 310, marginTop: 12 }}
      bullets="dark"
    >
      {
        // eslint-disable-next-line react/prop-types
        hero.backpack.map(
          (boughtGift) => (
            <GiftCart
              key={boughtGift.id}
              gift={boughtGift}
              setPopout={setPopout}
              setSnackbar={setSnackbar}
              refetchMyUserState={refetchMyUserState}
              isBackpack
            />
          ),
        )
      }
    </Gallery>
  </div>
);

ProfileContent.propTypes = {
  userPhotoUrl: PropTypes.string.isRequired,
  hero: PropTypes.shape(
    {
      coins: PropTypes.number.isRequired,
      capacity: PropTypes.number.isRequired,
      heroClass: PropTypes.shape(
        {
          name: PropTypes.string,
          level: PropTypes.number,
          skills: PropTypes.shape(
            {
              name: PropTypes.string,
            },
          ).isRequired,
        },
      ).isRequired,
      backpack: PropTypes.shape(
        {
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          image: PropTypes.string,
          quantity: PropTypes.number,
        },
      ).isRequired,
    },
  ).isRequired,
  setPopout: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  refetchMyUserState: PropTypes.func.isRequired,
};

export default ProfileContent;
