import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';

import styles from './heroRate.module.scss';
import profileStyles from '../ProfileContent/profileContent.module.scss';

const HeroRate = ({ hero }) => (
  <div
    className={profileStyles.roundedContainer}
    style={{
      display: 'flex',
      flexDirection: 'row',
      background: 'lightgrey',
      padding: 0,
      width: '100%',
      position: 'fixed',
      zIndex: 12,
    }}
  >
    <Div>
      <span className={styles.coin} />
      {hero.coins}
    </Div>
    <Div>
      <span className={styles.cristall} />
      {hero.capacity}
      /
      {hero.heroClass.capacity}
    </Div>
  </div>

);

HeroRate.propTypes = {
  hero: PropTypes.shape({
    coins: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    heroClass: PropTypes.shape(
      {
        capacity: PropTypes.number.isRequired,
      },
    ).isRequired,
  }).isRequired,
};

export default HeroRate;
