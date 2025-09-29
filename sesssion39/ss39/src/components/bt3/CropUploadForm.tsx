import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Cropper from "react-cropper";
import axios from "axios";

type FormValues = {
  description: string;
};

interface UploadedData {
  url: string;
  description: string;
}

const CLOUD_NAME = "dbh9eggj2";
const UPLOAD_PRESET = "my_unsigned";

function CropUploadForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<UploadedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cropperRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const getCroppedBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const cropper = (cropperRef.current as any)?.cropper;
      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        if (blob) resolve(blob);
        else reject(new Error("Không thể crop ảnh."));
      });
    });
  };

  const onSubmit = async (data: FormValues) => {
    if (!imageFile) {
      setError("Vui lòng chọn ảnh.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const croppedBlob = await getCroppedBlob();

      const formData = new FormData();
      formData.append("file", croppedBlob);
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
      setImageFile(null);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError("Upload thất bại. Kiểm tra lại ảnh hoặc preset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crop & Upload ảnh</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 block w-full"
      />

      {imageFile && (
        <Cropper
          src={URL.createObjectURL(imageFile)}
          style={{ height: 300, width: "100%" }}
          initialAspectRatio={1}
          guides={true}
          ref={cropperRef}
          viewMode={1}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Nhập mô tả ảnh"
          {...register("description", { required: true })}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang tải..." : "Upload ảnh đã crop"}
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
}

export default CropUploadForm;