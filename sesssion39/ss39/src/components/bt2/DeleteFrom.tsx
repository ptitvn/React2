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
  delete_token: string;
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

      if (!response.data.delete_token) {
        throw new Error("Không nhận được delete_token. Kiểm tra lại preset.");
      }

      setUploaded({
        url: response.data.secure_url,
        description: data.description,
        delete_token: response.data.delete_token,
      });

      reset();
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(
        err.message ||
          "Upload thất bại. Kiểm tra lại CLOUD_NAME, UPLOAD_PRESET hoặc cấu hình preset."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploaded?.delete_token) return;

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`,
        { token: uploaded.delete_token }
      );
      setUploaded(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      setError(
        err.message ||
          "Xoá ảnh thất bại. Kiểm tra lại delete_token hoặc kết nối mạng."
      );
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
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? "Đang xoá..." : "Xoá ảnh"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadForm;