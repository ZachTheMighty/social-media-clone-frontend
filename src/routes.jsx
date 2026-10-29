import App from "./App.jsx";
import SignUp from "./components/sign_up.jsx";
import Login from "./components/log_in.jsx";
import GuestsRoute from "./components/guests_route.jsx";

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
    ],
  },
];
