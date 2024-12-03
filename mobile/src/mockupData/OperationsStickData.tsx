import {
  CalculatorIcon,
  PaymentIcon,
  TransactionIcon,
  VideoRequestIcon,
} from '../assets';

export default [
  {
    id: '1',
    icon: <TransactionIcon />,
    title: 'Köçürmə',
  },
  {
    id: '2',
    icon: <VideoRequestIcon />,
    title: 'Müraciət',
  },
  {
    id: '3',
    icon: <CalculatorIcon />,
    title: 'Kalkulyator',
    navigateTo: 'Calculator',
  },
  {
    id: '4',
    icon: <PaymentIcon />,
    title: 'Ödəniş',
  },
];
