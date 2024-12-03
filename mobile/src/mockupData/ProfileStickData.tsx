import {
  ConnectionIcon,
  DiversityPolicyIcon,
  PersonIcon,
  PrivacyPolicyIcon,
  UserAgreementIcon,
} from '../assets';

export default [
  {
    id: '1',
    title: 'Hesab',
    icon: <PersonIcon />,
    navigateTo: 'AccountSettings',
  },
  {
    id: '2',
    title: 'Əlaqə',
    icon: <ConnectionIcon />,
  },
  {
    id: '3',
    title: 'İstifadəçi razılaşması',
    icon: <UserAgreementIcon />,
  },
  {
    id: '4',
    title: 'Müxtəif siyasəti',
    icon: <DiversityPolicyIcon />,
  },
  {
    id: '5',
    title: 'Qaydalar',
    icon: <PrivacyPolicyIcon />,
  },
];
