"use client";
import { useState, useEffect } from "react";
import { uploadFile, getInstructorFiles, deleteFile } from "@/serverActions/files";
import {
   FileVideo,
   FileText,
   FileImage,
   FilePlus,
   Loader2,
   X,
   Link as LinkIcon,
   Download,
   Trash2,
} from "lucide-react";
import { Client, Storage, ID } from "appwrite";

const client = new Client()
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("67408c6e0002b22feb6a");

const storage = new Storage(client);

const FilesDashboard = ({ userId }) => {
   const [files, setFiles] = useState([]);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);
   const [selectedFileType, setSelectedFileType] = useState(null);
   const [showUploadModal, setShowUploadModal] = useState(false);

   const fileTypes = [
      {
         id: "video",
         label: "Course Video",
         description: "Upload course lectures, tutorials or demonstrations",
         icon: FileVideo,
         accept: "video/*",
      },
      {
         id: "document",
         label: "Course Material",
         description: "Upload PDFs, documents or presentations",
         icon: FileText,
         accept: ".pdf,.doc,.docx,.ppt,.pptx",
      },
      {
         id: "image",
         label: "Course Image",
         description: "Upload thumbnails or visual materials",
         icon: FileImage,
         accept: "image/*",
      },
      {
         id: "other",
         label: "Other Resources",
         description: "Upload additional course resources",
         icon: FilePlus,
         accept: "*",
      },
   ];

   useEffect(() => {
      loadFiles();
   }, []);

   const loadFiles = async () => {
      const instructorFiles = await getInstructorFiles(userId);
      setFiles(instructorFiles);
   };

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setIsUploading(true);
      setUploadProgress(0);

      try {
         const fileId = ID.unique();
         const response = await storage.createFile("67409170002d4b8b36b4", fileId, file);

         const fileUrl = storage.getFileView("67409170002d4b8b36b4", response.$id);

         const fileInformation = {
            fileName: file.name,
            fileUrl: fileUrl,
            fileType: file.type,
            fileSize: file.size,
            uploadedBy: userId,
         };
         const { file: uploadedFile } = await uploadFile(fileInformation, userId);
         setFiles((prev) => [uploadedFile, ...prev]);
         setShowUploadModal(false);
         setSelectedFileType(null);
      } catch (error) {
         console.error("Upload failed:", error);
      } finally {
         setIsUploading(false);
         setUploadProgress(0);
      }
   };

   const handleDelete = async (fileId) => {
      try {
         await deleteFile(fileId, userId);
         setFiles((prev) => prev.filter((file) => file._id !== fileId));
      } catch (error) {
         console.error("Delete failed:", error);
      }
   };

   const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
   };

   return (
      <div className="p-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Course Files Manager</h2>
            <button
               onClick={() => setShowUploadModal(true)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
               <FilePlus size={20} />
               Add New File
            </button>
         </div>

         {/* File Type Selection Modal */}
         {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-xl font-semibold">Select File Type</h3>
                     <button
                        onClick={() => setShowUploadModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     {fileTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                           <div
                              key={type.id}
                              onClick={() => setSelectedFileType(type)}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                 selectedFileType?.id === type.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                              }`}
                           >
                              <div className="flex items-start gap-3">
                                 <Icon className="w-6 h-6 text-blue-600" />
                                 <div>
                                    <h4 className="font-medium">{type.label}</h4>
                                    <p className="text-sm text-gray-600">{type.description}</p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  {selectedFileType && (
                     <div className="flex justify-end gap-3">
                        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2">
                           {isUploading ? (
                              <>
                                 <Loader2
                                    className="animate-spin"
                                    size={20}
                                 />
                                 Uploading...
                              </>
                           ) : (
                              <>
                                 <FilePlus size={20} />
                                 Select {selectedFileType.label}
                              </>
                           )}
                           <input
                              type="file"
                              className="hidden"
                              accept={selectedFileType.accept}
                              onChange={handleFileUpload}
                              disabled={isUploading}
                           />
                        </label>
                     </div>
                  )}
               </div>
            </div>
         )}

         {/* Files Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
               <div
                  key={file._id}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
               >
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                        {file.fileType.includes("video") && <FileVideo className="text-blue-600" />}
                        {file.fileType.includes("image") && (
                           <FileImage className="text-green-600" />
                        )}
                        {file.fileType.includes("application") && (
                           <FileText className="text-orange-600" />
                        )}
                        <h3 className="font-medium truncate flex-1">{file.fileName}</h3>
                     </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                     <p className="flex items-center gap-2">
                        <Download size={16} />
                        {formatFileSize(file.fileSize)}
                     </p>
                     <p className="flex items-center gap-2">
                        <LinkIcon size={16} />
                        {file.fileType}
                     </p>
                     <p className="text-xs text-gray-500">
                        Uploaded on {new Date(file.createdAt).toLocaleDateString()}
                     </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                     <button
                        onClick={() => navigator.clipboard.writeText(file.fileUrl)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                     >
                        <LinkIcon size={16} />
                        Copy URL
                     </button>
                     <button
                        onClick={() => handleDelete(file._id)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                     >
                        <Trash2 size={16} />
                        Delete
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {files.length === 0 && (
            <div className="text-center text-gray-500 mt-16 py-12 border-2 border-dashed rounded-xl">
               <FilePlus
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
               />
               <h3 className="font-medium text-lg mb-1">No files uploaded yet</h3>
               <p className="text-gray-500">Start by adding your course materials</p>
            </div>
         )}
      </div>
   );
};

export default FilesDashboard;
