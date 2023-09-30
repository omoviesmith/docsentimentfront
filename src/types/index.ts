export type Analyze = {
  negativeWords: string[];
  positiveWords: string[];
  score: number;
};

export type Notification = {
  open: boolean;
  severity: "success" | "error";
  message: string;
};
