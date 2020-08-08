import React from 'react';
import PropTypes from 'prop-types';
import {
  Group, CardGrid, Card, Header,
} from '@vkontakte/vkui';

const MessageCard = ({ message }) => {
  const datetimeCreated = new Date(message.datetimeCreated);
  return (
    <Group
      separator="hide"
      header={(
        <Header mode="secondary">
          {`${message.author.hero.heroClass.name} ${message.author.lastName} ${message.author.firstName}`}
        </Header>
      )}
    >
      <CardGrid>
        <Card size="m">
          <div style={{ padding: 10 }}>
            {message.text}
          </div>
          <div style={{
            fontSize: 10, color: 'grey', textAlign: 'end', padding: 10,
          }}
          >
            {`${datetimeCreated.getHours()}:${datetimeCreated.getMinutes()}`}
          </div>
        </Card>
      </CardGrid>
      <br />
    </Group>
  );
};

MessageCard.propTypes = {
  message: PropTypes.shape({
    datetimeCreated: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      hero: PropTypes.shape({
        heroClass: PropTypes.shape(
          {
            name: PropTypes.string,
          },
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default MessageCard;
