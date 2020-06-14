import React from 'react';
import PropTypes from 'prop-types';

import styles from './giftCart.module.scss';

const GiftCart = ({ gift }) => (
  <a className={`${styles.giftContainer} ${gift.canBuy ? '' : styles.isTooExpensive}`} href="some-href">
    <div className={styles.giftContainerImg} />
    <div>{gift.price}</div>
    <div>{gift.name}</div>
  </a>
);

GiftCart.propTypes = {
  gift: PropTypes.shape({
    canBuy: PropTypes.bool,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default GiftCart;
