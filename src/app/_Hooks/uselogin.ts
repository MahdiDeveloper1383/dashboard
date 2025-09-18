import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  token?: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post("http://localhost:3000/api/auth", data, { withCredentials: true });
      return response.data;
    }
  });
};
