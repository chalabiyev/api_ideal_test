import http from "./http";
import { GET_STATUS, SEND_OTP, GET_TOKEN } from "./EndPoints";

export const sendOtp_Services = async (data: any) =>
  await http({
    method: "post",
    url: SEND_OTP,
    data: data,
  });
