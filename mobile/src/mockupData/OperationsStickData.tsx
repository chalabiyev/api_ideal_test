import {
  CalculatorIcon,
  PaymentIcon,
  TransactionIcon,
  VideoRequestIcon,
} from "../assets";

export default [
  {
    id: "1",
    icon: <TransactionIcon />,
    title: "Köçürmə",
    navigateTo: "Calculator",
  },
  {
    id: "2",
    icon: <VideoRequestIcon />,
    title: "Müraciət",
    navigateTo: "VideoCall",
  },
  {
    id: "3",
    icon: <CalculatorIcon />,
    title: "Kalkulyator",
    navigateTo: "Calculator",
  },
  {
    id: "4",
    icon: <PaymentIcon />,
    title: "Ödəniş",
    navigateTo: "Calculator",
  },
];
