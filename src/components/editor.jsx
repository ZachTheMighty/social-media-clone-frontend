import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Edditor({ formData, setFormData }) {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey="j7ci5llrcl5p5j0kl0u0muegyom0ms7izxibbb6red174mb3"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue="<p>Type post body...</p>"
      onChange={() =>
        setFormData({ ...formData, content: editorRef.current.getContent() })
      }
      init={{
        height: 500,
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
        content_css: "dark",
        skin: "oxide-dark",
      }}
    />
  );
}
