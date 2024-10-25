"use client"
// app/components/Home.tsx
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ScenarioCard from './ScenarioCard';
import Leaderboard from './Leaderboard';
import { Trophy, DollarSign, Skull, ThumbsUp, Ghost } from 'lucide-react';
import { useTelegramWebApp } from '../hooks/useTelegramWebApp';
import confetti from 'canvas-confetti';
import TypingText from './TypingText';
import ScrollingJudgmentText from './ScrollingJudgementText';
import FadingJudgmentText from './FadingJudgement';
import ScenarioCardUpgraded from './ScenarioCardUpgraded';

// Mock API response - replace with your actual API call
const submitStrategyToBackend = async (strategy: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Mock response - replace with actual API call
  let survived = Math.random() > 0.5
  return {
    survived: survived, // Random result for testing
    // survived:false,
    message: survived ?
      "Your quick thinking and resourcefulness led to survival!. This quick thinking and resourcefulness led to survival!. Hi Your quick thinking and resourcefulness led to survival!. Just say Your quick thinking and resourcefulness led to survival!" :
      "Your strategy shows promise, but the cold is unforgiving... What this strategy shows promise, but the cold is unforgiving...",
    reward: Math.random() > 0.5 ? 10 : 1
  };
};

// Confetti animation function
const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1500
  };

  function fire(particleRatio: any, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export default function Home() {
  const { webApp, user } = useTelegramWebApp();
  const [strategy, setStrategy] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [result, setResult] = useState<any>(null);

  const maxChars = 140;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    try {


      const response = await submitStrategyToBackend(strategy);
      console.log("response", response);
      setResult(response);
      // Simulate API call
      setTimeout(() => {
        setResultVisible(true)
        if (webApp) {
          console.log(JSON.stringify({
            strategy: strategy,
            // scenario: scenarios[currentScenarioIndex].id,
            user: user
          }))
        }
        if (response.survived) {
          triggerConfetti();
        }
        // Show result or do something with the strategy
      }, 2000);
    } catch (error) {
      console.error('Error submitting strategy:', error);
    }
  };

  const handleChange = (e: any) => {
    if (e.target.value.length <= maxChars) {
      setStrategy(e.target.value);
    }
  };

  return (
    <Box
      component={
        "main"
      }
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: 0,
        padding: { xs: '16px 8px', sm: '16px' },
        position: 'relative',
        overflow: 'hidden',
        '& > *': {
          margin: 0,
          maxWidth: '100%',
        }
      }}>
      {/* Scenario Card with Swipe */}
      {/* <ScenarioCard />
       */}
       <ScenarioCardUpgraded 
       onTimerComplete={() =>{
          console.log("timer done")
       }}
       userName={`Hi ${user?.username}`}/>
      <Box sx={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 10
      }}>
        <Box
          onClick={() => setLeaderboardOpen(true)}
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#6b21a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#a855f7',
            }
          }}
        >
          <Trophy size={20} color="#FFFFFF" />
        </Box>
      </Box>
      {/* Input Area */}
      <form onSubmit={handleSubmit} >
        <Box
          sx={{
            width: '100vh',
            maxWidth: { xs: '100%', sm: '450px' },
            margin: '4px auto 0',
            padding: 2,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Type your strategy..."
            InputProps={{
              style: { color: '#71717a', fontFamily: 'monospace', width: '100%' },
            }}
            onChange={handleChange}
            value={strategy}
          />
        </Box>

        {/* Character Count */}
        <Typography
          variant="body2"
          sx={{ color: '#71717a', textAlign: 'right', mt: 1, fontFamily: 'monospace' }}
        >
          {strategy.length}/{maxChars}
        </Typography>

        {/* Submit Button */}
        {!submitted && <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#6b21a8',
            borderRadius: 30,
            color: '#FFFFFF',
            fontFamily: 'monospace',
            height: 60
          }}
        >
          SUBMIT STRATEGY
        </Button>}
      </form>

      {/* Leaderboard */}
      {/* <Leaderboard /> */}
      {submitted && (
        <AnimatePresence mode="wait">
          {!resultVisible ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem'
              }}
            >
              <CircularProgress sx={{ color: '#6b21a8' }} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  width: 350,
                  backgroundColor: '#1a1a1a',
                  borderRadius: 2,
                  mt: 4,
                  overflow: 'hidden',
                  // position: 'relative'
                }}
              >
                {/* Result Banner */}


                {/* Result Content */}
                <Box sx={{
                  p: 3,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  justifyItems: 'center',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  {/* Icon Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: result?.survived ? 360 : 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: result?.survived ? '#059669' : '#991b1b',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto 1rem',
                        flexDirection: 'column'
                      }}
                    >
                      {result?.survived ? (
                        <ThumbsUp size={40} color="#FFFFFF" />
                      ) : (
                        <Skull size={40} color="#FFFFFF" />
                      )}
                    </Box>
                  </motion.div>

                  {/* Judgement Text */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'monospace',
                      mb: 2,
                      color: '#FFFFFF'
                    }}
                  >
                    JUDGEMENT
                  </Typography>

                  {/* <Typography
                    sx={{
                      color: '#94a3b8',
                      mb: 3,
                      fontFamily: 'monospace'
                    }}
                  >
                    {result?.message}
                  </Typography> */}
                  {/* <TypingText
                    text={result?.message || "Analyzing your strategy..."}
                    speed={50}
                    restartDelay={2000}
                  /> */}
                  {/* <ScrollingJudgmentText
                    text={result?.message || "Your strategy shows remarkable adaptability in facing the harsh conditions. While the immediate survival was challenging, your approach demonstrated resourcefulness in utilizing available materials. The decision to prioritize shelter creation before nightfall proved crucial, though the method of heat conservation could be refined. Consider how different materials could be combined for better insulation. The wildlife encounter response was appropriate, but future strategies might benefit from more preventive measures..."}
                    speed={50}
                  /> */}
                  <FadingJudgmentText
                    text={result?.message || "Your strategy shows remarkable adaptability in facing the harsh conditions. While the immediate survival was challenging, your approach demonstrated resourcefulness in utilizing available materials. The decision to prioritize shelter creation before nightfall proved crucial, though the method of heat conservation could be refined. Consider how different materials could be combined for better insulation. The wildlife encounter response was appropriate, but future strategies might benefit from more preventive measures. Your decision-making process revealed a good balance between immediate needs and long-term survival considerations..."}
                    speed={50}
                  />
                  {/* Reward Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        color: '#fbbf24'
                      }}
                    >
                      <DollarSign size={24} />
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 'bold'
                        }}
                      >
                        {result?.reward}.00
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <Leaderboard
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />
    </Box>
  );
}
