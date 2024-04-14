import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AutoFill = () => {
  return useMutation({
    mutationFn: async (params) => {
      return await axios.post("http://localhost:8081/autofill", params);
    },
    onSuccess: () => {},
  });
};
