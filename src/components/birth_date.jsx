import Select from "./select.jsx";
import birthDates from "../utils/birth_dates.js";
import getYear from "../utils/get_year.js";

export default function BirthDate({ formData, setFormData, errors }) {
  const daysOfMonth =
    birthDates.find((birthDate) => birthDate.month === formData.birthDate.month)
      ?.days ?? 31;
  return (
    <div>
      Day of Birth
      <div className="flex gap-2 mt-2">
        <Select
          options={birthDates.map((birthDate) => birthDate.month)}
          initValue="month"
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        <Select
          options={Array.from({
            length: daysOfMonth,
          })
            .map((_, index) => daysOfMonth - index)
            .toReversed()}
          initValue="day"
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        <Select
          options={Array.from({ length: 151 }).map(
            (_, index) => getYear - 5 - index,
          )}
          initValue="year"
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      </div>
    </div>
  );
}
