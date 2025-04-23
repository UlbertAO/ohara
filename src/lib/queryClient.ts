import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants/config";
import { getHeaders, getTokenFromCookie } from "./utils";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${res.statusText}: ${err.error}`);
  }
}

export async function apiRequest(
  method: string,
  path: string,
  data?: unknown | undefined
): Promise<Response> {
  const headers = getHeaders();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    console.log("queryKey:", queryKey);
    const headers = getHeaders();

    const res = await fetch(`${API_BASE_URL}${queryKey[0] as string}`, {
      credentials: "include",
      headers: headers,
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
