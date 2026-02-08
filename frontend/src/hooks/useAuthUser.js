import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: Infinity,
  });

  return {
    authUser: query.data?.user || null,
    isLoading: query.isLoading,
  };
};

export default useAuthUser;
