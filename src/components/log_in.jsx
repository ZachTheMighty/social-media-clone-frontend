import { useState } from "react";
import Input from "./input.jsx";
import { Link } from "react-router";
import { useAuth } from "../contexts/auth_context.jsx";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  const { setIsAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) return setErrors(data.errors);
    localStorage.setItem("token", data.token);
    setIsAuth("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full sm:w-150 px-4 sm:px-16 py-8 rounded-md ">
        <div className="text-purple-900 dark:text-white font-bold text-3xl text-center my-8">
          Login
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          {typeof errors === "string" && (
            <div className="bg-[#bd0808] text-white p-4 pr-8 mb-4 text-center">
              {errors}
            </div>
          )}
          {Object.entries(formData).map((input, index) => (
            <Input
              key={index}
              text={input[0]}
              type={input[0].includes("word") ? "password" : "text"}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          ))}
          <button className="bg-purple-900 text-white w-full py-3 rounded-md font-bold text-lg hover:bg-purple-700 active:bg-purple-900 mb-4">
            Login
          </button>
          <div className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-teal-500 hover:text-teal-600 active:text-teal-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
