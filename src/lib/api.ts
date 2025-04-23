import { BooksResponse } from "../shared/types";
import { queryClient } from "./queryClient";
import { getTokenFromCookie } from "./utils";

const API_MODE = import.meta.env.VITE_API_MODE || "live";

// Base API service with mode switching
export const api = {
  mode: API_MODE as "mock" | "live",

  setMode(mode: "mock" | "live") {
    this.mode = mode;
    // Clear cache when switching modes
    queryClient.clear();
  },

  async getBooks(
    page = 1,
    limit = 10,
    filter?: string
  ): Promise<BooksResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filter) {
      params.append("filter", filter);
    }

    const response = await fetch(`/api/books?${params}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch books: ${response.status}`);
    }

    return await response.json();
  },

  async getUserBooks(page = 1, limit = 10): Promise<BooksResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`/api/user/books?${params}`, {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Please log in to view your books");
      }
      const errorText = await response.text();
      throw new Error(
        errorText || `Failed to fetch user books: ${response.status}`
      );
    }

    return await response.json();
  },
};
