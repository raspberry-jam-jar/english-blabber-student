import React from 'react';
import PropTypes from 'prop-types';

import styles from './giftCart.module.scss';
import defaultImage from './giftbox.png';

const GiftCart = ({ gift }) => {
  const imageUrl = gift.image ? gift.image : defaultImage;
  const remainLookup = gift.remain != null ? `${gift.remain} шт.` : '';

  return (
    <a className={`${styles.giftContainer} ${gift.canBuy ? '' : styles.isTooExpensive}`} href="some-href">
      <div className={styles.giftContainerImg}>
        <img src={imageUrl} alt="gift box" />
      </div>
      <div className={styles.giftInfoPanel}>
        <div>
          <span className={styles.coin} />
          {gift.price}
        </div>
        <div>{remainLookup}</div>
      </div>
      <div>{gift.name}</div>
    </a>
  );
};

GiftCart.propTypes = {
  gift: PropTypes.shape({
    canBuy: PropTypes.bool,
    name: PropTypes.string,
    price: PropTypes.number,
    remain: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default GiftCart;
