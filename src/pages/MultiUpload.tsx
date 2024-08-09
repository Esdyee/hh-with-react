import React, { useState } from "react";
import axios from "axios";

const MultiUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadStatus, setUploadStatus] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setUploadStatus("파일을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post(
                "http://localhost:3030/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            setUploadStatus("파일 업로드 성공!");
            console.log(response.data);
        } catch (error) {
            setUploadStatus("파일 업로드 실패.");
            console.error("업로드 오류:", error);
        }
    };

    const handleMultiUpload = async () => {
        const inputs = document.querySelectorAll('input[type="file"]');
        const formData = new FormData();
        let fileCount = 0;

        inputs.forEach((input: Element) => {
            if (input instanceof HTMLInputElement && input.files) {
                for (let i = 0; i < input.files.length; i++) {
                    formData.append("files", input.files[i]);
                    fileCount++;
                }
            }
        });

        if (fileCount === 0) {
            setUploadStatus("파일을 선택해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3030/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            setUploadStatus(`${fileCount}개의 파일 업로드 성공!`);
            console.log(response.data);
        } catch (error) {
            setUploadStatus("파일 업로드 실패.");
            console.error("업로드 오류:", error);
        }
    };

    return (
        <div>
            <h2>다중 파일 업로드</h2>
            <input type="file" />
            <input type="file" />
            <input type="file" />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleUpload}
            >
                업로드
            </button>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMultiUpload}
            >
                멀티 업로드
            </button>
            <p>{uploadStatus}</p>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MultiUpload;
