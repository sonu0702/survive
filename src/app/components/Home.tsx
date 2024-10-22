"use client"
// app/components/Home.tsx
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import ScenarioCard from './ScenarioCard';
import Leaderboard from './Leaderboard';
import { Trophy } from 'lucide-react';
import { useTelegramWebApp } from '../hooks/useTelegramWebApp';

export default function Home() {
  const { webApp, user } = useTelegramWebApp();
  const [strategy, setStrategy] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const maxChars = 140;
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true);

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
      // Show result or do something with the strategy
    }, 2000);
  };

  const handleChange = (e:any) => {
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
      <ScenarioCard />
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
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: resultVisible ? 1 : 0, scale: resultVisible ? 1 : 0.8 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Box sx={{ width: 350, height: 240, backgroundColor: '#1a1a1a', borderRadius: 2, mt: 4, textAlign: 'center', color: '#FFFFFF', p: 4 }}>
            {resultVisible ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Box sx={{ width: 60, height: 60, backgroundColor: '#6b21a8', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    ⚡
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontFamily: 'monospace', mt: 3 }}>JUDGEMENT</Typography>
                <Typography sx={{ color: '#94a3b8', mt: 2 }}>{user?.first_name} strategy shows promise, but the cold is unforgiving...</Typography>
              </>
            ) : (
              <CircularProgress sx={{ color: '#94a3b8' }} />
            )}
          </Box>
        </motion.div>
      )}
      <Leaderboard
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />
    </Box>
  );
}
