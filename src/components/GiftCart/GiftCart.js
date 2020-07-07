import React from 'react';
import PropTypes from 'prop-types';

import styles from './giftCart.module.scss';
import defaultImage from './giftbox.png';

const GiftCart = ({ gift, isBackpack }) => {
  const imageUrl = gift.image ? gift.image : defaultImage;
  const remainLookup = gift.remain != null ? `${gift.remain} шт.` : '';
  const boughtQuantityLookup = `${gift.quantity} шт.`;

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
        <div>{isBackpack ? boughtQuantityLookup : remainLookup}</div>
      </div>
      <div>{gift.name}</div>
    </a>
  );
};

GiftCart.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.string,
    canBuy: PropTypes.bool,
    name: PropTypes.string,
    price: PropTypes.number,
    remain: PropTypes.number,
    image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  isBackpack: PropTypes.bool,
};

GiftCart.defaultProps = {
  isBackpack: false,
};

export default GiftCart;
