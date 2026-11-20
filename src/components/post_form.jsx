import Editor from "./editor.jsx";
import Input from "./input.jsx";
import Link from "./link.jsx";

export default function PostForm({
  formData,
  setFormData,
  handleSubmit,
  errors,
  text,
}) {
  const cappedText = text[0].toUpperCase() + text.slice(1);
  return (
    <div className="pt-8 max-w-2xl mx-auto px-4 sm:px-0">
      <div className="text-center">{cappedText} post</div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex-1 flex flex-col"
      >
        <Input
          text="title"
          type="text"
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        <div className="mb-1">Body text</div>
        <Editor formData={formData} setFormData={setFormData} />
        <div
          className={`flex ${!errors ? "justify-between" : "justify-end"} items-center`}
        >
          {!errors && (
            <div className="text-green-500 font-bold">
              Successfully {text === "create" ? "created" : "edited"} post,{" "}
              <Link to="/">checkout it out!</Link>
            </div>
          )}
          <button className="bg-black rounded-full px-4 py-3 text-white font-bold mt-2 hover:opacity-90 dark:bg-white dark:text-black active:opacity-100">
            {cappedText}
          </button>
        </div>
      </form>
    </div>
  );
}
