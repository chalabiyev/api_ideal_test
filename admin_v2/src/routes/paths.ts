// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  esassehife: {
    root: `/esassehife`,
    statistika: `/esassehife/statistika`,
  },
  videomuraciet: {
    root: `/videomuraciet`,
    nagdpulkrediti: `/videomuraciet/nagd-pul-krediti`,
    partnyorlukkrediti: `/videomuraciet/partnyorluq-krediti`,
    bizneskrediti: `/videomuraciet/biznes-krediti`,
    məlumat: `/videomuraciet/melumat`,
  },
  fizikimuraciet: {
    root: `/fizikimuraciet`,
    nagdpulkrediti: `/fizikimuraciet/nagd-pul-krediti`,
    partnyorlukkrediti: `/fizikimuraciet/partnyorluq-krediti`,
    lombardkrediti: `/fizikimuraciet/lombard-krediti`,
    avtolizinqkrediti: `/fizikimuraciet/avtolizinq-krediti`,
    ipotekakrediti: `/fizikimuraciet/ipoteka-krediti`,
    bizneskrediti: `/fizikimuraciet/biznes-krediti`,
    avtokredit: `/fizikimuraciet/avto-kredit`,
    məlumat: `/fizikimuraciet/melumat`,
  },

  videocall: {
    root: `/videocall`,
    videocall: `/videocall/videocall`,
  },
  muracietler: {
    root: `/muracietler`,
    videocall: `/muracietler/muraciet`,
  },
  partners: {
    root: `/partynorlar`,
    yenipartnyor: {
      root: `/partynorlar/yeni-partnyor`,
      fiziki: `/partynorlar/yeni-partnyor/create`,
    },
    partnyorlarlist: `/partynorlar/list`,
    duzeliset: (id: string) => `/partynorlar/duzeliset/${id}`,
  },
  clients: {
    root: `/musteriler`,
  },

  //  -------------------------------------   Veb saytın İDARƏ PANELİ   -------------------------------------

  webesassehife: {
    root: `/webesassehife`,
    slayder: `/webesassehife/slayder`,
    slayderduzeliset: (id: string) => `/webesassehife/slayderduzeliset/${id}`,
    slayderelaveet: `/webesassehife/slayderelaveet`,
    haqqimizda: `/webesassehife/haqqimizda`,
  },
  webkredit: {
    root: `/webkredit`,
    kreditler: `/webkredit/kreditler`,
    kreditelaveet: `/webkredit/kreditelaveet`,
    kreditduzeliset: (id: string) => `/webkredit/kreditduzeliset/${id}`,
  },
  websigorta: {
    root: `/websigorta`,
    sigortalar: `/websigorta/sigortalar`,
    sigortaelaveet: `/websigorta/sigortaelaveet`,
    sigortaduzeliset: (id: string) => `/websigorta/sigortaduzeliset/${id}`,
  },
  websirket: {
    root: `/websirket`,
    haqqimizda: `/websirket/haqqimizda`,
    haqqimizdaelaveet: `/websirket/haqqimizdaelaveet`,
    haqqimizdaduzeliset: (id: string) => `/websirket/haqqimizdaduzeliset/${id}`,
    kampaniyalar: `/websirket/kampaniyalar`,
    kampaniyaelaveet: `/websirket/kampaniyaelaveet`,
    kampaniyaduzeliset: (id: string) => `/websirket/kampaniyaduzeliset/${id}`,
  },
  webelaqe: {
    root: `/webelaqe`,
    elaqe: `/webelaqe/elaqe`,
  },
  webabune: {
    root: `/webabune`,
    abune: `/webabune/abune`,
  },
};
