import React from "react";
import { Page, Text, Document, PDFViewer } from "@react-pdf/renderer";

export const PdfComponent = () => {
  return (
    <PDFViewer width={300} height={200}>
      <Document>
        <Page size="A4">
          <Text style={{ color: "red", fontSize: 20 }}>Red Text</Text>
          <Text style={{ color: "blue", fontSize: 20 }}>Blue Text</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

