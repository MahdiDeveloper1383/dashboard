import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../interfaces/IUser";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/users");
      return JSON.parse(JSON.stringify(response.data));
    },
  });
}
