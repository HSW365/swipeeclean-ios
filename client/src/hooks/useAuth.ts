import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  // isOwner is set by the server only after it verifies the owner PIN session token.
  const isOwner = (user as any)?.isOwner === true;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isOwner,
    isSubscribed: isOwner || (user as any)?.isSubscribed || (user as any)?.isFounder || false,
  };
}
