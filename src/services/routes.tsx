import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Plugin from "../pages/Plugin";

const routers = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/plugin",
    element: <Plugin />
  },
  {
    path: '/*',
    element: <Navigate to='/' />
  }
]

export default routers;