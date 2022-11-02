import { Navigate } from "react-router-dom";
import Library from "../pages/Library";
import Register from "../pages/Register";
import Plugin from "../pages/Plugin";
import FamilyDetail from "../pages/FamilyDetail";

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
    path: '/family/:id',
    element: <FamilyDetail />
  },
  {
    path: '/*',
    element: <Navigate to='/' />
  }
]

export default routers;