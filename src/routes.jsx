import App from "./App.jsx";
import SignUp from "./components/sign_up.jsx";
import Login from "./components/log_in.jsx";
import GuestsRoute from "./components/guests_route.jsx";
import Dashboard from "./components/dashboard.jsx";
import ProtectedRoute from "./components/protected_route.jsx";
import NotFound from "./components/not_found.jsx";
import PostForm from "./components/post_form.jsx";
import Search from "./components/search.jsx";
import Profile from "./components/profile.jsx";
import Requests from "./components/requests.jsx";
import EditProfile from "./components/edit_profile.jsx";

export default [
  {
    element: <App />,
    children: [
      {
        element: <GuestsRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "posts/new",
            element: <PostForm />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "profile",
            children: [
              {
                path: "edit",
                element: <EditProfile />,
              },
              {
                path: ":username",
                element: <Profile />,
              },
            ],
          },
          {
            path: "requests",
            element: <Requests />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
