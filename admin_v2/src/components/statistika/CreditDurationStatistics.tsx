import React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '3 ayadək', value: 10, color: '#A8E6CF' },
  { name: '6 ayadək', value: 15, color: '#DCEDC1' },
  { name: '9 ayadək', value: 20, color: '#FFD3B6' },
  { name: '12 ayadək', value: 25, color: '#FFAAA5' },
  { name: '15 ayadək', value: 10, color: '#FF8B94' },
  { name: '18 ayadək', value: 5, color: '#D4A5A5' },
  { name: '21 ayadək', value: 8, color: '#A8A5D4' },
  { name: '24 ayadək', value: 7, color: '#85D4E3' },
];

// eslint-disable-next-line
const CreditDurationStatistics = () => {
  return (
    <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        {/* Başlık */}
        <Typography variant="h6" align="center" gutterBottom>
          Verilmiş kreditlərin müddəti üzrə statistika
        </Typography>

        {/* Donut Chart */}
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value }) => `${value}`} // Dilimlerin üzerinde değerleri göster
                isAnimationActive={false} // Kliklenebilirliği devre dışı bırak
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Toplam */}
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Total
        </Typography>
        <Typography variant="h3" align="center" color="primary" sx={{ fontWeight: 'bold' }}>
          501,617
        </Typography>

        {/* Legend */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {data.map((item) => (
            <Box key={item.name} display="flex" alignItems="center" sx={{ mx: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2">{item.name}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CreditDurationStatistics;
