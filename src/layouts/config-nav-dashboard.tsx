import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
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
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'Ana səhifə', path: paths.dashboard.root, icon: ICONS.dashboard },
      {
        title: 'Kreditlər',
        path: paths.dashboard.general.ecommerce,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Yarat', path: paths.dashboard.credits.root},
          { title: 'Cari', path: paths.dashboard.credits.list },
          { title: 'Planlaşdırılmış ödənişlər', path: paths.dashboard.general.ecommerce },
          { title: 'Silinmiş Kreditlər', path: paths.dashboard.general.ecommerce },
          { title: 'Arxiv', path: paths.dashboard.general.ecommerce },
          { title: 'Kredit idarə edəni dəyişmək', path: paths.dashboard.general.ecommerce },
          { title: 'KP', path: paths.dashboard.general.ecommerce },
          { title: 'ROP', path: paths.dashboard.general.ecommerce },
          { title: 'Kredit ödənişləri', path: paths.dashboard.general.ecommerce },
          { title: 'MKR-də olmayan', path: paths.dashboard.general.ecommerce },
        ],
      },
      {
        title: 'İstifadəçilər',
        path: paths.dashboard.general.analytics,
        icon: ICONS.analytics,

        children: [
          { title: 'Cədvəl', path: paths.dashboard.user.list },
          { title: 'Profil Yarat', path: paths.dashboard.user.new },
        ],
      },
      {
        title: 'Məhsullar',
        path: paths.dashboard.product.root,
        icon: ICONS.banking,
        children: [
          { title: 'Yarat', path: paths.dashboard.product.new },
          { title: 'Siyahı', path: paths.dashboard.product.root },
        ],
      },
      {
        title: 'Kanallar',
        path: paths.dashboard.channels.list,
        icon: ICONS.booking,
        children: [
          { title: 'Yarat', path: paths.dashboard.channels.new },
          { title: 'Siyahı', path: paths.dashboard.channels.list },
        ],
      },
      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'Siyahı', path: paths.dashboard.invoice.root },
          { title: 'Detallar', path: paths.dashboard.invoice.demo.details },
          { title: 'Yarat', path: paths.dashboard.invoice.new },
          { title: 'Redaktə et', path: paths.dashboard.invoice.demo.edit },
        ],
      },
      {
        title: 'Müştərilər',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Fiziki Şəxslər', path: paths.dashboard.customer.fiziki },
          { title: 'Fərdi Sahibkarlar', path: paths.dashboard.customer.ferdi },
          { title: 'Hüquqi Şəxslər', path: paths.dashboard.customer.huquqi },
          { title: 'Təminat', path: paths.dashboard.customer.teminat},
          { title: 'COV müştəri', path: paths.dashboard.customer.covmusteri },
        ],
      },
      { title: 'Fayllar', path: paths.dashboard.general.file, icon: ICONS.file },
      {
        title: 'Girov',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
      {
        title: 'Asan Finance',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Məlumatlar', path: paths.dashboard.tour.root },
          { title: 'Balans', path: paths.dashboard.tour.demo.details },
          { title: 'Fin sorğusu', path: paths.dashboard.tour.demo.details },
          { title: 'İş yeri məlumatlaı', path: paths.dashboard.tour.demo.details },
          { title: 'Pensiya haqqında məlumat', path: paths.dashboard.tour.demo.details },
          { title: 'Lokal bazada saxlanma', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'AKB',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Sorğu', path: paths.dashboard.tour.root },
          { title: 'Balans', path: paths.dashboard.tour.demo.details },
          { title: 'Lokal bazada saxlanma', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Müqavilələr',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Məhsullar', path: paths.dashboard.tour.root },
          { title: 'Məhsul obyektləri', path: paths.dashboard.tour.demo.details },
          { title: 'Müqavilə şablonlarının redaktəsi', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'COV',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Yeni Sifariş', path: paths.dashboard.tour.root },
          { title: 'Cari', path: paths.dashboard.tour.demo.details },
          { title: 'Komitə', path: paths.dashboard.tour.demo.details },
          { title: 'Təsdiqlənmiş', path: paths.dashboard.tour.demo.details },
          { title: 'Arxiv', path: paths.dashboard.tour.demo.details },
          { title: 'Siyahı', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Maliyə',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Hesablar', path: paths.dashboard.tour.root },
          { title: 'Balansarxası hesablar', path: paths.dashboard.tour.demo.details },
          { title: 'Balans Sənədləri', path: paths.dashboard.tour.demo.details },
          { title: 'Daxili Hesablar', path: paths.dashboard.tour.demo.details },
          { title: 'Ödənişlər', path: paths.dashboard.tour.demo.details },
          { title: 'Balansarxası', path: paths.dashboard.tour.demo.details },
          { title: 'Filiallararası müxabirləşmə', path: paths.dashboard.tour.demo.details },
          { title: 'Mənfiyə İcazə verilən Hesablar', path: paths.dashboard.tour.demo.details },
          { title: 'Mənfiyə icazə verilən balans', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Hesabatlar',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'İnteraktiv balans', path: paths.dashboard.tour.root },
          { title: 'MKR', path: paths.dashboard.tour.demo.details },
          { title: 'Tam Balans', path: paths.dashboard.tour.demo.details },
          { title: 'Gündəlik Balans', path: paths.dashboard.tour.demo.details },
          { title: 'Gəlir Xərc', path: paths.dashboard.tour.demo.details },
          { title: 'Qalıq Dövriyyə', path: paths.dashboard.tour.demo.details },
          { title: 'Asan Finans', path: paths.dashboard.tour.demo.details },
          { title: 'İcmal Balans', path: paths.dashboard.tour.demo.details },
          { title: 'Müxbir Hesabların Yoxlanılması', path: paths.dashboard.tour.demo.details },
          { title: 'İnteraktiv Balans (AP)', path: paths.dashboard.tour.demo.details },
          { title: 'İnteraktiv Balansarxası (AP)', path: paths.dashboard.tour.demo.details },
          { title: 'Prudensial Hesabat', path: paths.dashboard.tour.demo.details },
          { title: 'Müştəri Əlaqələri', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Sifarişlər',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Yeni sifariş', path: paths.dashboard.tour.root },
          { title: 'Məlumatlar', path: paths.dashboard.tour.demo.details },
          { title: 'Cari', path: paths.dashboard.tour.demo.details },
          { title: 'Komitə', path: paths.dashboard.tour.demo.details },
          { title: 'Təsdiqlənmiş', path: paths.dashboard.tour.demo.details },
          { title: 'Arxiv', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Tənzimləmələr',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'İstifadəçilər', path: paths.dashboard.tour.root },
          { title: 'Vəzifələr', path: paths.dashboard.tour.demo.details },
          { title: 'Filiallar', path: paths.dashboard.tour.demo.details },
          { title: 'Komitələr', path: paths.dashboard.tour.demo.details },
          { title: 'Günə keçid', path: paths.dashboard.tour.demo.details },
          { title: 'Təqvim', path: paths.dashboard.tour.demo.details },
          { title: 'Valyuta', path: paths.dashboard.tour.demo.details },
          { title: 'Region', path: paths.dashboard.tour.demo.details },
          { title: 'Kredit kuratoru', path: paths.dashboard.tour.demo.details },
          { title: 'Zərgərlər', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Loqlama',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Bütün əməliyyatlar', path: paths.dashboard.tour.root }, // something about logging
          { title: 'Səhifədə hər Klikləmə', path: paths.dashboard.tour.demo.details },
          { title: 'Loqaların qorunması', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Komplayens',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Sanksiya siyahısı üzrə yoxlanış', path: paths.dashboard.tour.root },
          { title: 'Siyahının əlavə edilməsi imkanı', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Əsas vəsaitlər',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'İnvertarlar', path: paths.dashboard.tour.root },
          { title: 'Amartizasiya', path: paths.dashboard.tour.demo.details },
          { title: 'Balansda əks olunma', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Əsas vəsaitlər',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'İnvertarlar', path: paths.dashboard.tour.root },
          { title: 'Amartizasiya', path: paths.dashboard.tour.demo.details },
          { title: 'Balansda əks olunma', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Gecikmə portfeli',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
      },
      {
        title: 'SMS xidməti',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
      },
      {
        title: 'Arayış yarat',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Bağlanış arayışı', path: paths.dashboard.tour.root },
          { title: 'Borcun olmaması haqqında arayış', path: paths.dashboard.tour.demo.details },
          { title: 'Qalıq borc haqqında arayış', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Zəmanət məktubu',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
      },
      {
        title: 'Çağrı mərkəzi',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
      },
      {
        title: 'Əmək haqqının hesablanması',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Davamiyyət qeydiyyatı', path: paths.dashboard.tour.root },
          {
            title: 'Avtomatik əmək haqqının hesablanması',
            path: paths.dashboard.tour.demo.details,
          },
          { title: 'Əmək haqqından avanslar', path: paths.dashboard.tour.demo.details },
          { title: 'Mükafatlar və cərimələr', path: paths.dashboard.tour.demo.details },
          { title: 'Həyat sığortası', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Kadr sənəd dövriyyəsi',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          {
            title: 'İşçilər barədə detalli məlumat bazasi və işçi kartları',
            path: paths.dashboard.tour.root,
          },
          {
            title: 'Müxtəlif təşkilati və idarəetmə strukturların dəstəklənməsi',
            path: paths.dashboard.tour.demo.details,
          },
          { title: 'Əmrlər və əməliyyatlar', path: paths.dashboard.tour.demo.details },
          {
            title: 'Məzuniyyət və ezamiyyət əmrləri və hesablamalar',
            path: paths.dashboard.tour.demo.details,
          },
          { title: 'HR sənədlərin elektron arxivi', path: paths.dashboard.tour.demo.details },
        ],
      },
      {
        title: 'Dəvamiyyət',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [{ title: 'Davamiyyət Modulu', path: paths.dashboard.tour.root }],
      },
    ],
  },
];
