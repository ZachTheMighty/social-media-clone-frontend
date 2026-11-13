import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth_context";
import BirthDate from "./birth_date";
import Select from "./select";
import Input from "./input";
import LoadingSpinner from "./loading_spinner";
import Link from "./link";

export default function EditProfile() {
  const { loggedInUser, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    birthDate: {
      month: loggedInUser.birthDate.split(",")[0].split(" ")[0],
      day: loggedInUser.birthDate.split(",")[0].split(" ")[1],
      year: loggedInUser.birthDate.split(",")[1],
    },
    gender: loggedInUser.gender,
    photo: { path: loggedInUser.picture, file: "" },
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(1);

  useEffect(() => {
    fetch(loggedInUser.picture)
      .then((response) => response.blob())
      .then((file) =>
        setFormData({ ...formData, photo: { ...formData.photo, file } }),
      );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors(1);
    setLoading(true);

    const dataToSend = new FormData();

    dataToSend.append("firstName", formData.firstName);
    dataToSend.append("lastName", formData.lastName);
    dataToSend.append("month", formData.birthDate.month);
    dataToSend.append("day", formData.birthDate.day);
    dataToSend.append("year", formData.birthDate.year);
    dataToSend.append("gender", formData.gender);

    dataToSend.append("file", formData.photo.file);

    const response = await fetch("http://localhost:8080/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "put",
      body: dataToSend,
    });

    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setErrors(data.errors);
    setErrors(null);
    setUser(data);
  };

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <form
        onSubmit={(event) => handleSubmit(event)}
        encType="multipart/form-data"
      >
        {Object.entries(formData)
          .filter((pair) => pair[0] !== "photo")
          .map((input, index) => {
            if (input[0] === "birthDate")
              return (
                <BirthDate
                  key={index}
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                />
              );
            if (input[0] === "gender")
              return (
                <div key={index}>
                  <div className="flex">
                    <div>Gender</div>
                    {formData.gender === "" && (
                      <div className="text-red-500">*</div>
                    )}
                  </div>
                  <Select
                    key={index}
                    options={["male", "female"]}
                    initValue="gender"
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                  />
                </div>
              );
            return (
              <Input
                key={index}
                text={input[0]}
                type={input[0].includes("word") ? "password" : "text"}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            );
          })}
        <div className="mt-8">
          <div className="mt-4 flex justify-center">
            <label htmlFor="file">
              <img
                src={formData.photo.path}
                className="w-30 h-30 sm:w-50 sm:h-50 object-cover rounded-full select-none"
              />
            </label>
          </div>

          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              setFormData({
                ...formData,
                photo: {
                  path: URL.createObjectURL(event.target.files[0]),
                  file: event.target.files[0],
                },
              });
            }}
          />
        </div>
        <button className="flex justify-center items-center h-14 bg-[#4a5df9] text-white w-full py-3 hover:bg-[#4150f7] active:scale-x-98 rounded-xl mt-8 mb-2 font-bold transition-transform text-sm sm:text-lg">
          {loading ? <LoadingSpinner /> : "Confirm"}
        </button>
        {!errors && (
          <div>
            Successfully edited profile. Take a{" "}
            <Link to={`/profile/${loggedInUser.username}`}>look!</Link>
          </div>
        )}
      </form>
    </div>
  );
}
