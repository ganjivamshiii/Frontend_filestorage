import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiEndpoints } from '../util/apiEndpoints';

const PublicFileView = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareModal, setShareModal] = useState({ isOpen: false, link: "" });

  const { fileId } = useParams();

  // Fetch file metadata
  useEffect(() => {
    const fetchFile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(apiEndpoints.PUBLIC_VIEW(fileId));
        setFile(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 403
            ? "You don't have permission to access this file."
            : err.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (fileId) fetchFile();
  }, [fileId]);

  // Download public file (no JWT required)
  const handleDownload = async (file) => {
  try {
    const response = await axios.get(apiEndpoints.PUBLIC_VIEW(file.id), {
      responseType: 'blob', // important for files
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error:", err);
    toast.error(
      `Cannot download file: ${err.response?.status === 403 ? "File is not public" : err.message}`
    );
  }
};


  const openShareModal = (link) => setShareModal({ isOpen: true, link });
  const closeShareModal = () => setShareModal({ isOpen: false, link: "" });

  if (isLoading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Use Mee! - File Viewer</h1>

      {file && (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
          <p className="text-xl font-semibold mb-4">{file.name}</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleDownload(file)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Download
            </button>
            <button
              onClick={() => openShareModal(file.link)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Share
            </button>
          </div>
        </div>
      )}

      {shareModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-gray-700 rounded-lg p-6 max-w-sm w-full text-center">
            <p className="mb-4 break-all">Share Link: {shareModal.link}</p>
            <button
              onClick={closeShareModal}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicFileView;
