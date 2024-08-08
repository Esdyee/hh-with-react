import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FileGroup {
  id: string;
  files: File[];
}

const MultiUpload: React.FC = () => {
    const [fileGroups, setFileGroups] = useState<FileGroup[]>([
        { id: '그룹1', files: [] },
        { id: '그룹2', files: [] },
        { id: '그룹3', files: [] },
    ]);
    const [status, setStatus] = useState<string>("");

    const handleFileChange = (groupId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileGroups(prevGroups =>
                prevGroups.map(group =>
                    group.id === groupId ? { ...group, files: Array.from(e.target.files!) } : group
                )
            );
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("업로드 중...");

        const formData = new FormData();
        fileGroups.forEach(group => {
            group.files.forEach(file => {
                formData.append(`files_${group.id}`, file);
            });
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
            setStatus("업로드 성공: " + response.data.message);
        } catch (error) {
            setStatus("업로드 실패: " + (error as Error).message);
        }
    };

    return (
        <div>
            <h2>다중 파일 업로드</h2>
            <form onSubmit={handleSubmit}>
                {fileGroups.map(group => (
                    <div key={group.id}>
                        <h3>{group.id}</h3>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange(group.id)} 
                        />
                        <div>선택된 파일: {group.files.map(file => file.name).join(", ")}</div>
                    </div>
                ))}
                <button
                    className="bg-blue-500 text-white p-2 rounded mt-5"
                    type="submit"
                >
                    모두 업로드
                </button>
            </form>

            <div className="mt-5">
                <div>상태: {status}</div>
            </div>
        </div>
    );
};

export default MultiUpload;
