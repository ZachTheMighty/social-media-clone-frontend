import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Options from "./options.jsx";

export default function Select({
  formData,
  setFormData,
  options,
  initValue,
  errors,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const propertyValue = formData[initValue] ?? formData.birthDate[initValue];

  return (
    <div className="mb-2 flex-1">
      <div className="relative">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setShowDropdown((prevShow) => !prevShow)}
            className="flex-1 mb-1 flex justify-between items-center outline outline-black/10 p-4 rounded-md hover:outline-teal-500 focus:outline-2 focus:outline-teal-500"
          >
            <div className={`${propertyValue === "" ? "text-gray-500" : ""}`}>
              {propertyValue === ""
                ? initValue
                : isFinite(propertyValue)
                  ? propertyValue
                  : propertyValue[0].toUpperCase() + propertyValue.slice(1)}
            </div>
            <ChevronDown size={20} />
          </div>
        </div>

        {showDropdown && (
          <div className="z-10 outline outline-gray-200 w-full rounded-md text-sm absolute bg-white max-h-150 overflow-scroll shadow-lg">
            <ul className="flex flex-col">
              {options.map((option, index) => (
                <li key={index}>
                  {
                    <Options
                      initValue={initValue}
                      option={option}
                      formData={formData}
                      setFormData={setFormData}
                      isChecked={checkedIndex === index}
                      setIsChecked={() => setCheckedIndex(index)}
                      setShowDropdown={setShowDropdown}
                    />
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {errors !== "s" && (
        <ul className="list-disc mt-3">
          {errors?.status === 422 &&
            errors.errors.map((error, index) => {
              if (error.path === initValue)
                return (
                  <li key={index} className="text-red-500 font-bold text-xs">
                    {error.msg}
                  </li>
                );
            })}
        </ul>
      )}
    </div>
  );
}
