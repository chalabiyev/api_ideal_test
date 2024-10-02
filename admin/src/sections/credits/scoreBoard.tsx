import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';

type ScoreCardProps = {
  score: number;
};

const getColor = (score: number) => {
  if (score < 300) return '#e53935'; // Red for 'Pis'
  if (score < 450) return '#fb8c00'; // Orange for 'Kafi'
  if (score < 600) return '#fdd835'; // Yellow for 'Orta'
  if (score < 750) return '#43a047'; // Light Green for 'Yaxşı'
  return '#1b5e20'; // Dark Green for 'Əla'
};

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const scoreColor = getColor(score);

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: 2,
        padding: 3,
        textAlign: 'center',
       width:"100%",
        margin: 'auto',
      }}
    >
      {/* Score Display */}
      <Typography variant="h3" color="textPrimary" sx={{ marginBottom: 2 }}>
        {score}
      </Typography>
      <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
        {score < 300
          ? 'Pis'
          : score < 450
            ? 'Kafi'
            : score < 600
              ? 'Orta'
              : score < 750
                ? 'Yaxşı'
                : ''}
      </Typography>

      {/* Indicator Line */}
      <LinearProgress
        variant="determinate"
        value={(score / 1000) * 100}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#ddd',
          '& .MuiLinearProgress-bar': {
            backgroundColor: scoreColor,
          },
        }}
      />

      {/* Category Bar */}
      <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 2 }}>
        {['Pis', 'Kafi', 'Orta', 'Yaxşı', 'Əla'].map((label, index) => (
          <Grid item key={label} xs={2}>
            <Box
              sx={{
                backgroundColor: getColor(150 * index + 150), // Adjust score ranges
                height: 20,
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">{label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScoreCard;
