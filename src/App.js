import React from 'react';
import './App.css';
import ChatLog from './components/ChatLog';
import chatMessages from './data/messages.json';
import { useState } from 'react';

const LOCAL_NAME = 'Vladimir';

// Changes list elements matching predicateFunc using mutatorFunc
const mapMutate = function (li, predicateFunc, mutatorFunc) {
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

  const getSenders = function (messages) {
    return Array.from(new Set(messages.map((m) => m.sender)));
  };

  const countLikes = function (messages) {
    return messages.reduce(
      (count, message) => (message.liked ? count + 1 : count),
      0
    );
  };

  // toggle the liked field of an message object
  // return a copy of the object with mutated
  // field.
  const toggleLikedOnMessage = (message) => {
    return { ...message, liked: !message.liked };
  };

  const toggleLikedById = function (id, messages) {
    const newMessages = mapMutate(
      messages,
      (m) => m.id === id,
      toggleLikedOnMessage
    );
    return newMessages;
  };

  const handleLiked = function (id) {
    console.log(`in handle liked for: ${id}`);
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
