import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TypingText = ({ text = "", speed = 50, restartDelay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length && !isPaused) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentIndex(0);
      }, restartDelay);

      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, text, speed, restartDelay, isPaused]);

  return (
    <Box 
      sx={{
        height: '120px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Typography
        sx={{
          color: '#94a3b8',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {displayedText}
        <span className="cursor">|</span>
      </Typography>
    </Box>
  );
};

export default TypingText;