import { HighlightKeywords } from "../../components/Text/Text";
import jsPDF from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";

const ExportPDFCom = ({
  text,
  positiveWordList,
  negativeWordList,
}: {
  text: string;
  positiveWordList: string[];
  negativeWordList: string[];
}) => {
  return (
    <div
      id="pdf-content"
      style={{
        padding: "25mm",
        width: "100mm",
        height: "150mm",
        overflowWrap: "break-word",
        // transform: `scale(${scale})`,
        transformOrigin: "top left",
        flexWrap: "wrap",
        boxSizing: "border-box",
        fontSize: "12px !important",
      }}
    >
      <HighlightKeywords
        text={text}
        positiveWordList={positiveWordList}
        negativeWordList={negativeWordList}
      />
    </div>
  );
};

export function exportPDF(
  text: string,
  positiveWordList: string[],
  negativeWordList: string[]
) {
  console.log(111, text, positiveWordList, negativeWordList);

  // const content = pdfRefCurrent.innerHTML;
  // const pdfContent = htmlToPdfmake(content);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  // pdf.(pdfContent, () => {
  //   pdf.save("exported.pdf");
  // });

  // const element = document.getElementById("pdf-content");
  // if (!element) {
  //   return;
  // }

  pdf.setFontSize(1); // Set the font size to match your component's styling

  const componentHtml = renderToStaticMarkup(
    <ExportPDFCom
      text={text}
      positiveWordList={positiveWordList}
      negativeWordList={negativeWordList}
    />
  );
  console.log(333, componentHtml);

  pdf.html(componentHtml, {
    callback: (pdf) => {
      // Save the PDF to a file or display it to the user
      pdf.save("exported.pdf");
    },
  });
}
