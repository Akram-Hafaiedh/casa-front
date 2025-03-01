import { useState } from "react";
import { FaUpload } from "react-icons/fa6";

interface FileUploadProps {
    label: string;
    onChange: (file: File | null) => void;
    accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, accept }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        setFileName(file ? file.name : null);
        onChange(file);
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFileName(file ? file.name : null);
        onChange(file);
    };

    return (
        <div className="file-upload min-h-24 flex flex-col">
            <div
                className="file-input grow border-primary-active border border-dashed rounded-sm px-3 py-2 cursor-pointer text-gray-700 leading-tight focus:outline-hidden focus:shadow-outline bg-primary-light flex items-center justify-center"
                onClick={() => document.getElementById(label)?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
            >
                <FaUpload className="mr-2" /> {/* Icon */}
                {fileName || <span>Click to select a file or drag here</span>}
            </div>
            <input
                title={label}
                type="file"
                id={label}
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUpload;

