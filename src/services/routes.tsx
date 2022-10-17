import { Navigate } from "react-router-dom";
import Library from "../pages/Library";
import Register from "../pages/Register";
import Plugin from "../pages/Plugin";

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
  }
  ,
  {
    path: '/*',
    element: <Navigate to='/' />
  }
]

export default routers;