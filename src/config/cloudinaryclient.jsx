export async function uploadPFP(file) {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PFPS;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Upload Failed!");
    }

    return data.secure_url;
}

export async function uploadBanner(file) {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_BANNERS;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Upload Failed!");
    }

    return data.secure_url;
}