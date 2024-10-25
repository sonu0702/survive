import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Skull, Clock } from 'lucide-react';

const scenarios = [
  { id: 127, title: 'Lost in a Blizzard', description: `What's your survival strategy?` },
  { id: 128, title: 'Deserted Island', description: 'How will you find water and shelter?' },
  { id: 129, title: 'Forest Fire Escape', description: 'How do you escape the fast-approaching fire?' },
];

const COUNTDOWN_TIME = 30; // 30 seconds countdown

export default function ScenarioCardUpgraded({ onTimerComplete, userName = "Player" }:{onTimerComplete:any,userName:string}) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_TIME);
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimerComplete(true);
      onTimerComplete && onTimerComplete();
    }
  }, [timeLeft, onTimerComplete]);

  const handlers = useSwipeable({
    onSwipedLeft: () => changeScenario(1),
    onSwipedRight: () => changeScenario(-1),
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  });

  const changeScenario = (direction:any) => {
    setCurrentScenarioIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return scenarios.length - 1;
      if (newIndex >= scenarios.length) return 0;
      return newIndex;
    });
    // Reset timer when scenario changes
    setTimeLeft(COUNTDOWN_TIME);
    setIsTimerComplete(false);
  };

  const formatTime = (seconds:number) => {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '350px',
          height: '220px', // Increased height to accommodate new elements
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'none',
          margin: '0 auto',
          padding: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scenarios[currentScenarioIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            {...handlers}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #3f3f46, #6b21a8)',
                borderRadius: 2,
                p: 2,
                color: '#FFFFFF',
                textAlign: 'center',
                margin: 0,
                position: 'relative',
              }}
            >
              {/* User Name */}
              <Typography 
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontFamily: 'monospace'
                }}
              >
                {userName}
              </Typography>

              {/* Timer */}
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: timeLeft <= 10 ? '#ef4444' : '#94a3b8'
                }}
              >
                <Clock size={16} />
                <Typography 
                  sx={{ 
                    fontFamily: 'monospace',
                    animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none'
                  }}
                >
                  {formatTime(timeLeft)}
                </Typography>
              </Box> */}

              <Typography variant="h6" sx={{ mb: 1, fontFamily: 'monospace', mt: 3 }}>
                SCENARIO #{scenarios[currentScenarioIndex].id}
              </Typography>
              
              <Typography
                variant="h4"
                sx={{ color: '#a855f7', fontWeight: 'bold', fontFamily: 'monospace', mb: 1 }}
              >
                {scenarios[currentScenarioIndex].title}
              </Typography>

              {/* Rewards Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  mt: 2,
                  mb: 1,
                  '& > div': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }
                }}
              >
                <Box>
                  <ThumbsUp size={20} color="#22c55e" />
                  <Typography sx={{ color: '#22c55e', fontFamily: 'monospace' }}>
                    10$
                  </Typography>
                </Box>
                <Box>
                  <Skull size={20} color="#ef4444" />
                  <Typography sx={{ color: '#ef4444', fontFamily: 'monospace' }}>
                    1$
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}