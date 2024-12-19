import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

import { USER_ROLE } from 'src/auth/context/jwt';
import { info } from 'console';

export const user_role = localStorage.getItem(USER_ROLE);

console.log(user_role);
// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  pencil: icon('ic-pencil'),
  sms: icon('ic-sms'),
  rollar: icon('ic-rollar'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  news: icon('ic-news'),
  tour: icon('ic-tour'),
  camera: icon('ic-camera'),
  video: icon('ic-video'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  abouticon: icon('ic-about-icon'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Management
   */
  {
    items: [
      {
        title: 'Əsas səhifə',
        path: paths.esassehife.root,
        icon: ICONS.analytics,
        children: [{ title: 'Statistika', path: paths.esassehife.statistika }],
      },
    ],
  },

  {
    items: [
      {
        title: 'Video Müraciət',
        path: paths.videomuraciet.root,
        icon: ICONS.video,
        children: [
          { title: 'Nağd pul krediti', path: paths.videomuraciet.nagdpulkrediti },
          { title: 'Partnyorluq krediti', path: paths.videomuraciet.partnyorlukkrediti },
          { title: 'Biznes krediti', path: paths.videomuraciet.bizneskrediti },
          { title: 'Məlumat', path: paths.videomuraciet.məlumat },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Fiziki müraciət',
        path: paths.fizikimuraciet.root,
        icon: ICONS.user,
        children: [
          { title: 'Nağd pul krediti', path: paths.fizikimuraciet.nagdpulkrediti },
          { title: 'Partnyorluq krediti', path: paths.fizikimuraciet.partnyorlukkrediti },
          { title: 'Lombard krediti', path: paths.fizikimuraciet.lombardkrediti },
          { title: 'Avtolizinq', path: paths.fizikimuraciet.avtolizinqkrediti },
          { title: 'İpoteka krediti', path: paths.fizikimuraciet.ipotekakrediti },
          { title: 'Biznes krediti', path: paths.fizikimuraciet.bizneskrediti },
          { title: 'Avtokredit', path: paths.fizikimuraciet.avtokredit },
          { title: 'Məlumat', path: paths.fizikimuraciet.məlumat },
        ],
      },
    ],
  },

  {
    items: [
      {
        title: 'Video Zəng',
        path: paths.videocall.root,
        icon: ICONS.kanban,
        children: [
          { title: 'Video zəng ekranı', path: paths.videocall.videocall, openInNewTab: true },
        ],
      },
    ],
  },
];
