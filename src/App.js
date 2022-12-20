import React from 'react';
import './App.css';
import ChatLog from './components/ChatLog';
import chatMessages from './data/messages.json';
import { useState } from 'react';

const LOCAL_NAME = 'Vladimir';

// Map over li applying mutatorFunction only when predicateFunction
// returns true.
// Takes: list, predicate function, mutator function
// Returns: copy of list with replaced elements.
const mapWhen = function (li, predicateFunc, mutatorFunc) {
  return li.map((element) => {
    if (predicateFunc(element)) {
      return mutatorFunc(element);
    } else {
      return element;
    }
  });
};

const App = () => {
  const [messagesState, setMessagesState] = useState(chatMessages);

  // Returns a list of unique message senders from a list of messages.
  // Takes list of messages.
  // Returns list of unique senders.
  const getSenders = function (messages) {
    return Array.from(new Set(messages.map((m) => m.sender)));
  };

  // Takes list of messages.
  // Returns count of liked messages.
  const countLikes = function (messages) {
    return messages.reduce(
      (count, message) => (message.liked ? count + 1 : count),
      0
    );
  };

  // Toggle the liked field of a single message object.
  // Takes a message object
  // Returns new message with modified fields.
  const toggleLikedOnMessage = (message) => {
    return { ...message, liked: !message.liked };
  };

  // Toggles the liked field on a single message in list where
  // id = message.id.
  // Takes valid id and list of messages.
  // Returns copy of list with changed message.
  const toggleLikedById = function (id, messages) {
    const newMessages = mapWhen(
      messages,
      (m) => m.id === id,
      toggleLikedOnMessage
    );
    return newMessages;
  };

  // Sets the liked flag on a single message and saves state.
  // Takes message id.
  // Sets messageState triggering redraw of dependent JSX objects.
  const handleLiked = function (id) {
    // console.log(`in handle liked for: ${id}`);
    setMessagesState((messagesState) => toggleLikedById(id, messagesState));
  };

  return (
    <div id="App">
      <header>
        <h1>
          Chat between: {getSenders(messagesState).join(', ')}:&nbsp;
          {countLikes(messagesState)} ❤️s
        </h1>
      </header>
      <main>
        <ChatLog
          entries={messagesState}
          handleLiked={handleLiked}
          localName={LOCAL_NAME}
        ></ChatLog>
        {/* Wave  01: Render one ChatEntry component
        Wave 02: Render ChatLog component */}
      </main>
    </div>
  );
};

export default App;
