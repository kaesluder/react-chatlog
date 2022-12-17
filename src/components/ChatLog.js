import React from 'react';
import './ChatLog.css';
import ChatEntry from './ChatEntry';
// import PropTypes from 'prop-types';

// create ChatLog function
// iterate over entries

const ChatLog = function (entries) {
  console.log('in ChatLog');
  console.log(entries);
  const _renderOneEntry = function (entry) {
    console.log('in _renderOneEntry');
    return (
      // for _renderOneEntry
      <ChatEntry
        key={entry.id}
        id={entry.id}
        sender={entry.sender}
        body={entry.body}
        timeStamp={entry.timeStamp}
      ></ChatEntry>
    );
  };
  return entries.entries.map(_renderOneEntry); // from ChatLog
};

export default ChatLog;
