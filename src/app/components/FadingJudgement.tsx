import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const FadingJudgmentText = ({ text = "", speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0); // For triggering re-renders with AnimatePresence
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length && !isTransitioning) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
        
        // Check if text has overflowed
        if (containerRef.current && textRef.current) {
          const container:any = containerRef.current;
          const textElement:any = textRef.current;
          
          if (textElement.scrollHeight > container.clientHeight) {
            setIsTransitioning(true);
            
            // Start fade out
            setTimeout(() => {
              setKey(prev => prev + 1); // Trigger AnimatePresence
              setDisplayedText(""); // Clear text
              
              // Wait for fade out to complete, then continue typing
              setTimeout(() => {
                setDisplayedText(text[currentIndex]);
                setIsTransitioning(false);
              }, 500); // Adjust this timing for the pause between fade out and new text
            }, 100); // Small delay before starting transition
          }
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, displayedText, isTransitioning]);

  return (
    <Box 
      ref={containerRef}
      sx={{
        height: '160px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 1,
        p: 2
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            ref={textRef}
            sx={{
              color: '#94a3b8',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.5em',
              textAlign:'left'
            }}
          >
            {displayedText}
            {!isTransitioning && (
              <span 
                style={{
                  animation: 'blink 1s infinite',
                  color: '#94a3b8'
                }}
              >
                |
              </span>
            )}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default FadingJudgmentText;