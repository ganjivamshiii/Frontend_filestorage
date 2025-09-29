import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout";

// 1. Import Share2 icon
import {FileText,Users,Trash2,Download,LayoutGrid,List,Image,FileArchive,  File as FileIcon,
 Share2,
  FastForward, // Added icon
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import FileCard from "../components/FileCard";
import { apiEndpoints } from "../util/apiEndpoints";
import Confirmation from "../components/Confirmation";

const Myfiles = () => {
  const [files, setFiles] = useState([]);
  const [view, setView] = useState("grid");
  const { getToken } = useAuth();
 const [deleteConfirmation, setDeleteConfirmation] = useState({
  isOpen: false,
  fileId: null,
});


  const fetchFiles = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        // "http://localhost:8080/api/v1.0/files/my",
        apiEndpoints.FETCH_FILES,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error fetching the files from server");
    }
  };
  const openDeleteConfirmation = (fileId) => {
  setDeleteConfirmation({ isOpen: true, fileId });
};

  // delete a file after confirmation
   const closeDeleteConfirmation=()=>{
    setDeleteConfirmation({
      isOpen:false,
      fileId:null
    })
  }
  
    const handleDelete = async () => {
  const fileId = deleteConfirmation.fileId;
  if (!fileId) return;
  try {
    const token = await getToken();


    const response = await axios.delete(apiEndpoints.DELETE_FILE(fileId),
   
      {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Correct
      }
    );

    if (response.status === 204) {

      setFiles(files.filter((file) => file.id !== fileId)); // ✅ Correct

      closeDeleteConfirmation();
    }
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


  useEffect(() => {
    fetchFiles();
  }, [getToken]);

 

  // 2. FIXED: Toggle public/private status of a file
  const togglePublic = async (fileToUpdate) => {
    // Optimistic UI update for a snappy user experience
    const optimisticFiles = files.map((file) =>
      file.id === fileToUpdate.id ? { ...file, public: !file.public } : file
    );
    setFiles(optimisticFiles);
    toast.loading("Updating status...");

    try {
      const token = await getToken();
      await axios.patch(
        // Corrected typo: locahost -> localhost
        // `http://localhost:8080/api/v1.0/files/${fileToUpdate.id}/toggle-public`,
        apiEndpoints.TOGGLE_FILE(fileToUpdate.id),
        {},
        {
          // Corrected typo: Autherization -> Authorization
          headers: { Authorization: `Bearer ${token}` },
          responseType:'blob',
        } 
      );
      toast.dismiss();
      toast.success(
        `File is now ${!fileToUpdate.public ? "public" : "private"}.`
      );
    } catch (error) {
      toast.dismiss();
      // Revert UI change on API error
      setFiles(files);
      console.error("Error toggling file status:", error);
      toast.error("Failed to update file status.");
    }
  };

  const handleDownload = async (file) => {
  try {
    const token = await getToken();
    const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id), {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // important
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // clean up

  } catch (error) {
    toast.dismiss();
    console.error("Download error:", error);
    toast.error(`Error downloading file: ${error.message}`);
  }
};


  // 3. NEW: Function to copy the public link to the clipboard
  const copyToClipboard = (fileId) => {
    const link = `${window.location.origin}/file/public/${fileId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Public link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        toast.error("Could not copy link.");
      });
  };

  // Grouping logic (no changes)
  const groupedFiles = useMemo(() => {
    const groups = {
      Images: [],
      PDFs: [],
      Archives: [],
      Others: [],
    };

    files.forEach((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension)) {
        groups.Images.push(file);
      } else if (extension === "pdf") {
        groups.PDFs.push(file);
      } else if (["zip", "rar", "7z", "tar"].includes(extension)) {
        groups.Archives.push(file);
      } else {
        groups.Others.push(file);
      }
    });
    return Object.fromEntries(
      Object.entries(groups).filter(([_, filesInGroup]) => filesInGroup.length > 0)
    );
  }, [files]);
  
  const groupIcons = {
    Images: <Image className="w-6 h-6 text-pink-400" />,
    PDFs: <FileText className="w-6 h-6 text-red-400" />,
    Archives: <FileArchive className="w-6 h-6 text-orange-400" />,
    Others: <FileIcon className="w-6 h-6 text-yellow-400" />,
  };


  return (
    <DashboardLayout activemenu="my-files">
      <div className="p-6 bg-black min-h-screen text-white">
        {/* Header Section (No changes) */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">My Files</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded ${
                view === "grid" ? "bg-blue-600" : "bg-gray-800"
              } hover:bg-gray-700`}
            >
              <LayoutGrid className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`p-2 rounded ${
                view === "table" ? "bg-blue-600" : "bg-gray-800"
              } hover:bg-gray-700`}
            >
              <List className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 p-6 rounded shadow">
             <FileIcon className="w-24 h-24 text-gray-600 mb-4" />
             <h3 className="text-xl font-semibold text-gray-400">No files found</h3>
             <p className="text-gray-500">Upload a file to get started.</p>
          </div>
        ) : view === "grid" ? (
          <div className="space-y-10">
            {Object.entries(groupedFiles).map(([groupName, filesInGroup]) => (
              <div key={groupName}>
                <h3 className="text-2xl font-semibold flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
                  {groupIcons[groupName]}
                  {groupName} ({filesInGroup.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filesInGroup.map((file) => (
                    <FileCard
                     key={file.id} 
                     file={file}
                     onDelete={openDeleteConfirmation}
                     onTogglePublic={togglePublic}
                     onDownload={handleDownload}
                     />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // TABLE VIEW
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Uploaded</th>
                  <th className="px-4 py-2 text-left">Sharing</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr
                    key={file.id}
                    className="border-t border-gray-700 hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400" />
                      {file.name}
                    </td>
                    <td className="px-4 py-3">
                      {(file.size / 1024).toFixed(2)} KB
                    </td>
                    <td className="px-4 py-3">
                      {new Date(file.uploadedAt).toLocaleString()}
                    </td>
                    {/* 4. UPDATED: Sharing column now uses buttons for both states */}
                    <td className="px-4 py-3">
                      {file.public ? (
                        <button
                          onClick={() => togglePublic(file)}
                          className="flex items-center gap-1 text-green-400 hover:underline"
                        >
                          <Users className="w-5 h-5" />
                          <span>Public</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => togglePublic(file)}
                          className="flex items-center gap-1 text-gray-400 hover:underline"
                        >
                          <Users className="w-5 h-5" />
                          <span>Private</span>
                        </button>
                      )}
                    </td>
                    {/* 5. UPDATED: Actions column now includes a Share button */}
                    <td className="px-4 py-3 flex gap-2">
                      {file.public && (
                        <button
                          onClick={() => copyToClipboard(file.id)}
                          className="p-1 bg-green-600 rounded hover:bg-green-700"
                          title="Copy public link"
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                      )}
                      <button className="p-1 bg-blue-600 rounded hover:bg-blue-700"
                      onClick={()=> {handleDownload(file)}
                      } 
                      title="Download file">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button 
                      className="p-1 bg-red-600 rounded hover:bg-red-700"
                      onClick={()=>{ openDeleteConfirmation(file.id)}}
                       title="Delete file">
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* {} */}
        <Confirmation
         isOpen={deleteConfirmation.isOpen}
         onClose={closeDeleteConfirmation}
         title="Delete file"
         message="Are you sure want to Delete this file ? This action cannot be undone"
         confirmText="Delete"
         cancelText="Cancel "
           onConfirm={handleDelete}   // 👈 runs only if user clicks "Delete
         ConfirmationButtonClass="bg-red-600 hover:bg-red-700"
        />
        
      </div>
    </DashboardLayout>
  );
};

export default Myfiles;