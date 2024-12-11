import React from 'react';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { Facebook, Google, LinkedIn, Twitter } from '@mui/icons-material';

const TrafficStatistics = () => {
  const data = [
    {
      title: 'Facebook',
      value: '1.95k',
      icon: <Facebook style={{ color: '#1877F2', fontSize: 40 }} />,
    },
    {
      title: 'Google',
      value: '9.12k',
      icon: <Google style={{ color: '#EA4335', fontSize: 40 }} />,
    },
    {
      title: 'Linkedin',
      value: '6.98k',
      icon: <LinkedIn style={{ color: '#0A66C2', fontSize: 40 }} />,
    },
    {
      title: 'Twitter',
      value: '8.49k',
      icon: <Twitter style={{ color: '#1DA1F2', fontSize: 40 }} />,
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {/* İlk başlık */}
      <Typography variant="h6" gutterBottom>
        Traffic by site
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box>{item.icon}</Box>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* İkinci başlık */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Traffic by mobile app
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box>{item.icon}</Box>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrafficStatistics;
