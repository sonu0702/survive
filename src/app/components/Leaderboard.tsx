import { Box, Typography, Modal } from '@mui/material';
import { Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Alice', score: 95 },
  { rank: 2, name: 'Bob', score: 85 },
  { rank: 3, name: 'Charlie', score: 80 },
  { rank: 4, name: 'David', score: 75 },
  { rank: 5, name: 'Eve', score: 70 },
  { rank: 6, name: 'Frank', score: 65 },
  { rank: 7, name: 'Grace', score: 60 },
  { rank: 8, name: 'Henry', score: 55 },
  { rank: 9, name: 'Ivy', score: 50 },
  { rank: 10, name: 'Jack', score: 45 },
];

export default function Leaderboard({ open, onClose }:{open:any,onClose:any}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="leaderboard-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '400px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          p: 3,
          outline: 'none',
          border: '1px solid #3f3f46',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 3,
            color: '#FFFFFF',
            fontFamily: 'monospace',
          }}
        >
          Leaderboard
        </Typography>
        
        {leaderboardData.map((entry) => (
          <Box
            key={entry.rank}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              p: 1.5,
              backgroundColor: entry.rank <= 3 ? '#3f3f46' : 'transparent',
              borderRadius: '4px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                sx={{
                  color: entry.rank <= 3 ? '#a855f7' : '#FFFFFF',
                  fontFamily: 'monospace',
                  fontWeight: entry.rank <= 3 ? 'bold' : 'normal',
                  width: '30px',
                }}
              >
                #{entry.rank}
              </Typography>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                }}
              >
                {entry.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: entry.rank <= 3 ? '#a855f7' : '#94a3b8',
                fontFamily: 'monospace',
                fontWeight: entry.rank <= 3 ? 'bold' : 'normal',
              }}
            >
              {entry.score}
            </Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  );
}