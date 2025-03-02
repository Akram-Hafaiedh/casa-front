import { useState } from "react";
import { FaUpload } from "react-icons/fa6";

interface DropZoneProps {
    label: string;
    onChange: (files: File[]) => void;
    accept: string;
}

const DropZone: React.FC<DropZoneProps> = ({ label, onChange, accept }) => {
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFileNames(files.map(file => file.name));
        onChange(files);
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setFileNames(files.map(file => file.name));
        onChange(files);
    };

    return (
        <div className="file-upload min-h-20 flex flex-col w-full">
            <div
                className="file-input grow border border-primary border-dashed rounded-sm px-3 py-2 cursor-pointer text-gray-700 leading-tight focus:outline-hidden focus:shadow-outline bg-primary-light flex items-center justify-center"
                onClick={() => document.getElementById(label)?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
            >
                <FaUpload className="mr-2" /> {/* Icon */}
                {fileNames.length > 0 ? fileNames.join(', ') : <span>Click to select files or drag here</span>}
            </div>
            <input
                title={label}
                type="file"
                id={label}
                accept={accept}
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default DropZone;
