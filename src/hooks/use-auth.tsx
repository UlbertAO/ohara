import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { UserToken, CurrentUser } from "../shared/types";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useToast } from "./use-toast";
import { apiRequest, getQueryFn, queryClient } from "../lib/queryClient";
import { jwtDecode } from "jwt-decode";
import { InsertUser, LoginUser } from "../shared/schema";
import { API_ROUTE } from "../constants/config";

type AuthContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<UserToken, Error, LoginUser>;
  logoutMutation: UseMutationResult<null, Error, void>;
  registerMutation: UseMutationResult<CurrentUser, Error, InsertUser>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  let autoLogoutTimer: NodeJS.Timeout | null = null;

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<CurrentUser | null, Error, CurrentUser | null>({
    queryKey: [API_ROUTE.CURRENT_USER],
    queryFn: getQueryFn({ on401: "returnNull" }),
    // staleTime: Infinity,
    staleTime: 0,
    initialData: null,
  });
  useEffect(() => {
    if (!user || !user.users) {
      logoutMutation.mutate();
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      });
    }
  }, [user]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginUser) => {
      const res = await apiRequest("POST", API_ROUTE.LOGIN, credentials);
      const data = await res.json();
      return data;
    },
    onSuccess: (data: UserToken) => {
      // Store token in cookie to be used by api.ts
      document.cookie = `jwt=${data.token}; path=/; max-age=86400`;

      queryClient.invalidateQueries({ queryKey: [API_ROUTE.CURRENT_USER] });
      // refetch();
      // queryClient.setQueryData(["/api/user"], data.user);

      // Decode the token to get the expiration time
      const decodedToken: { exp: number } = jwtDecode(data.token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeUntilExpiry = decodedToken.exp
        ? (decodedToken.exp - currentTime) * 1000
        : 24 * 60 * 60 * 1000; // Time in milliseconds

      // Set auto-logout timer
      if (autoLogoutTimer) {
        clearTimeout(autoLogoutTimer);
      }
      autoLogoutTimer = setTimeout(() => {
        logoutMutation.mutate();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
      }, timeUntilExpiry);

      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      const res = await apiRequest("POST", API_ROUTE.REGISTER, userData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Please login with your credentials",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // await apiRequest("POST", "/api/logout"); // call to invalidate token from server side
      return null;
    },
    onSuccess: () => {
      // Clear the JWT token from cookies
      document.cookie = "jwt=; path=/; max-age=0";

      // Set user to null in the React Query cache
      queryClient.setQueryData([API_ROUTE.CURRENT_USER], null);

      // Invalidate the query to ensure components react to the change
      // queryClient.invalidateQueries(["/api/user"], { exact: true });
      // refetch();

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
