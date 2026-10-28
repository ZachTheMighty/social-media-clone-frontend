import { Check } from "lucide-react";

export default function Option({
  initValue,
  option,
  formData,
  setFormData,
  isChecked,
  setIsChecked,
  setShowDropdown,
}) {
  return (
    <div
      onClick={() => {
        setIsChecked();
        formData[initValue] === ""
          ? setFormData({ ...formData, [initValue]: option })
          : setFormData({
              ...formData,
              birthDate: { ...formData.birthDate, [initValue]: option },
            });
        setShowDropdown(false);
      }}
      className={`${isChecked ? "bg-gray-200" : "hover:bg-gray-100"} flex justify-between items-center px-4 py-3 cursor-pointer`}
    >
      <div>
        {isFinite(option) ? option : option[0].toUpperCase() + option.slice(1)}
      </div>

      {isChecked && <Check size={20} />}
    </div>
  );
}
