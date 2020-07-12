import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from '@vkontakte/vkui';

import styles from './giftCart.module.scss';
import defaultImage from './giftbox.png';

const GiftCart = ({ gift, isBackpack, setPopout }) => {
  const imageUrl = gift.image ? gift.image : defaultImage;
  const useGift = {
    alertBody: `Использовать "${gift.name}"?`,
    isActive: true,
    buttonName: 'Использовать',
    alertButtonName: 'Да, давай!',
    lookup: `${gift.quantity} шт.`,
  };
  const buyGift = {
    alertBody: `Купить "${gift.name}" за ${gift.price} профкоинов?`,
    isActive: gift.canBuy,
    buttonName: 'Купить',
    alertButtonName: 'Беру!',
    lookup: gift.remain != null ? `${gift.remain} шт.` : '',
  };
  const giftCase = isBackpack ? useGift : buyGift;

  const closePopout = () => {
    setPopout(null);
  };

  const confirmActionPopout = (
    <Alert
      actions={[{
        title: 'Назад',
        autoclose: true,
        mode: 'cancel',
      }, {
        title: giftCase.alertButtonName,
        autoclose: true,
      }]}
      onClose={closePopout}
    >
      <h2>Подтвердите действие</h2>
      <p>
        {giftCase.alertBody}
      </p>
    </Alert>
  );
  const declineActionPopout = (
    <Alert
      actions={[{
        title: 'Назад',
        autoclose: true,
        mode: 'cancel',
      }]}
      onClose={closePopout}
    >
      <h2>Действие нельзя выполнить</h2>
      <p>
        У
        {gift.isGroupWide ? ' когото-то из группы ' : ' вас '}
        недостаточно профкоинов для покупки
      </p>
    </Alert>
  );

  return (
    <div
      className={`${styles.giftContainer} ${giftCase.isActive ? '' : styles.isTooExpensive}`}
    >
      <div className={styles.giftContainerImg}>
        <img src={imageUrl} alt="gift box" />
      </div>
      <div>
        <div className={styles.giftInfoPanel}>
          <div>
            <span className={styles.coin} />
            {gift.price}
          </div>
          <div>{giftCase.lookup}</div>
        </div>
        <div>{gift.name}</div>
      </div>
      <Button
        style={{ marginTop: 6 }}
        onClick={() => setPopout(giftCase.isActive ? confirmActionPopout : declineActionPopout)}
      >
        {giftCase.buttonName}
      </Button>
    </div>
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
    isGroupWide: PropTypes.bool,
  }).isRequired,
  isBackpack: PropTypes.bool,
  setPopout: PropTypes.func.isRequired,
};

GiftCart.defaultProps = {
  isBackpack: false,
};

export default GiftCart;
