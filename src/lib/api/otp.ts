import axios from "@/lib/axios";

export const requestOtp = async (email: string) => {
  const res = await axios.post("/otp/request", { email }); 
  return res.data;
};


export const verifyOtp = async (otp: string) => {
  const email = localStorage.getItem("emailForOtp");
  if (!email) throw new Error("Email not found for OTP verification");

  const res = await axios.post("/otp/verify", { email, otp });
  return res.data;
};
