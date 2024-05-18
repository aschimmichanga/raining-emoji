import React from 'react';
import RainingEmojis from './RainingEmojis';

const App = () => {
  return (
    <div className="App">
      <RainingEmojis emojis={['✨', '🎉', '❤️']} count={30} />
    </div>
  );
};

export default App;
