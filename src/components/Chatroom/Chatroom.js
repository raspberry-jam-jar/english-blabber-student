import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import {
  FormLayout, Input, Button, Div,
} from '@vkontakte/vkui';

import {
  blabberClient,
  SEND_MESSAGE,
} from '../../apiGraphQl';
import MessageCard from '../Message/Message';

const Chatroom = ({
  userId, chatRoomId, chatroomHistory, subscribeToNewMessages, loadingMore, LoadMoreMessages,
}) => {
  const [messageText, setMessageText] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE, { client: blabberClient });
  const messagesEndRef = useRef(null);

  window.onscroll = () => {
    if (document.documentElement.scrollTop === 0 && !loadingMore) {
      LoadMoreMessages();
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
    subscribeToNewMessages();
  }, []);

  return (
    <div style={{ paddingBottom: 60 }}>
      {loadingMore && <ScreenSpinner size="small" />}
      {chatroomHistory.map(
        (message) => (
          <MessageCard key={message.id} message={message} />
        ),
      )}
      <Div style={{
        position: 'fixed',
        top: 685,
        zIndex: 12,
        display: 'flex',
        background: 'white',
        width: '100%',
        padding: 0,
      }}
      >
        <FormLayout style={{ width: '79%' }}>
          <Input
            type="text"
            placeholder="Введите сообщение"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
        </FormLayout>
        <Button
          size="xl"
          style={{
            height: 'min-content',
            width: 110,
            padding: '0 10px',
            margin: '12px 0',
          }}
          onClick={() => {
            if (messageText) {
              sendMessage(
                {
                  variables: {
                    chatroomId: chatRoomId,
                    authorId: userId,
                    text: messageText,
                  },
                },
              );
              setMessageText('');
            }
          }}
        >
          Отправить
        </Button>
      </Div>
      <div ref={messagesEndRef} />
    </div>
  );
};

Chatroom.propTypes = {
  userId: PropTypes.string.isRequired,
  chatRoomId: PropTypes.string.isRequired,
  subscribeToNewMessages: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  LoadMoreMessages: PropTypes.func.isRequired,
  chatroomHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chatroom;
