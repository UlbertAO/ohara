import { useState, useEffect } from "react";
import { useLocation, useSearch, Link } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, BookOpen } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import {
  InsertUser,
  insertUserSchema,
  LoginUser,
  loginUserSchema,
} from "../shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") === "register" ? "register" : "login"
  );

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onLoginSubmit = (data: LoginUser) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // navigate("/");
      },
    });
  };

  const onRegisterSubmit = (data: InsertUser) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        // Reset the form to its initial state
        registerForm.reset();
        setActiveTab("login");
      },
    });
  };

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    const params = new URLSearchParams(search);
    if (value === "register") {
      params.set("tab", "register");
    } else {
      params.delete("tab");
    }

    const newSearch = params.toString();
    navigate(`/auth${newSearch ? `?${newSearch}` : ""}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Logo and Home link */}
      <div className="container flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center text-primary">
          <BookOpen className="h-6 w-6 mr-2" />
          <span className="font-poppins font-bold text-xl">Ohara</span>
        </Link>
      </div>

      <div className="flex-1 container flex flex-col lg:flex-row px-4 py-8">
        {/* Auth Forms Column */}
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary font-poppins">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login"
                  ? "Log in to access your library and continue reading."
                  : "Sign up to start your reading journey with Ohara."}
              </CardDescription>
            </CardHeader>

            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <CardContent className="pt-6">
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <Link
                          href="#"
                          className="text-sm text-secondary hover:text-primary"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary text-white"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Log In
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 bg-gray-50 flex justify-center">
                  <p className="text-sm text-secondary">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="font-medium text-primary hover:text-primary p-0"
                      onClick={() => handleTabChange("register")}
                    >
                      Sign up
                    </Button>
                  </p>
                </CardFooter>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <CardContent className="pt-6">
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Choose a username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Create a password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500 mt-1">
                              Password must be at least 8 characters.
                            </p>
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="#" className="text-secondary">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-secondary">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary text-white"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 bg-gray-50 flex justify-center">
                  <p className="text-sm text-secondary">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="font-medium text-primary hover:text-primary p-0"
                      onClick={() => handleTabChange("login")}
                    >
                      Log in
                    </Button>
                  </p>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Hero Column */}
        <div className="w-full lg:w-1/2 lg:pl-8 flex items-center">
          <div className="bg-primary text-white rounded-lg p-8 w-full">
            <div className="text-center mb-8">
              <BookOpen className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold font-poppins mb-4">
                Your Digital Library
              </h2>
              <p className="text-lg max-w-md mx-auto">
                Access thousands of books from anywhere in the world, organize
                your personal collection, and track your reading progress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white/10 p-3 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">10M+ Books</h3>
                <p className="text-sm">
                  Access our extensive collection of books across all genres
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white/10 p-3 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Sync Across Devices</h3>
                <p className="text-sm">
                  Continue reading on any device with seamless synchronization
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white/10 p-3 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Reading Analytics</h3>
                <p className="text-sm">
                  Track your reading habits and progress over time
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-white/10 p-3 mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Personalized Lists</h3>
                <p className="text-sm">
                  Create custom reading lists and set reading goals
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="italic text-sm text-white/80 max-w-md mx-auto">
                "Reading is essential for those who seek to rise above the
                ordinary." — Jim Rohn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
