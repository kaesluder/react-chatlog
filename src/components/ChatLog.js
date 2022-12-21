import React from 'react';
import './ChatLog.css';
import PropTypes from 'prop-types';
import ChatEntry from './ChatEntry';
// import PropTypes from 'prop-types';

const ChatLog = function (props) {
  //console.log('in ChatLog');
  const _renderOneEntry = function (entry) {
    //console.log('in _renderOneEntry');
    return (
      // for _renderOneEntry
      <ChatEntry
        key={entry.id}
        id={entry.id}
        sender={entry.sender}
        body={entry.body}
        liked={entry.liked}
        timeStamp={entry.timeStamp}
        localName={props.localName}
        handleLiked={props.handleLiked}
      ></ChatEntry>
    );
  };
  return props.entries.map(_renderOneEntry); // from ChatLog
};
ChatLog.propTypes = {
  localName: PropTypes.string.isRequired,
  handleLiked: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      sender: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      timeStamp: PropTypes.string.isRequired,
      liked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  // setter: PropTypes.func.isRequired,
};
export default ChatLog;
