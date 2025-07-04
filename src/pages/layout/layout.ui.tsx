import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "~widgets/footer";
import { Header } from "~widgets/header";

export function GenericLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-tandaTestBg">
      <Header />
      <main className="flex-grow  max-w-[1200px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function IntroLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[1200px] mx-auto">
      <Outlet />
    </div>
  );
}

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export function ProtectedRoute({
  isAuthenticated,
  redirectPath = "/auth",
}: ProtectedRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
}
