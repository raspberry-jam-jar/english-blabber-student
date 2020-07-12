import React from 'react';
import PropTypes from 'prop-types';
import {
  Snackbar, Avatar,
} from '@vkontakte/vkui';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Clear from '@vkontakte/icons/dist/16/clear';

const BaseSnackbar = ({
  icon, text, iconColor, setSnackbar,
}) => (
  <Snackbar
    layout="vertical"
    onClose={() => setSnackbar(null)}
    before={<Avatar size={24} style={{ background: iconColor }}>{icon}</Avatar>}
  >
    {text}
  </Snackbar>
);

const SuccessSnackbar = ({ setSnackbar }) => (
  <BaseSnackbar
    icon={<Icon16Done fill="#fff" width={14} height={14} />}
    iconColor="green"
    text="Готово!"
    setSnackbar={setSnackbar}
  />
);

const ErrorSnackbar = ({ setSnackbar }) => (
  <BaseSnackbar
    icon={<Icon16Clear fill="#fff" width={14} height={14} />}
    iconColor="red"
    text="Ошибка("
    setSnackbar={setSnackbar}
  />
);

BaseSnackbar.propTypes = {
  icon: PropTypes.element.isRequired,
  iconColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

ErrorSnackbar.propTypes = {
  setSnackbar: PropTypes.func.isRequired,
};

SuccessSnackbar.propTypes = {
  setSnackbar: PropTypes.func.isRequired,
};

export {
  ErrorSnackbar, SuccessSnackbar,
};
