import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, MenuItem, Select, Stack } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Örnek veri
const dataByYear = {
  2023: [
    { name: 'Jan', daxil: 20, verilen: 10 },
    { name: 'Feb', daxil: 25, verilen: 15 },
    { name: 'Mar', daxil: 30, verilen: 20 },
    { name: 'Apr', daxil: 40, verilen: 25 },
    { name: 'May', daxil: 45, verilen: 30 },
    { name: 'Jun', daxil: 20, verilen: 10 },
    { name: 'Jul', daxil: 10, verilen: 5 },
    { name: 'Aug', daxil: 50, verilen: 40 },
    { name: 'Sep', daxil: 45, verilen: 35 },
    { name: 'Oct', daxil: 30, verilen: 20 },
    { name: 'Nov', daxil: 25, verilen: 15 },
    { name: 'Dec', daxil: 30, verilen: 20 },
  ],
  2024: [
    { name: 'Jan', daxil: 30, verilen: 20 },
    { name: 'Feb', daxil: 35, verilen: 25 },
    { name: 'Mar', daxil: 40, verilen: 30 },
    { name: 'Apr', daxil: 50, verilen: 40 },
    { name: 'May', daxil: 55, verilen: 45 },
    { name: 'Jun', daxil: 30, verilen: 20 },
    { name: 'Jul', daxil: 15, verilen: 10 },
    { name: 'Aug', daxil: 60, verilen: 50 },
    { name: 'Sep', daxil: 55, verilen: 45 },
    { name: 'Oct', daxil: 40, verilen: 30 },
    { name: 'Nov', daxil: 35, verilen: 25 },
    { name: 'Dec', daxil: 40, verilen: 30 },
  ],
};

const PartnerSourceStatistics = () => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  // @ts-ignore: Unreachable code error
  const data = dataByYear[selectedYear];

  return (
    <Card sx={{ width: '100%', maxWidth: 920, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" align="left" gutterBottom>
          Partnyor mənbəsi - kredit statistikası
        </Typography>
        <Typography variant="body2" align="left" color="text.secondary">
          Keçən ildən 43% daha çox
        </Typography>

        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
          >
            {Object.keys(dataByYear).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Bar Chart */}
        <Box sx={{ height: 245 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip  />
              <Legend />
              <Bar radius={4} dataKey="daxil" fill="#006400" name="Daxil olan sorğular" />
              <Bar
                radius={4}
                animationEasing="ease"
                dataKey="verilen"
                fill="#FFA500"
                name="Verilən kreditlər"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Toplam Değerler */}
        <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
          <Box textAlign="center">
            <Typography variant="h6" color="text.primary">
              Daxil olan sorğular
            </Typography>
            <Typography variant="h4" color="#006400">
              1.23k
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" color="text.primary">
              Verilən kreditlər
            </Typography>
            <Typography variant="h4" color="#FFA500">
              6.79k
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PartnerSourceStatistics;
