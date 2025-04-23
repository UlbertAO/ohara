import { API_BASE_URL, API_ROUTE } from "../constants/config";
import { BooksResponse } from "../shared/types";
import { queryClient } from "./queryClient";

const API_MODE = import.meta.env.VITE_API_MODE || "live";

export const api = {
  async getBooks(
    page = 1,
    limit = 10,
    filter?: string
  ): Promise<BooksResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      "per-page": limit.toString(),
    });

    if (filter) {
      params.append("q", filter);
    }

    const response = await fetch(
      `${API_BASE_URL}${API_ROUTE.GET_BOOKS}?${params}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch books: ${response.status}`);
    }

    return await response.json();
  },

  async getUserBooks(page = 1, limit = 10): Promise<BooksResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      "per-page": limit.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ROUTE.GET_BOOKS}?${params}`,
      {
        credentials: "include",
      }
    );

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
