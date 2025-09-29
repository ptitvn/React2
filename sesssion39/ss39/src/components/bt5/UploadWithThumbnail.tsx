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

function UploadWithThumbnail() {
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
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError("Upload thất bại. Kiểm tra lại cấu hình preset.");
    } finally {
      setLoading(false);
    }
  };

  const getThumbnailUrl = (originalUrl: string) => {
    return originalUrl.replace("/upload/", "/upload/w_200,h_200,c_fill/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload ảnh & tạo thumbnail</h2>

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
          <p className="text-gray-700 mb-2">Mô tả: {uploaded.description}</p>
          <img
            src={getThumbnailUrl(uploaded.url)}
            alt="Thumbnail"
            onClick={() => window.open(uploaded.url, "_blank")}
            className="rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
          />
          <p className="text-sm text-gray-500 mt-2">
            Nhấn vào thumbnail để xem ảnh gốc
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadWithThumbnail;