import axios from "axios";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_KEY!);

  const cloudname = import.meta.env.VITE_UPLOAD_CLOUD_NAME!;

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
      formData,
      {
        withCredentials: false,
      }
    );

    return response.data.secure_url as string;
  } catch (error) {
    throw error;
  }
};

export default uploadImage;
