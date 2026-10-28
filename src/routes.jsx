import App from "./App.jsx";
import SignUp from "./components/sign_up.jsx";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];
