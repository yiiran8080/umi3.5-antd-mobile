import request from "@/utils/request";

export async function fakeAccountLogin(params) {
  return request("/user/login", {
    method: "POST",
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
