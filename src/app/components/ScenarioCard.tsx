// ScenarioCard.tsx
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';

const scenarios = [
  { id: 127, title: 'Lost in a Blizzard', description: `What's your survival strategy?` },
  { id: 128, title: 'Deserted Island', description: 'How will you find water and shelter?' },
  { id: 129, title: 'Forest Fire Escape', description: 'How do you escape the fast-approaching fire?' },
];

export default function ScenarioCard() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => changeScenario(1),
    onSwipedRight: () => changeScenario(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  });

  const changeScenario = (direction) => {
    setCurrentScenarioIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return scenarios.length - 1;
      if (newIndex >= scenarios.length) return 0;
      return newIndex;
    });
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
          height: '180px',
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
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontFamily: 'monospace' }}>
                SCENARIO #{scenarios[currentScenarioIndex].id}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: '#a855f7', fontWeight: 'bold', fontFamily: 'monospace', mb: 1 }}
              >
                {scenarios[currentScenarioIndex].title}
              </Typography>
              {/* <Typography variant="body1" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
                {scenarios[currentScenarioIndex].description}
              </Typography> */}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}