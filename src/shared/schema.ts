import { z } from "zod";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  lastOpened: string;
  progress: number;
};

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "assword is required"),
  email: z.string().min(1, "Email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
