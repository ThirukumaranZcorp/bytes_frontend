import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

const SignaturePadComponent = ({ onSave, onClose }) => {
  const sigCanvas = useRef({});
  const [imageURL, setImageURL] = useState(null);

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please add your signature before saving.");
      return;
    }
    // const signature = sigCanvas.current
    //   .getTrimmedCanvas()
    //   .toDataURL("image/png");

    // const signature = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const signature = sigCanvas.current.getCanvas().toDataURL("image/png");

    setImageURL(signature);
    if (onSave) onSave(signature); // send to parent
    if (onClose) onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
        <h3 className="text-lg font-semibold mb-3">Sign Below</h3>

        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: "border w-full h-48 rounded bg-gray-50",
          }}
        />

        <div className="flex justify-end mt-4 space-x-3">
          <button
            type="button"
            onClick={clear}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={save}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>

        {imageURL && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={imageURL}
              alt="User Signature"
              className="border w-48 mx-auto rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignaturePadComponent;
