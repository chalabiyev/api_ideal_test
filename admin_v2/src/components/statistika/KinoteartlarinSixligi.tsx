import { BookingStatistics } from 'src/sections/overview/booking/booking-statistics';

// eslint-disable-next-line
const KinoteartlarinSixligi = () => {
  return (
    <BookingStatistics
      sx={{ mt: 5 }}
      title="Başlıq olacaq burada"
      chart={{
        series: [
          {
            name: 'Günlük',
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25','26','27','28','29','30','31'],
            data: [{ name: 'Sıxlığı', data: [24, 41, 35, 151, 49, 38, 51, 55, 52, 61, 69, 91, 106, 114, 125, 132, 141, 148, 152, 158, 162, 166, 170, 174, 177, 180, 183, 186, 188, 190, 192] }],
          },
          {
            name: 'Həftəlik',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            data: [{ name: 'Sıxlığı', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
          },
          {
            name: 'Aylıq',
            categories: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
            data: [{ name: 'Sıxlığı', data: [76, 42, 29, 41, 27, 96, 31, 32, 37, 31, 39, 41] }],
          },
        ],
      }}
    />
  );
};

export default KinoteartlarinSixligi;
