import Home from "../page/Home";
import User from "../page/User";
import Users from "../page/Users";
import Error404 from "../page/Error404";
import TalarIA from "../page/TalarIA";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/Error",
    page: Error404
  },
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/TalarIA",
    exact: true,
    page: TalarIA,
  },
  {
    path: "/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  }
];