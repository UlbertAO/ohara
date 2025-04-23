// import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
//   firstName: text("first_name"),
//   lastName: text("last_name"),
//   email: text("email").notNull().unique(),
// });

// export const books = pgTable("books", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   author: text("author").notNull(),
//   category: text("category").notNull(),
//   coverUrl: text("cover_url"),
//   lastOpened: timestamp("last_opened"),
//   progress: integer("progress").default(0),
// });

// export const userBooks = pgTable("user_books", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").notNull().references(() => users.id),
//   bookId: integer("book_id").notNull().references(() => books.id),
//   progress: integer("progress").default(0),
//   lastOpened: timestamp("last_opened"),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
//   email: true,
//   firstName: true,
//   lastName: true,
// });

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

// export const insertBookSchema = createInsertSchema(books).omit({
//   id: true,
// });

// export const insertUserBookSchema = createInsertSchema(userBooks).omit({
//   id: true,
// });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
// export type User = typeof users.$inferSelect;
// export type Book = typeof books.$inferSelect;
// export type UserBook = typeof userBooks.$inferSelect;
// export type InsertBook = z.infer<typeof insertBookSchema>;
// export type InsertUserBook = z.infer<typeof insertUserBookSchema>;
