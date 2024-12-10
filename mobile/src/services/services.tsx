// import http from './http';
// import {
//   DELETE_ACCOUNT,
//   FORGOT,
//   LOGIN,
//   MOVIE_LIST,
//   REFRESH_TOKEN,
//   REGISTER,
//   SEND_OTP,
//   THREATRE_LIST,
// } from './Endpoints';
// import {LoginType, RegisterType, ForgotType, OtpType} from '../type/Auth/login';

// export const loginService = async (data: LoginType) =>
//   await http({
//     method: 'post',
//     url: LOGIN,
//     data: data,
//   });

// export const send_opt_Service = async (data: OtpType, platform: any) =>
//   await http({
//     method: 'post',
//     url: SEND_OTP + '?platform=' + platform,
//     data: data,
//   });

// export const registerService = async (data: RegisterType) =>
//   await http({
//     method: 'post',
//     url: REGISTER,
//     data: data,
//   });

// export const forgotService = async (data: ForgotType, platform: any) =>
//   await http({
//     method: 'post',
//     url: FORGOT + '?platform=' + platform,
//     data: data,
//   });

// export const deleteAccountService = async (id: any) =>
//   await http({
//     method: 'DELETE',
//     url: DELETE_ACCOUNT + id,
//   });

// export const get_theatre_list = async () =>
//   await http({
//     method: 'GET',
//     url: THREATRE_LIST,
//     noAuth: true,
//     headers: {
//       'Accept-Language': 'az',
//     },
//   });
// export const movie_FilterService = async (data: any) =>
//   await http({
//     method: 'post',
//     url: MOVIE_LIST,
//     data: data,
//     noAuth: true,
//     headers: {
//       'Accept-Language': 'az',
//     },
//   });
// export const refreshTokenService = async (refreshToken: string) =>
//   await http({
//     method: 'post',
//     url: REFRESH_TOKEN,
//     data: {refreshToken},
//   });
