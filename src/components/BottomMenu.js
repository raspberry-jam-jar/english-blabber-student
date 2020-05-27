import React from 'react';

import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user';
import Icon24ChatsOutline from '@vkontakte/icons/dist/24/chats';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';

// eslint-disable-next-line react/prop-types
const BottomMenu = ({ activePanel, setActivePanel }) => (
  <Tabbar>
    <TabbarItem
      text="Профиль"
      onClick={() => setActivePanel('main')}
      selected={activePanel === 'main'}
    >
      <Icon24UserOutline />
    </TabbarItem>
    <TabbarItem
      text="Чат"
      onClick={() => setActivePanel('chat')}
      selected={activePanel === 'chat'}
    >
      <Icon24ChatsOutline />
    </TabbarItem>
    <TabbarItem
      text="Магазин"
      onClick={() => setActivePanel('store')}
      selected={activePanel === 'store'}
    >
      <Icon24Gift />
    </TabbarItem>
  </Tabbar>
);

export default BottomMenu;
