import React, { useContext, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { UserCreditsContext } from '../context/UserCreditsContext';
import { apiEndpoints } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import axios from 'axios';
import UploadBox from '../components/UploadBox';
import { useAuth } from '@clerk/clerk-react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { getToken } = useAuth();
  const { credits, setCredits } = useContext(UserCreditsContext);

  const MAX_FILES = 10;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > MAX_FILES) {
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
      setMessageType("error");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMessage("");
    setMessageType("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessageType("error");
      setMessage("Please select at least one file");
      return;
    }

    if (files.length > MAX_FILES) {
      setMessageType("info");
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      const token = await getToken();
      const response = await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.remainingCredits !== undefined) {
        setCredits(response.data.remainingCredits);
      }

      setMessage("Files uploaded successfully!");
      setMessageType("success");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      setMessage(error.response?.data?.message || "Error uploading. Please try again.");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  const isUploadDisabled = files.length > MAX_FILES || credits <= 0 || files.length > credits;

  return (
    <DashboardLayout activemenu="Upload">
      <div className="p-6">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : messageType === "success"
                ? "bg-green-50 text-green-700"
                : ""
            }`}
          >
            {message}
          </div>
        )}

        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          uploading={uploading}
          onRemoveFile={handleRemoveFile}
          remainingCredits={credits}
          isUploadDisabled={isUploadDisabled}
          onUpload={handleUpload}
        />
      </div>
    </DashboardLayout>
  );
};

export default Upload;
