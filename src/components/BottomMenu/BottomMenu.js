import React from 'react';
import PropTypes from 'prop-types';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user';
import Icon24ChatsOutline from '@vkontakte/icons/dist/24/chats';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';

const BottomMenu = ({ activePanel, setActivePanel }) => {
  const menuData = [
    { id: 'profile', text: 'Профиль', children: <Icon24UserOutline /> },
    { id: 'chat', text: 'Чат', children: <Icon24ChatsOutline /> },
    { id: 'store', text: 'Магазин', children: <Icon24Gift /> },
  ];

  const menu = menuData.map((item, index) => (
    <TabbarItem
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      text={item.text}
      onClick={() => setActivePanel(item.id)}
      selected={activePanel === item.id}
    >
      {item.children}
    </TabbarItem>
  ));

  return (
    <Tabbar>{menu}</Tabbar>
  );
};

BottomMenu.propTypes = {
  activePanel: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};

export default BottomMenu;
