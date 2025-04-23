import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Features", href: "/#features" },
    { text: "Collections", href: "/#collections" },
    { text: "About", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center mr-4">
          <BookOpen className="h-6 w-6 text-primary mr-2" />
          <Link
            href="/"
            className="font-poppins font-bold text-xl text-primary"
          >
            Ohara
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ||
                    (link.href !== "/" && location.startsWith(link.href))
                      ? "text-primary border-b-2 border-primary py-1"
                      : "text-secondary"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end space-x-4 flex-1">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`hidden md:block text-sm font-medium text-primary hover:underline transition-colors ${
                  location === "/dashboard" ? "underline" : ""
                }`}
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 leading-none p-2">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth?tab=register">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Sign up
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium py-2 px-4 rounded-md ${
                        location === link.href ||
                        (link.href !== "/" && location.startsWith(link.href))
                          ? "bg-primary/10 text-primary"
                          : "text-secondary hover:bg-gray-100"
                      }`}
                    >
                      {link.text}
                    </Link>
                  ))}

                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base font-medium py-2 px-4 rounded-md ${
                          location === "/dashboard"
                            ? "bg-primary/10 text-primary"
                            : "text-secondary hover:bg-gray-100"
                        }`}
                      >
                        Dashboard
                      </Link>
                      <div className="mt-auto">
                        <div className="flex items-center border-t border-gray-200 pt-4 px-4">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-secondary">
                              {user.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {
                              handleLogout();
                              setMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-auto space-y-4 px-4 pb-6">
                      <Link
                        href="/auth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link
                        href="/auth?tab=register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-primary text-white">
                          Sign up
                        </Button>
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
