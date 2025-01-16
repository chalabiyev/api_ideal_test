import { CalculatorIcon, PaymentIcon, TransactionIcon } from "../assets";

export default [
  {
    id: "1",
    icon: <TransactionIcon />,
    title: "Köçürmə",
    navigateTo: "Calculator",
  },
  {
    id: "2",
    icon: <CalculatorIcon />,
    title: "Kalkulyator",
    navigateTo: "Calculator",
  },
  {
    id: "3",
    icon: <PaymentIcon />,
    title: "Ödəniş",
    navigateTo: "Calculator",
  },
];
