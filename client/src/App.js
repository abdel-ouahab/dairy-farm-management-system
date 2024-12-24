import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Navigate, Outlet } from "react-router-dom";
import Cows from "./pages/cows/page";
import Births from "./pages/births/page";
import Examination from "./pages/examination/page";
import Milk from "./pages/milk/page";
import RoutLayout from './layouts/RoutLayout';
import Home from './pages/home/page';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const PrivateRoutes = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/"  />;
};
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<PrivateRoutes />}>
    <Route path="/" element={< RoutLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/cows" element={<Cows />} />
      <Route path="/births" element={<Births />} />
      <Route path="/examinations" element={<Examination />} />
      <Route path="/milk" element={<Milk />} />
    </Route>
    </Route>
    </Route>
  )
)


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;