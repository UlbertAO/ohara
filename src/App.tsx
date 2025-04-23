import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./hooks/use-auth";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import { Route, Switch } from "wouter";
import { ProtectedRoute } from "./lib/protected-route";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import DashboardPage from "./pages/dashboard-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
