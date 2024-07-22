import path from "path";
import html_to_pdf from "html-pdf-node";

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export function getBase64(base_64: string) {
  return base_64.split(",").pop() || "";
}
export function getFileExtension(file_name: string) {
  return path.parse(file_name).ext;
}

export function getBase64Extension(base_64: string) {
  return base_64.split(";")[0].split("/")[1];
}

export const generateBase64pdfFromHtml = (content: string): Promise<string> => {
    let options = {
      format: "A4",
    };
    let file = { content };
    return new Promise((resolve, reject) => {
      try {
        html_to_pdf.generatePdf(file, options, (err: Error, pdfBuffer: Buffer) => {
          if (err) {
            reject(err);
          }
          let base64 = pdfBuffer.toString("base64");
          resolve(base64);
        });
      } catch (e) {
        reject(e);
      }
    });
  };
