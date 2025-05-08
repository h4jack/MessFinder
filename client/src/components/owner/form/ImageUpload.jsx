import React from 'react';
import { FaUpload } from "react-icons/fa";

const ImageUpload = ({ images, setImages }) => {
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter(file =>
            file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"
        );

 if (validImages.length) {
            const newImages = validImages.map(file => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const handleImageRemove = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block font-medium mb-1">Upload Images</label>
            <div
                className="border-dashed border-2 border-gray-300 p-4 rounded-md bg-gray-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    const validImages = files.filter(file =>
                        file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"
                    );

                    if (validImages.length) {
                        const newImages = validImages.map(file => ({
                            file,
                            preview: URL.createObjectURL(file),
                        }));
                        setImages(prev => [...prev, ...newImages]);
                    }
                }}
            >
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center text-gray-500"
                >
                    <FaUpload className="text-3xl mb-2" />
                    <span>Drag & Drop or Click to Upload Images</span>
                </label>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group border rounded-md overflow-hidden">
                        <img
                            src={image.preview}
                            alt="Uploaded"
                            className="w-full h-32 object-cover cursor-pointer"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6 p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleImageRemove(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
