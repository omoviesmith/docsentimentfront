import { action, makeObservable, observable, runInAction } from "mobx";

import {
  getAnalyze,
  getDocumentList,
  getText,
  postDocument,
  putReplace,
} from "../api";

import { Notification } from "../types";

export class RootStore {
  score = 0;
  positiveWordList: string[] = [];
  negativeWordList: string[] = [];
  documentList: string[] = [];
  documentId = 0;
  text: string = "";
  isUploadedDictionary = false;

  notification: Notification = {
    open: false,
    severity: "success",
    message: "",
  };

  isLoading = false;

  constructor() {
    makeObservable<this>(this, {
      score: observable,
      positiveWordList: observable,
      negativeWordList: observable,

      text: observable,
      setText: action,
      replace: action,

      documentId: observable,
      setDocumentId: action,

      clear: action,

      notification: observable,
      setNotification: action,
      closeNotification: action,

      isLoading: observable,
      setIsLoading: action,

      isUploadedDictionary: observable,
      setIsUploadedDictionary: action,
    });
    this.fetchDocumentList();
  }

  private addTruncate(texts: string[]) {
    return texts.map((text) => {
      return text.length > 30 ? text.slice(0, 30) + "..." : text;
    });
  }

  async fetchDocumentList(): Promise<void> {
    // this.setIsLoading(true);
    const response = await getDocumentList();
    runInAction(() => {
      this.documentList = this.addTruncate(response ?? []);
    });
    this.setIsLoading(false);
  }

  setText(text: string) {
    this.text = text;
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  async fetchText(id: number): Promise<void> {
    if (id === 0) return;
    this.setIsLoading(true);
    const text = await getText(id);
    this.setText(text ?? "");
    this.setIsLoading(false);
  }

  uploadDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setIsLoading(true);
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      console.log("selectedFile", selectedFile);
      const id = await postDocument(selectedFile);
      runInAction(() => {
        if (id) {
          this.documentId = id;
        }
      });
      await this.fetchDocumentList();
      if (id) await this.fetchText(id);
    }
    this.setIsLoading(false);
  };

  analyze = async () => {
    if (this.isUploadedDictionary) {
      this.setIsLoading(true);
      const response = await getAnalyze(this.documentId);
      if (response) {
        const { positiveWords, negativeWords, score } = response;
        runInAction(() => {
          this.positiveWordList = positiveWords;
          this.negativeWordList = negativeWords;
          this.score = Number(score.toFixed(5));
        });
      }
      this.setIsLoading(false);
    } else {
      this.setNotification({
        open: true,
        severity: "error",
        message: "Please Upload Dictionary first",
      });
    }
  };

  replace = async (oldWord: string, newWord: string, isAll: boolean) => {
    this.setIsLoading(true);
    const text = await putReplace(this.documentId, oldWord, newWord, isAll);
    if (this.text !== text) {
      this.setNotification({
        open: true,
        severity: "success",
        message: "Replaced successfully",
      });
    } else {
      this.setNotification({
        open: true,
        severity: "error",
        message: "Failed to replace",
      });
    }
    this.setText(text ?? "");
    this.setIsLoading(false);
  };

  setDocumentId = (id: number) => {
    this.documentId = id;
    this.fetchText(id);
  };

  clear = () => {
    this.text = "";
    this.positiveWordList = [];
    this.negativeWordList = [];
    this.score = 0;
  };

  setNotification = (notification: Notification) => {
    this.notification = notification;
  };

  closeNotification = () => {
    console.log("close");

    this.notification = {
      ...this.notification,
      open: false,
    };
  };

  setIsUploadedDictionary = () => {
    this.isUploadedDictionary = true;
  };

  dispose(): void {
    // TBD
  }
}
