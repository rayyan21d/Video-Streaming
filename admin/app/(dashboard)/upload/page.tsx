"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { initiateUpload } from "./initiate";
import { completeUpload } from "./complete";

export default function Page() {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileUrl(null);
    }
  };

  const handleTitleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.FormEvent<HTMLFormElement>) => {
    setDescription(e.target.value);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file);

    try {
      setStatus("Initiating upload...");

      const requestBody = {
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
      };
      const res = await initiateUpload(requestBody);

      if (res.status !== 200 || !res.data) {
        setStatus("Upload initiation failed: " + res.message);
        return;
      }

      const { uploadId, signedUrl, fileName } = res.data;

      console.log(
        "Upload initiated via action:",
        signedUrl,
        fileName,
        uploadId
      );

      // Upload to GCS
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": "video/mp4", // or "video/your-video-format"
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // Complete upload
      // await axios.post("/api/upload/complete", {
      //   fileName,
      //   uploadId,
      // });

      const completeRes = await completeUpload({ uploadId, fileName });

      console.log("Upload complete:", completeRes);

      setStatus("Upload complete!");
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Upload failed: " + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow"></main>
      <div>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={handleDescriptionChange}
            value={description}
          />

          <input type="file" accept="image/jpeg, image/png, image/webp" />
          <input type="file" accept="video/mp4" onChange={handleFileChange} />

          <p>{status}</p>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
