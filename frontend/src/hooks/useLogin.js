import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      //THIS IS IMPORTANT---
      queryClient.setQueryData(["authUser"], data);
    },
  });
};

export default useLogin;