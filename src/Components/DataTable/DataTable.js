import React from "react";
import { footeri, headeri } from "../../assets/image";
import { generatePDF } from "../PDF/GeneratePDF";

const DataTable = ({ headers, data }) => {
  const headerImage = headeri; // Replace with your actual image URL or base64
  const footerImage = footeri; // Replace with your actual image URL or base64

  const deliveryData = {
    date: new Date(),
    site_supervisor: "Test",
    project_manager: "Jega",
    challan_number: "DC1576",
    client_name: "Jayaraj M",

    items: [
      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "450MM CHANNEL ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "SL – 16 MECHANISM",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "SL – 16 MECHANISM",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },

      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "450MM CHANNEL ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "SL – 16 MECHANISM",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "SL – 16 MECHANISM",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },

      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "450MM CHANNEL ( SOFT CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "0 CRANK HINGES ( NORMAL CLOSE )",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "SL – 16 MECHANISM",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },


      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },

      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },


      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },

      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
    
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
      {
        materials: "DRAWER LOCK",
        quantity: 21,
        unit: "Sets",
        remarks: "Something",
      },
    ],
  };

  const handleGeneratePDF = () => {
    generatePDF({
      headerImage,
      footerImage,
      data: deliveryData,
      headingTextContent: "DELIVERY CHALLAN",
    });
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f4f4f4",
                textAlign: "left",
              }}
            >
              {header}
            </th>
          ))}

          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f4f4f4",
              textAlign: "left",
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td
                key={colIndex}
                style={{
                  border: "1px solid #ddd",
                  padding: "s8px",
                }}
              >
                {row[header.toLowerCase()] || "-"}{" "}
                {/* Adjust key casing if needed */}
              </td>
            ))}

            <td
              style={{
                border: "1px solid #ddd",
                padding: "s8px",
              }}
            >
              <button onClick={handleGeneratePDF}>Export PDF</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;