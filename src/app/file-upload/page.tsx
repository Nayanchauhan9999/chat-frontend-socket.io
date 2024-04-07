"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const FileUploadDemo = () => {
  const [file, setFile] = useState<FileList>({} as FileList);
  const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    Array.from(file).forEach((file) => {
      formData.append("uploadedFiles", file);
    });
    const fileUploadToServer = await axios.postForm(
      "http://localhost:8080/upload-multiple",
      formData
    );
    console.log(fileUploadToServer);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  return (
    <form onSubmit={(e) => handleFileUpload(e)}>
      <input
        accept=".jpg"
        type="file"
        name="uploadedFiles"
        onChange={(e) => onFileChange(e)}
        multiple={true}
      />

      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadDemo;
