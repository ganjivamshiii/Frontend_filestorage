import React from "react";
import { Upload as UploadIcon, X, File } from "lucide-react";

const UploadBox = ({
  files,
  onFileChange,
  onRemoveFile,
  onUpload,
  uploading,
  remainingCredits,
  isUploadDisabled,
}) => {
  return (
    <div className="ml-10">
    <div className="border-2 w-250 h-50 flex flex-col items-center justify-center text-center border-dashed border-gray-300 p-4 shadow-sm bg-gray-900">
      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <UploadIcon className="w-5 h-5" />
          <span>Select Files</span>
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <ul className="space-y-2 mb-4 w-full max-w-sm">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-500 px-3 py-2 rounded-lg border"
            >
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-200" />
                <span className="text-sm text-white">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Remaining Credits */}
      <p className="text-sm text-gray-300 mb-3">
        Remaining Credits:{" "}
        <span className="font-semibold text-white">{remainingCredits}</span>
      </p>

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={uploading || isUploadDisabled}
        className={`px-4 py-2 m-4 rounded-lg flex items-center gap-2 font-bold ${
          uploading || isUploadDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <UploadIcon className="w-5 h-5" />
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
    </div>
  );
};

export default UploadBox;
