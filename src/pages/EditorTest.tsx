import React, { useCallback, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PrimaryButton from "../components/PrimaryButton";
import JsonModal from "../components/JsonModeal";
import debounce from "lodash.debounce";

const EditorTest = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [editorValue, setEditorValue] = useState("");

    const isComposing = useRef(false); // isRef?? 왜 쓰는거지?
    const compositionStarted = useRef(false);

    // Debounced function to handle editor changes
    // const debouncedHandleEditorChange = useCallback(
    //     debounce((content) => {
    //         setEditorValue(content);
    //     }, 300),
    //     [setEditorValue], // Added setEditorValue to the dependency array
    // );

    // Handler function that will be called on editor change
    const handleEditorChange = (content, editor) => {
        if (!isComposing.current) {
          setEditorValue(content);
        }
      };
    
    //   const handleCompositionStart = () => {
    //     if (!compositionStarted.current) {
    //       isComposing.current = true;
    //       compositionStarted.current = true;
    //     }
    //   };
    
    //   const handleCompositionEnd = (content, editor) => {
    //     isComposing.current = false;
    //     compositionStarted.current = false;
    //     setTimeout(() => {
    //       setEditorValue(content);
    //     }, 500); // IME 이벤트가 완료된 후 상태를 비동기로 업데이트
    //   };

    return (
        <>
            {/* youtube 테스트 링크 */}
            {/* https://www.youtube.com/watch?v=b9pkXpKUUKc */}
            <Editor
                apiKey="h6pdr2thksr5ots4fwosg8i29qqg8i9n2wqlaq7gw1bemag6"
                init={{
                    height: 500,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'mediaembed'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat image media | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    // setup: (editor) => {
                    //     editor.on("compositionstart", () =>
                    //         handleCompositionStart(),
                    //     );
                    //     editor.on("compositionend", () =>
                    //         handleCompositionEnd(editor.getContent(), editor),
                    //     );
                    //     editor.on("change", () =>
                    //         handleEditorChange(editor.getContent(), editor),
                    //     );
                    // },
                    // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue="Welcome to TinyMCE!"
                onEditorChange={handleEditorChange}
            />
            <PrimaryButton
                onClick={handleOpenModal}
                theme="dark"
                isDisabled={false}
            >
                저장
            </PrimaryButton>
            <JsonModal
                isShow={showModal}
                data={editorValue}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default EditorTest;
