import React from 'react';
import './ChatEntry.css';
import PropTypes from 'prop-types';
import TimeStamp from './TimeStamp.js';

const emptyHeart = '🤍';
const filledHeart = '❤️';

const ChatEntry = (props) => {
  // console.log(`in ChatEntry: liked = ${props.liked}`);

  // Set the display emoji for liked messages.
  const likedIcon = props.liked ? filledHeart : emptyHeart;

  // set the local/remote style
  const localRemoteClass =
    props.localName === props.sender ? 'local' : 'remote';

  return (
    <div className={'chat-entry ' + localRemoteClass}>
      <h2 className="entry-name">{props.sender}</h2>
      <section className="entry-bubble">
        <p>{props.body}</p>
        <p className="entry-time">
          <TimeStamp time={props.timeStamp}></TimeStamp>
        </p>
        <button
          className="like"
          onClick={(event) => props.handleLiked(props.id)}
        >
          {likedIcon}
        </button>
      </section>
    </div>
  );
};

ChatEntry.propTypes = {
  id: PropTypes.number.isRequired,
  sender: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timeStamp: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  localName: PropTypes.string.isRequired,
  handleLiked: PropTypes.func.isRequired,
};

export default ChatEntry;
