

const axios = require("axios");
const FormData = require("form-data");

const uploadImageToUploadcare = async (file) => {
  const formData = new FormData();
  formData.append("UPLOADCARE_PUB_KEY", process.env.UPLOADCARE_PUBLIC_KEY);
  formData.append("UPLOADCARE_STORE", "1"); // تخزين الصورة في Uploadcare
  formData.append("file", file.buffer, { filename: file.originalname });

  try {
    const uploadResponse = await axios.post("https://upload.uploadcare.com/base/", formData, {
      headers: { ...formData.getHeaders() },
    });

    const imageUrl = `https://ucarecdn.com/${uploadResponse.data.file}/`;
    const publicId = uploadResponse.data.file;

    return { imageUrl, publicId };
  } catch (error) {
    throw new Error("Error uploading image to Uploadcare: " + error.message);
  }
};


const deleteImageFromUploadcare = async (publicId) => {
  try {
    const deleteUrl = `https://api.uploadcare.com/files/${publicId}/storage/`;

    const response = await axios.delete(deleteUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Uploadcare.Simple ${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
      },
    });

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting image from Uploadcare: " + error.message);
  }
};


module.exports = { uploadImageToUploadcare , deleteImageFromUploadcare };
