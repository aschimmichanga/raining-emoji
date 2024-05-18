import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fall = keyframes`
  0% {
    transform: translateY(-100%) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(${({ rotation }) => rotation}deg);
    opacity: 0;
  }
`;

const fallWithAcceleration = (duration, rotation) => css`
  animation: ${fall} ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
  animation-duration: ${duration}s;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: rotate(${rotation}deg);
`;

const Emoji = styled.div`
  position: absolute;
  top: 0;
  left: ${({ left }) => left}%;
  font-size: ${({ size }) => size}px;
  ${({ duration, delay, rotation }) => fallWithAcceleration(duration, rotation)}
  animation-delay: ${({ delay }) => delay}s;
`;

const EmojiRainContainer = styled.div`
  position: fixed;  // Ensures the container covers the entire screen
  top: 0;
  left: 0;
  width: 100vw;     // Full viewport width
  height: 100vh;    // Full viewport height
  overflow: hidden;
  pointer-events: none;
`;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const EmojiRain = ({ emojis = ['🌟', '🌈', '💖'], count = 20 }) => {
  const [emojiArray, setEmojiArray] = useState([]);

  useEffect(() => {
    const generateEmojis = () => {
      const newEmoji = {
        id: Math.random(), // Unique ID for each emoji
        emoji: emojis[getRandomInt(0, emojis.length - 1)],
        left: getRandomInt(0, 100),
        size: getRandomInt(20, 50),
        duration: getRandomInt(3, 7), // Faster falling duration
        delay: getRandomInt(0, 5),  // Random delay for each emoji
        rotation: getRandomInt(0, 360) // Random rotation for each emoji
      };
      setEmojiArray((prevArray) => [...prevArray, newEmoji]);
    };

    const interval = setInterval(generateEmojis, 300); // Generate new emoji every 300ms

    return () => clearInterval(interval);
  }, [emojis]);

  return (
    <EmojiRainContainer>
      {emojiArray.map((emojiData) => (
        <Emoji
          key={emojiData.id}
          left={emojiData.left}
          size={emojiData.size}
          duration={emojiData.duration}
          delay={emojiData.delay}
          rotation={emojiData.rotation}
        >
          {emojiData.emoji}
        </Emoji>
      ))}
    </EmojiRainContainer>
  );
};

export default EmojiRain;
