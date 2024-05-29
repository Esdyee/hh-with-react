import { useState } from "react";
import Modal from "./Modal";

interface JsonModalProps {
    isShow: boolean;
    data: string;
    onClose: () => void;
}

const JsonModal = ({ isShow, data, onClose }: JsonModalProps) => {
    // const handleCloseModal = () => setShowModal(false);

    return (
    <div className={`${isShow ? "block" : "hidden"}`}>
        {isShow && (
            <Modal onClose={onClose}>
                <h2>JSON 파일 내용</h2>
                <pre>{data}</pre>
            </Modal>
        )}
    </div>
    )
}

export default JsonModal;