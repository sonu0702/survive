import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const ScrollingJudgmentText = ({ text = "", speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
        
        // Check if text has overflowed
        if (containerRef.current && textRef.current) {
          const container:any = containerRef.current;
          const textElement:any = textRef.current;
          
          if (textElement.scrollHeight > container.clientHeight) {
            // Move first line to the top
            const lineHeight = parseInt(window.getComputedStyle(textElement).lineHeight);
            textElement.style.marginTop = `-${lineHeight}px`;
            
            // After animation, remove the first line and reset margin
            setTimeout(() => {
              const words = displayedText.split(' ');
              let firstLineWords = [];
              let remainingWords = [...words];
              
              // Roughly estimate first line (can be adjusted based on container width)
              let currentLength = 0;
              while (remainingWords.length > 0 && currentLength < container.clientWidth / 8) {
                const word = remainingWords[0];
                if (currentLength + word.length * 8 > container.clientWidth) break;
                firstLineWords.push(remainingWords.shift());
                currentLength += word.length * 8 + 4; // rough estimate of word width
              }
              
              setDisplayedText(remainingWords.join(' '));
              textElement.style.marginTop = '0';
            }, 300); // Adjust timing based on your needs
          }
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, displayedText]);

  return (
    <Box 
      ref={containerRef}
      sx={{
        height: '150px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 1,
        p: 2
      }}
    >
      <Typography
        ref={textRef}
        sx={{
          color: '#94a3b8',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          transition: 'margin-top 0.3s ease-out',
          lineHeight: '1.5em'
        }}
      >
        {displayedText}
        <span 
          style={{
            animation: 'blink 1s infinite',
            color: '#94a3b8'
          }}
        >
          |
        </span>
      </Typography>
    </Box>
  );
};

export default ScrollingJudgmentText;