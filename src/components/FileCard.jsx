import { FileText, Users, Trash2, Download } from "lucide-react";

const FileCard = ({ file, onDelete, onTogglePublic, onDownload,onShareLink }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between hover:bg-gray-700 transition-colors duration-200 h-full">
      <div>
        {/* File Name and Icon */}
        <div className="flex items-center gap-3 mb-3">
          <FileText className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <span className="font-semibold text-white truncate" title={file.name}>
            {file.name}
          </span>
        </div>

        {/* File Details (Size and Date) */}
        <div className="space-y-2 text-sm text-gray-400 mb-4">
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>Uploaded:</strong>{" "}
            {new Date(file.uploadedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Sharing Status and Actions */}
      <div>
        <hr className="border-gray-600 mb-3" />
        <div className="flex justify-between items-center">
          {/* Sharing status */}
          {file.public === true || file.public === "true" ? (
            <a  onClick={()=>{onTogglePublic(file.id)}}
            
              href={`/file/${file.id}`}
              className="flex items-center gap-1.5 text-green-400 hover:underline text-sm"
            >
              <Users className="w-4 h-4" />
              <span>Public</span>
            </a>
          ) : (
            <a
             onClick={()=>{onTogglePublic(file.id)}}
              href={`/file/${file.id}`}
              className="flex items-center gap-1.5 text-gray-400 hover:underline text-sm"
            >
              <Users className="w-4 h-4" />
              <span>Private</span>
            </a>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              title="Download"
              className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-transform hover:scale-110"
            >
              <Download 
              className="w-4 h-4 text-white" 
              onClick={()=>{onDownload(file.id)}}
              />
            </button>
            <button
              title="Delete"
              onClick={()=>{onDelete(file.id)}}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;