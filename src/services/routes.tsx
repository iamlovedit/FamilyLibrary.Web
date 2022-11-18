import { Navigate } from "react-router-dom";
import Library from "../pages/Library";
import Register from "../pages/Register";
import Plugin from "../pages/Plugin";
import FamilyDetail from "../pages/FamilyDetail";
import Login from "../pages/Login";

const routers = [
  {
    path: '/',
    element: <Library />
  },
  {
    path: "/plugin",
    element: <Plugin />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/family/:id',
    element: <FamilyDetail />
  },
  {
    path: '/*',
    element: <Navigate to='/' />
  }
]

export default routers;