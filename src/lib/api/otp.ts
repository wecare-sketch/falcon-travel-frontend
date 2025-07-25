import axios from "@/lib/axios";

export const requestOtp = async (email: string) => {
  const res = await axios.get("/otp/request", {
    params: { email }, 
  });
  return res.data;
};
