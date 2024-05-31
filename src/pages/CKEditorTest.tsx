import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload } from '@ckeditor/ckeditor5-image';
import { EasyImage,  } from '@ckeditor/ckeditor5-easy-image';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import JsonModal from "../components/JsonModeal";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

const CKEditorTest = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [editorValue, setEditorValue] = useState("");

    return (
        <div>
            <h2>Using CKEditor&nbsp;5 build in React</h2>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    // toolbar: [
                    //     'heading', '|',
                    //     'bold', 'italic', '|',
                    //     'link', 'bulletedList', 'numberedList', '|',
                    //     'insertTable', 'blockQuote', '|',
                    //     'imageUpload', 'undo', 'redo'
                    // ],
                    image: {
                        toolbar: [
                            'imageTextAlternative', '|',
                            'imageStyle:full', 'imageStyle:side'
                        ]
                    }
                }}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    const data = editor.getData();
                    setEditorValue(data);
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorValue(data);
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
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
        </div>
    );
};

// Custom upload adapter plugin
function MyCustomUploadAdapterPlugin(editor: any) {
    // 'FileRepository' 플러그인을 가져와서 업로드 어댑터를 생성하는 메서드를 설정합니다.
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        // 'MyUploadAdapter' 인스턴스를 반환합니다. 이 인스턴스는 파일을 업로드하는 책임을 집니다.
        return new MyUploadAdapter(loader);
    };
}

// Custom upload adapter
class MyUploadAdapter {
    loader: any;
    constructor(loader: any) {
        // 'loader'는 업로드할 파일에 대한 정보를 포함하고 있습니다.
        this.loader = loader;
    }

    // 파일 업로드를 처리하는 메서드입니다.
    upload() {
        return this.loader.file
            .then((file: any) => new Promise((resolve: any, reject: any) => {
                // 'FileReader'를 사용하여 파일을 읽습니다.
                const reader = new FileReader();
                reader.onload = () => {
                    // 파일을 성공적으로 읽으면 Base64 형식으로 인코딩된 데이터를 반환합니다.
                    resolve({
                        default: reader.result
                    });
                };
                reader.onerror = (error: any) => {
                    // 파일 읽기에 실패하면 에러를 반환합니다.
                    reject(error);
                };
                // 파일을 Base64 형식으로 읽습니다.
                reader.readAsDataURL(file);
            }));
    }

    // 파일 업로드를 중단하는 메서드입니다.
    abort() {
        // 여기서는 아무 작업도 수행하지 않습니다.
    }
}

export default CKEditorTest;
