import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores/utils/useStore";

interface UploadDocumentProps {
  onClose?: () => void;
}
export const UploadDocument = observer(({ onClose }: UploadDocumentProps) => {
  const { uploadDocument } = useStore();
  const handleChange = (e: any) => {
    console.log(111);

    if (e.target.files?.length > 0) {
      uploadDocument(e);
    }
    // e.target.value = "";
    onClose && onClose();
  };

  return (
    <>
      <label htmlFor="uploadDocument">Upload Document</label>
      <input
        type="file"
        id="uploadDocument"
        accept=".docx, .pdf"
        onChange={handleChange}
        style={{
          width: "100%",
          height: "100%",
          opacity: "0",
          position: "absolute",
        }}
      />
    </>
  );
});
