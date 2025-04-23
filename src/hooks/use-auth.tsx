// import { createContext, ReactNode, useContext } from "react";
// import {
//   useQuery,
//   useMutation,
//   UseMutationResult,
// } from "@tanstack/react-query";
// import {
//   insertUserSchema,
//   loginUserSchema,
//   InsertUser,
//   LoginUser,
// } from "@shared/schema";
// import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
// import { useToast } from "@/hooks/use-toast";
// import { UserWithoutPassword } from "@shared/types";
// import { jwtDecode } from "jwt-decode";

import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { UserWithoutPassword } from "../shared/types";
import { createContext, ReactNode, useContext } from "react";
import { useToast } from "./use-toast";
import { apiRequest, getQueryFn, queryClient } from "../lib/queryClient";
import { jwtDecode } from "jwt-decode";
import { InsertUser, LoginUser } from "../shared/schema";

type AuthContextType = {
  user: UserWithoutPassword | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<UserWithoutPassword, Error, LoginUser>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<UserWithoutPassword, Error, InsertUser>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  let autoLogoutTimer: number | null = null;

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<UserWithoutPassword | null, Error, UserWithoutPassword | null>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    // staleTime: Infinity,
    staleTime: 0,
    initialData: null,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginUser) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      const data = await res.json();
      if (!data.user) {
        throw new Error("Login failed");
      }
      return { user: data.user, token: data.token };
    },
    onSuccess: (data: { user: UserWithoutPassword; token: string }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      refetch();
      // queryClient.setQueryData(["/api/user"], data.user);
      // Store token in cookie to be used by api.ts
      document.cookie = `jwt=${data.token}; path=/; max-age=86400`;
      // Decode the token to get the expiration time
      const decodedToken: { exp: number } = jwtDecode(data.token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000; // Time in milliseconds

      console.log(timeUntilExpiry, "time to auto log out");
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
        description: `Welcome back, ${data.user.username}!`,
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
      const res = await apiRequest("POST", "injee/api/users", userData);
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
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      // Clear the JWT token from cookies
      document.cookie = "jwt=; path=/; max-age=0";

      // Set user to null in the React Query cache
      queryClient.setQueryData(["/api/user"], null);

      // Invalidate the query to ensure components react to the change
      // queryClient.invalidateQueries(["/api/user"], { exact: true });
      refetch();

      // Debug the updated cache
      console.log(
        "Updated user in cache:",
        queryClient.getQueryData(["/api/user"])
      );

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
