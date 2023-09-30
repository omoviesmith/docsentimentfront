import React from "react";

import { Page, Document, Text, StyleSheet, pdf } from "@react-pdf/renderer";

import { negativeColor, positiveColor } from "../../constants/color";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#E4E4E4",
    padding: "25mm",
    // position: "relative",
    // width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const PDFComponent: React.FC<{
  text: string;
  positiveWordList: string[];
  negativeWordList: string[];
}> = ({ text, positiveWordList, negativeWordList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {text?.split("\n").map((line, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              position: "relative",
              width: "100%",
            }}
          >
            {line.split(" ").map((word, index) => {
              const isPositive = positiveWordList.includes(word.toLowerCase());
              const isNegative = negativeWordList.includes(word.toLowerCase());
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: "12px",
                    height: "24px",
                    color: isPositive
                      ? positiveColor
                      : isNegative
                      ? negativeColor
                      : "#000",
                  }}
                >
                  {word}&nbsp;
                </Text>
              );
            })}
          </div>
        ))}
      </Page>
    </Document>
  );
};

export const handleExportPDF = async (
  text: string,
  positiveWordList: string[],
  negativeWordList: string[]
) => {
  const pdfData = await pdf(
    <PDFComponent
      text={text}
      positiveWordList={positiveWordList}
      negativeWordList={negativeWordList}
    />
  ).toBlob();
  const blob = new Blob([pdfData], { type: "application/pdf" });

  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Trigger a download of the PDF
  const a = document.createElement("a");
  a.href = url;
  a.download = "exported.pdf";
  a.click();

  // Revoke the URL to free up resources
  URL.revokeObjectURL(url);
};
