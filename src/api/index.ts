import { Analyze } from "@/types";
import axios from "axios";

export const postDictionary = async (selectedFile: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
    // Send a POST request to your backend API
    const response = await axios.post(
      "https://document-sentiment-analyzer-kuft.onrender.com/api/upload_dictionary",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const postDocument = async (
  selectedFile: File
): Promise<number | undefined> => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
    const response = await axios.post(
      "https://document-sentiment-analyzer-kuft.onrender.com/api/documents",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(5555, response, response.data.id);

    if (response.status === 200 || response.status === 201) {
      console.log(55555555, Number(response.data.id));

      return Number(response.data.id);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const getText = async (id: number): Promise<string | undefined> => {
  try {
    const response = await axios.get(
      `https://document-sentiment-analyzer-kuft.onrender.com/api/documents/${id}`
    );
    if (response.status === 200) {
      console.log("Got text successfully:", response.data);
      return response.data.content;
    } else {
      console.error("Error get data:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const putReplace = async (
  id: number,
  oldWord: string,
  newWord: string,
  isAll: boolean
): Promise<string | undefined> => {
  try {
    const response = await axios.put(
      `https://document-sentiment-analyzer-kuft.onrender.com/api/documents/${id}/find_replace`,
      {
        old_word: oldWord,
        new_word: newWord,
        replace_all: isAll,
      }
    );
    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      return response.data.content;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const getAnalyze = async (id: number): Promise<Analyze | undefined> => {
  try {
    const response = await axios.get(
      `https://document-sentiment-analyzer-kuft.onrender.com/api/documents/${id}/analyze`
    );
    if (response.status === 200) {
      console.log("Got analyzed score successfully:", response.data);
      return {
        negativeWords: response.data["negative_words"],
        positiveWords: response.data["positive_words"],
        score: response.data["net_positivity_score"],
      };
    }
  } catch (error) {
    console.error("Error get analyzed score:", error);
  }
};

export const getDocumentList = async (): Promise<string[] | undefined> => {
  try {
    const response = await axios.get(
      `https://document-sentiment-analyzer-kuft.onrender.com/api/documents/ids`
    );
    if (response.status === 200) {
      console.log("Got analyzed score successfully:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error get analyzed score:", error);
  }
};
