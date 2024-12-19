import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDF = ({ data, headerImage, footerImage }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const headerImg = new Image();
    const footerImg = new Image();
    headerImg.src = headerImage;
    footerImg.src = footerImage;

    // Function to handle PDF rendering
    const renderPDF = (headerImgHeight, footerImgHeight) => {
      // Ensure the header and footer appear on every page
      doc.autoTable({
        startY: headerImgHeight + 92,
        head: [["SI.NO", "MATERIALS", "QUANTITY", "UNIT", "REMARKS"]],
        body: data.items.map((item, index) => [
          index + 1,
          item.materials,
          item.quantity,
          item.unit,
          item.remarks,
        ]),
        theme: "grid",
        styles: { cellPadding: 5 },
        headStyles: {
          fillColor: [34, 157, 167],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        didDrawPage: () => {
          const currentPage = doc.internal.getNumberOfPages();
          doc.setPage(currentPage);

          // Add header image on each page
          if (headerImg && headerImgHeight) {
            const yPosHeader = 0;
            doc.addImage(
              headerImg,
              "PNG",
              0,
              yPosHeader,
              pageWidth,
              headerImgHeight
            );
          }

          if (currentPage === 1) {
            const headingText = "DELIVERY CHALLAN";
            const headingTextYPos = headerImgHeight + 10; // Adjusted vertical position

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);

            // Calculate centered position
            const headingTextWidth = doc.getTextWidth(headingText);
            const headingTextXPos = (pageWidth - headingTextWidth) / 2; // Center X positio
            // Draw the text
            doc.text(headingText, headingTextXPos, headingTextYPos);
          }

          const procurementSignatureText = "PROCUREMENT MANAGER SIGNATURE";
          const procurementSignatureYPos = pageHeight - footerImgHeight - 4; // Position the signature text before the footer image
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text(procurementSignatureText, 14, procurementSignatureYPos);

          const executionSignatureText = "EXECUTION HEAD SIGNATURE";
          const executiontextWidth = doc.getTextWidth(executionSignatureText); // Get the width of the text
          const executionSignatureYPos = pageHeight - footerImgHeight - 4; // Position the signature text before the footer image
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text(
            executionSignatureText,
            pageWidth - 14 - executiontextWidth,
            executionSignatureYPos
          );

          // Add footer image on each page
          if (footerImg && footerImgHeight) {
            const yPosFooter = pageHeight - footerImgHeight;
            doc.addImage(
              footerImg,
              "PNG",
              0,
              yPosFooter,
              pageWidth,
              footerImgHeight
            );
          }

          // Add customer table only on the first page
          if (currentPage === 1) {
            const customerNameTableYPos = headerImgHeight + 16;
            const customerInfoTableData = [
              ["Date", data.date],
              ["Challan Number:", data.challan_number],
              ["Client Name:", data.client_name],
              ["Site Supervisor:", data.site_supervisor],
              ["Project Manager:", data.project_manager],
            ];

            doc.autoTable({
              startY: customerNameTableYPos,
              body: customerInfoTableData,
              theme: "grid",
              styles: { cellPadding: 5, fontSize: 10 },
              columnStyles: {
                0: {
                  halign: "left",
                  cellWidth: "auto",
                  fillColor: [34, 157, 167],
                  textColor: [255, 255, 255],
                  fontStyle: "bold",
                },
                1: { halign: "left", cellWidth: "auto" },
              },
            });
          }
        },
        margin: { top: headerImgHeight + 15, bottom: footerImgHeight + 20 },
      });

      // Open PDF in a new tab
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    };

    // Image loading logic
    headerImg.onload = () => {
      footerImg.onload = () => {
        const headerImgHeight =
          headerImg.width > 0
            ? (headerImg.height / headerImg.width) * pageWidth
            : 40; // Default header height

        const footerImgHeight =
          footerImg.width > 0
            ? (footerImg.height / footerImg.width) * pageWidth
            : 40; // Default footer height

        renderPDF(headerImgHeight, footerImgHeight);
      };

      footerImg.onerror = () => {
        console.error("Footer image failed to load.");
        const headerImgHeight =
          headerImg.width > 0
            ? (headerImg.height / headerImg.width) * pageWidth
            : 40;

        renderPDF(headerImgHeight, 40); // Use default footer height
      };
    };

    headerImg.onerror = () => {
      console.error("Header image failed to load.");
      footerImg.onload = () => {
        const footerImgHeight =
          footerImg.width > 0
            ? (footerImg.height / footerImg.width) * pageWidth
            : 40;

        renderPDF(40, footerImgHeight); // Use default header height
      };

      footerImg.onerror = () => {
        console.error("Both images failed to load.");
        renderPDF(40, 40); // Use default dimensions
      };
    };
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;
