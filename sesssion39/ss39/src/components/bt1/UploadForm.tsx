import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  image: FileList;
  description: string;
};

interface UploadedData {
  url: string;
  description: string;
}

const CLOUD_NAME = "dbh9eggj2";
const UPLOAD_PRESET = "my_unsigned";

function UploadForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [uploaded, setUploaded] = useState<UploadedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    if (!data.image || data.image.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append(
        "context",
        `alt=${data.description}|caption=${data.description}`
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      setUploaded({
        url: response.data.secure_url,
        description: data.description,
      });

      reset();
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload thất bại. Kiểm tra lại CLOUD_NAME hoặc UPLOAD_PRESET.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload ảnh với mô tả</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="block w-full"
        />
        <input
          type="text"
          placeholder="Nhập mô tả ảnh"
          {...register("description", { required: true })}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang tải..." : "Upload"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {uploaded && (
        <div className="mt-6">
          <img
            src={uploaded.url}
            alt={uploaded.description}
            className="rounded shadow-md mb-2"
          />
          <p className="text-gray-700">Mô tả: {uploaded.description}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
