import React, { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/webpack";   // ✅ PDF parser

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  const supportedFormats = {
    pdf: "PDF Document",
    txt: "Text File",
    docx: "Word Document",
    xlsx: "Excel Spreadsheet",
    csv: "CSV File",
    json: "JSON File",
    svg: "SVG Image",
    html: "HTML File",
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError("");
    if (selectedFile) {
      readFileContent(selectedFile);
    }
  };

  // ✅ Proper PDF text extraction
  const readPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let textContent = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        textContent += strings.join(" ") + "\n\n";
      }

      return textContent.trim() || "No extractable text found in this PDF.";
    } catch (err) {
      return `Failed to extract PDF text: ${err.message}`;
    }
  };

  const readFileContent = async (file) => {
    try {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      let content = "";

      switch (fileExtension) {
        case "txt":
        case "csv":
        case "json":
        case "html":
        case "svg":
          content = await readAsText(file);
          break;
        case "docx":
          const result = await mammoth.extractRawText({
            arrayBuffer: await file.arrayBuffer(),
          });
          content = result.value;
          break;
        case "xlsx":
        case "xls":
          const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          content = XLSX.utils.sheet_to_csv(worksheet);
          break;
        case "pdf":
          setError("Extracting text from PDF...");
          content = await readPDF(file);
          setError("");
          break;
        default:
          content = await readAsText(file);
      }

      setFileContent(content);
    } catch (err) {
      setError(`Error reading file: ${err.message}`);
    }
  };

  const readAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  // === Conversion Functions (same as your code, no changes needed except PDF is now readable) ===
  const convertToPDF = (content, filename) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const lineHeight = 7;
    const maxLineWidth = pageWidth - margin * 2;
    let yPosition = margin;
    const lines = content.split("\n");

    lines.forEach((line) => {
      if (!line.trim()) {
        yPosition += lineHeight;
        return;
      }
      const words = line.split(" ");
      let currentLine = "";
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const textWidth = doc.getTextWidth(testLine);
        if (textWidth > maxLineWidth && currentLine) {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(currentLine, margin, yPosition);
          yPosition += lineHeight;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(currentLine, margin, yPosition);
        yPosition += lineHeight;
      }
    });
    doc.save(`${filename}.pdf`);
  };

  const convertToExcel = (content, filename) => {
    let data;
    if (content.includes(",") || content.includes("\t")) {
      data = content.split("\n").map((row) => row.split(","));
    } else {
      data = content.split("\n").map((line) => [line]);
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const convertToSVG = (content, filename) => {
    let svgContent;
    if (content.includes("<svg")) {
      svgContent = content;
    } else {
      const lines = content.split("\n").slice(0, 20);
      const height = lines.length * 20 + 40;
      svgContent = `
        <svg width="400" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="white"/>
          ${lines
            .map(
              (line, i) =>
                `<text x="10" y="${30 + i * 20}" font-family="Arial" font-size="14" fill="black">${line.substring(
                  0,
                  50
                )}</text>`
            )
            .join("")}
        </svg>
      `;
    }
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    saveAs(blob, `${filename}.svg`);
  };

  const convertToHTML = (content, filename) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Converted Document</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Converted Document</h1>
        <pre>${content}</pre>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, `${filename}.html`);
  };

  const handleConvert = async () => {
    if (!file) return setError("Please select a file!");
    if (!fileContent) return setError("File content not loaded!");
    setLoading(true);
    setError("");
    try {
      const filename = file.name.split(".")[0];
      switch (format) {
        case "txt":
          saveAs(new Blob([fileContent], { type: "text/plain" }), `${filename}.txt`);
          break;
        case "pdf":
          convertToPDF(fileContent, filename);
          break;
        case "xlsx":
          convertToExcel(fileContent, filename);
          break;
        case "csv":
          saveAs(new Blob([fileContent], { type: "text/csv" }), `${filename}.csv`);
          break;
        case "json":
          const jsonData = {
            originalFile: file.name,
            convertedAt: new Date().toISOString(),
            content: fileContent,
            lines: fileContent.split("\n"),
          };
          saveAs(
            new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" }),
            `${filename}.json`
          );
          break;
        case "svg":
          convertToSVG(fileContent, filename);
          break;
        case "html":
          convertToHTML(fileContent, filename);
          break;
        case "docx":
          saveAs(
            new Blob([fileContent], {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }),
            `${filename}.docx`
          );
          break;
        default:
          saveAs(new Blob([fileContent], { type: "text/plain" }), `${filename}.${format}`);
      }
      setError("");
    } catch (err) {
      setError(`Conversion failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompress = async () => {
    if (!file) return setError("Please select a file!");
    setLoading(true);
    try {
      const zip = new JSZip();
      zip.file(file.name, file);
      const metadata = {
        originalName: file.name,
        size: file.size,
        type: file.type,
        compressedAt: new Date().toISOString(),
      };
      zip.file("metadata.json", JSON.stringify(metadata, null, 2));
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 9 },
      });
      saveAs(content, `compressed-${file.name}.zip`);
    } catch (err) {
      setError(`Compression failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchCompress = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      setLoading(true);
      try {
        const zip = new JSZip();
        for (const file of files) {
          zip.file(file.name, file);
        }
        const content = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 9 },
        });
        saveAs(content, `batch-compressed-${Date.now()}.zip`);
      } catch (err) {
        setError(`Batch compression failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 border text-white shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Try Use-Mee! File Converter</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-600/20 border border-red-500 text-red-200">{error}</div>
      )}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept=".txt,.pdf,.docx,.xlsx,.xls,.csv,.json,.html,.svg"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Choose File
          </label>
          {file && (
            <div className="mt-3 text-gray-300">
              <p>Selected: {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Convert to:</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              {Object.entries(supportedFormats).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleConvert}
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
            >
              {loading ? "Converting..." : "Convert File"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-600">
          <button
            onClick={handleCompress}
            disabled={loading || !file}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {loading ? "Compressing..." : "Compress Single File"}
          </button>
          <button
            onClick={handleBatchCompress}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {loading ? "Compressing..." : "Batch Compress"}
          </button>
        </div>
        {fileContent && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">File Preview:</h3>
            <div className="bg-gray-800 p-4 rounded-lg max-h-40 overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {fileContent.substring(0, 500)}
                {fileContent.length > 500 && "..."}
              </pre>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-400 text-center">
        <p>Supported formats: TXT, PDF, DOCX, XLSX, CSV, JSON, SVG, HTML</p>
        <p>PDFs are now extracted using pdfjs-dist ✅</p>
        <p>Maximum file size recommended: 10MB</p>
      </div>
    </div>
  );
};

export default FileConverter;
