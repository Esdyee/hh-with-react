import React, { useState, useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // 스타일을 추가합니다.

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

const ReactQuillTest: React.FC = () => {
    const [editorHtml, setEditorHtml] = useState<string>("");
    const quillRef = useRef<ReactQuill | null>(null);

    const handleChange = (html: string) => {
        console.log(html);
        setEditorHtml(html);
    };

    const handleSubmit = () => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
            setEditorHtml(editor.root.innerHTML);
        }
    };

    const modules = useMemo(() => ({
        // #3 Add "image" to the toolbar
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],

        // # 4 Add module and upload function
        imageUploader: {
            upload: (file: File) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);
                    fetch(
                        "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
                        {
                            method: "POST",
                            body: formData,
                        },
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            resolve(result.data.url);
                        })
                        .catch((error) => {
                            reject("Upload failed");
                            console.error("Error:", error);
                        });
                });
                },
            },
        }),
        [],
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "imageBlot", // #5 Optinal if using custom formats
    ];

    return (
        <>
            {<div dangerouslySetInnerHTML={{ __html: editorHtml }} />}

            <ReactQuill
                value={editorHtml}
                onChange={handleChange}
                theme="snow"
                style={{
                    minHeight: "25vh",
                }}
                modules={modules}
                formats={formats}
            />
        </>
    );
};

export default ReactQuillTest;
