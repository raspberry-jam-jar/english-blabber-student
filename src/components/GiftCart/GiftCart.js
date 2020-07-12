import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Alert,
} from '@vkontakte/vkui';
import { useMutation } from '@apollo/react-hooks';

import { BUY_OR_USE_GIFT } from '../../apiGraphQl';
import Loader from '../Loader/Loader';
import { ErrorSnackbar, SuccessSnackbar } from '../Snackbars/Snackbars';
import styles from './giftCart.module.scss';
import defaultImage from './giftbox.png';

const GiftCart = ({
  gift, isBackpack, setPopout, setSnackbar,
}) => {
  const imageUrl = gift.image ? gift.image : defaultImage;
  const useGift = {
    alertBody: `Использовать "${gift.name}"?`,
    isActive: true,
    buttonName: 'Использовать',
    alertButtonName: 'Да, давай!',
    lookup: `${gift.quantity} шт.`,
    giftClassId: gift.giftClass ? gift.giftClass.id : null,
    quantity: -1,
  };
  const buyGift = {
    alertBody: `Купить "${gift.name}" за ${gift.price} профкоинов?`,
    isActive: gift.canBuy,
    buttonName: 'Купить',
    alertButtonName: 'Беру!',
    lookup: gift.remain != null ? `${gift.remain} шт.` : '',
    giftClassId: gift.id,
    quantity: 1,
  };
  const giftCase = isBackpack ? useGift : buyGift;

  const showSnackbar = (data, error) => {
    if (error || data.errors) setSnackbar(<ErrorSnackbar setSnackbar={setSnackbar} />);
    if (data.errors === undefined) setSnackbar(<SuccessSnackbar setSnackbar={setSnackbar} />);
  };
  const [mutateGift, { loading }] = useMutation(
    BUY_OR_USE_GIFT,
    {
      onCompleted: (data) => showSnackbar(data),
      onError: (error) => showSnackbar(error),
    },
  );

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
        action: () => mutateGift(
          {
            variables: { giftClassId: giftCase.giftClassId, quantity: giftCase.quantity },
          },
        ),
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

  if (loading) return <Loader />;

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
    id: PropTypes.string.isRequired,
    canBuy: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    remain: PropTypes.number,
    image: PropTypes.string,
    quantity: PropTypes.number,
    isGroupWide: PropTypes.bool.isRequired,
    giftClass: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  isBackpack: PropTypes.bool,
  setPopout: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

GiftCart.defaultProps = {
  isBackpack: false,
  gift: {
    remain: null,
    giftClass: {
      id: null,
    },
  },
};

export default GiftCart;
