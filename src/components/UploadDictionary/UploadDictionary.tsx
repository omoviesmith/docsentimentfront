import { observer } from "mobx-react-lite";
import React from "react";

import { postDictionary } from "../../api";
import { useStore } from "../../stores/utils/useStore";

interface UploadDictionaryProps {
  onClose?: () => void;
}

export const UploadDictionary = observer(
  ({ onClose }: UploadDictionaryProps) => {
    const { setIsLoading, setIsUploadedDictionary } = useStore();
    const handleUploadDictionary = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      onClose && onClose();
      setIsLoading(true);
      const selectedFile = event.target.files && event.target.files[0];
      if (selectedFile) {
        await postDictionary(selectedFile);
        setIsUploadedDictionary();
      }
      setIsLoading(false);
    };
    return (
      <>
        <label htmlFor="uploadDictionary">Upload Dictionary</label>
        <input
          type="file"
          id="uploadDictionary"
          accept=".csv"
          onChange={handleUploadDictionary}
          style={{ display: "none" }}
        />
      </>
    );
  }
);
