import React, { useState, useRef } from 'react';
import Camera from 'react-camera-pro';

function PopupCamera() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const takePhoto = () => {
        if (cameraRef.current) {
            const photo = cameraRef.current.takePhoto();
            setImage(photo);
            togglePopup(); // Close popup after taking a photo
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={togglePopup}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
                Open Camera
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
                    <div className="relative w-11/12 max-w-md bg-white rounded-lg shadow-lg">
                        <div className="aspect-w-16 aspect-h-9">
                            <Camera ref={cameraRef} />
                        </div>
                        <div className="p-4 flex justify-between">
                            <button
                                onClick={takePhoto}
                                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
                            >
                                Take Photo
                            </button>
                            <button
                                onClick={togglePopup}
                                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {image && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-700">Captured Image:</h3>
                    <img src={image} alt="Captured" className="mt-2 border rounded-lg" />
                </div>
            )}
        </div>
    );
}

export default PopupCamera;
