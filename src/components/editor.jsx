import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../contexts/theme_context";

export default function Edditor({
  formData,
  setFormData,
  placeholder,
  height,
}) {
  const editorRef = useRef(null);
  const { theme } = useTheme();

  return (
    <Editor
      key={theme}
      licenseKey="gpl"
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={formData.content ?? formData}
      onChange={() => {
        formData.content !== undefined
          ? setFormData({
              ...formData,
              content: editorRef.current.getContent(),
            })
          : setFormData(editorRef.current.getContent());
      }}
      init={{
        placeholder,
        height,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        content_css: `${theme === "light" ? "default" : "dark"}`,
        skin: `${theme === "light" ? "oxide" : "oxide-dark"}`,
      }}
    />
  );
}
