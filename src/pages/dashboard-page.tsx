import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/use-auth";
import { api } from "../lib/api";
import Navbar from "../components/layout/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Loader2, Search } from "lucide-react";
import Footer from "../components/layout/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { formatDate, formatTimeLeft } from "../lib/utils";
import { Pagination } from "../components/ui/pagination";

export default function DashboardPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user books (currently reading)
  const { data: userBooksData, isLoading: isLoadingUserBooks } = useQuery({
    queryKey: ["/api/user/books", page],
    queryFn: async () => {
      return await api.getUserBooks(page, 3);
    },
  });

  // Fetch all books with pagination
  const { data: allBooksData, isLoading: isLoadingBooks } = useQuery({
    queryKey: ["/api/books", page, filter],
    queryFn: async () => {
      return await api.getBooks(page, 5, filter);
    },
  });

  const handleSearch = () => {
    setFilter(searchQuery);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setFilter(value === "all" ? "" : value);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-poppins mb-2">
            My Library Dashboard
          </h1>
          <p className="text-secondary">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! Here's
            your personalized library experience.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-sm text-gray-500 uppercase mb-1">
                Books in Collection
              </h3>
              <p className="text-2xl font-bold text-primary">
                {isLoadingUserBooks ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  userBooksData?.meta.totalItems || 0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-sm text-gray-500 uppercase mb-1">
                Currently Reading
              </h3>
              <p className="text-2xl font-bold text-primary">
                {isLoadingUserBooks ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  userBooksData?.data.filter(
                    (book) => book.progress > 0 && book.progress < 100
                  ).length || 0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-sm text-gray-500 uppercase mb-1">
                Read This Month
              </h3>
              <p className="text-2xl font-bold text-primary">
                {isLoadingUserBooks ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  userBooksData?.data.filter((book) => {
                    const lastMonth = new Date();
                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                    return (
                      book.lastOpened && new Date(book.lastOpened) > lastMonth
                    );
                  }).length || 0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-sm text-gray-500 uppercase mb-1">
                Reading Streak
              </h3>
              <p className="text-2xl font-bold text-primary">12 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Reading Progress */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-primary font-poppins">
                Continue Reading
              </CardTitle>
              <Button variant="link" className="text-primary">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingUserBooks ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : userBooksData?.data && userBooksData.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userBooksData.data.slice(0, 3).map((book) => (
                  <div
                    key={book.id}
                    className="flex bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={book.coverUrl}
                      alt={`${book.title} cover`}
                      className="w-24 h-36 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-bold text-primary mb-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {book.author}
                        </p>
                      </div>
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{book.progress}% complete</span>
                          <span>{formatTimeLeft(book.progress)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You have no books in your collection yet.</p>
                <Button variant="link" className="text-primary">
                  Browse the library
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Book Library Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <CardTitle className="text-xl font-bold text-primary font-poppins">
                My Book Library
              </CardTitle>

              <div className="flex items-center space-x-4 flex-wrap gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search books..."
                    className="pl-10 pr-4 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Books" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Self-Help">Self-Help</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Opened</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoadingBooks ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : allBooksData?.data && allBooksData.data.length > 0 ? (
                    allBooksData.data.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-4">
                              <img
                                className="h-10 w-10 rounded-sm object-cover"
                                src={book.coverUrl}
                                alt={`${book.title} cover`}
                              />
                            </div>
                            <div className="text-sm font-medium text-primary">
                              {book.title}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {book.author}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              book.category === "Fiction"
                                ? "bg-green-100 text-green-800"
                                : book.category === "Non-Fiction"
                                ? "bg-blue-100 text-blue-800"
                                : book.category === "Self-Help"
                                ? "bg-purple-100 text-purple-800"
                                : book.category === "Memoir"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {book.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(book.lastOpened)}
                        </TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          <Button
                            variant="link"
                            className="text-primary hover:text-accent mr-3 p-0 h-auto"
                          >
                            Read
                          </Button>
                          <Button
                            variant="link"
                            className="text-gray-500 hover:text-gray-700 p-0 h-auto"
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No books found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {allBooksData && allBooksData.meta.totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={allBooksData.meta.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
