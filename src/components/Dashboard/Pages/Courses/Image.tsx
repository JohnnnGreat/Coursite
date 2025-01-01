"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Upload, X, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import useCourseInformation from "@/actions/courseActions";
import { Client, ID, Storage, Account } from "appwrite";

const client = new Client()
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("67408c6e0002b22feb6a");

const storage = new Storage(client);
const account = new Account(client);

const authenticateAnonymously = async () => {
   try {
      // Create anonymous session
      await account.createAnonymousSession();
   } catch (error) {
      console.error("Authentication error:", error);
   }
};

interface Point {
   x: number;
   y: number;
}

interface Area {
   x: number;
   y: number;
   width: number;
   height: number;
}

const ImageUpload = () => {
   const [image, setImage] = useState<string | null>(null);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [error, setError] = useState<string | null>(null);
   const [isCropping, setIsCropping] = useState(false);

   const { addToCoursePayload, courseInformation } = useCourseInformation((state) => state);
   const onDrop = useCallback(async (acceptedFiles: File[]) => {
      setError(null);

      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
         setError("Please upload an image file");
         return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
         setError("Image size should be less than 5MB");
         return;
      }

      const reader = new FileReader();
      reader.onload = () => {
         // Validate image dimensions
         const img = new Image();
         img.onload = () => {
            if (img.width < 200 || img.height < 200) {
               setError("Image dimensions should be at least 200x200 pixels");
               return;
            }
            setImage(reader.result as string);
            setIsCropping(true);
         };
         img.src = reader.result as string;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      // const response = fetch("https://appwrite-express-file-upload.onrender.com/upload", {
      //    method: "POST",

      //    body: formData,
      // })
      //    .then((res) => {
      //       console.log(res);
      //       if (!res.ok) {
      //          throw new Error(`HTTP error! status: ${res.status}`);
      //       }
      //       return res.json(); // Parse JSON response
      //    })
      //    .then((data) => {
      //       const { fileUrl } = data;
      //       addToCoursePayload({ imageUrl: fileUrl });
      //    })
      //    .catch((error) => {
      //       console.error("Error uploading file:", error);
      //    });

      const fileId = ID.unique();

      // Upload file to Appwrite storage
      const response = storage
         .createFile(
            "67409170002d4b8b36b4", // Replace with your bucket ID
            fileId,
            file,
         )
         .then((response) => {
            console.log(response);
            const fileUrl = storage.getFileView("67409170002d4b8b36b4", response.$id);
            console.log(fileUrl);
         });
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      },
      maxFiles: 1,
      multiple: false,
   });

   const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
      console.log("cropfinished", croppedArea, croppedAreaPixels);
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const createCroppedImage = async () => {
      if (!image || !croppedAreaPixels) return;

      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
         const ctx = canvas.getContext("2d");
         if (!ctx) return;

         // Set canvas dimensions to cropped size
         canvas.width = croppedAreaPixels.width;
         canvas.height = croppedAreaPixels.height;

         // Draw the cropped image
         ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
         );

         // Convert to base64
         const croppedImage = canvas.toDataURL("image/jpeg");
         setImage(croppedImage);
         setIsCropping(false);
      };

      img.src = image;
   };

   const removeImage = () => {
      setImage(null);
      setIsCropping(false);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setError(null);
   };

   return (
      <div className="border rounded-[10px]">
         <CardHeader className="border-b">
            <CardTitle className="text-xl font-bold">Course Image</CardTitle>
            <CardDescription>Upload a cover image for your course</CardDescription>
         </CardHeader>
         <CardContent className="p-6">
            <div className="space-y-4">
               {error && (
                  <Alert variant="destructive">
                     <AlertCircle className="h-4 w-4" />
                     <AlertDescription>{error}</AlertDescription>
                  </Alert>
               )}

               {!image && (
                  <div
                     {...getRootProps()}
                     className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${
                   isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                }`}
                  >
                     <input {...getInputProps()} />
                     <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                           <p className="text-lg font-semibold">
                              Drop your image here, or click to browse
                           </p>
                           <p className="text-sm text-gray-500 mt-1">
                              PNG, JPG, GIF up to 5MB. Minimum dimensions: 200x200 pixels
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               {image && !isCropping && (
                  <div className="relative">
                     <img
                        src={image}
                        alt="Course cover"
                        className="w-full h-64 object-cover rounded-lg"
                     />
                     <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        aria-label="Remove image"
                     >
                        <X className="h-4 w-4" />
                     </button>
                  </div>
               )}

               {image && isCropping && (
                  <div className="space-y-4">
                     <div className="relative h-96">
                        <Cropper
                           image={image}
                           crop={crop}
                           zoom={zoom}
                           aspect={16 / 9}
                           onCropChange={setCrop}
                           onZoomChange={setZoom}
                           onCropComplete={onCropComplete}
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-medium">Zoom</label>
                        <Slider
                           value={[zoom]}
                           min={1}
                           max={3}
                           step={0.1}
                           onValueChange={(value) => setZoom(value[0])}
                        />
                     </div>

                     <div className="flex justify-end gap-2">
                        <button
                           onClick={() => setIsCropping(false)}
                           className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={createCroppedImage}
                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                           Apply Crop
                        </button>
                     </div>
                  </div>
               )}

               {image && !isCropping && (
                  <button
                     onClick={() => setIsCropping(true)}
                     className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                     <ImageIcon className="h-4 w-4" />
                     Adjust Image
                  </button>
               )}
            </div>
         </CardContent>
      </div>
   );
};

export default ImageUpload;
