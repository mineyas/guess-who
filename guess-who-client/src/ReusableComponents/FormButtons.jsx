import React from "react";

export default function FormButtons({ isEdit, typeSubmit, closeModal, openEdit }) {
  return (
    <div className="flex_row justify-end gap-2">
      {isEdit ? (
        <>
          <button
            type={typeSubmit}
            className="bg-green-400 hover:bg-green-100 text-white hover:text-green-400 font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-200 text-white hover:text-red-500 font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
        </>
      ) : (
        <button
          onClick={openEdit}
          className="bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold py-2 px-4 rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
}
