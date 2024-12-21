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
  partners: {
    root: `/partynorlar`,
    yenipartnyor: {
      root: `/partynorlar/yeni-partnyor`,
      fiziki: `/partynorlar/yeni-partnyor/fiziki`,
      huquqi: `/partynorlar/yeni-partnyor/huquqi`,
    },
    partnyorlarlist: `/partynorlar/list`,
    duzeliset: (id: string) => `/partynorlar/duzeliset/${id}`,
  },
};
