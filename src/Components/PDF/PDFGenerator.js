import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
import { headeri } from '../../assets/image';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
  },
  footerImage: {
    width: '100%',
    height: 50,
    objectFit: 'cover',
    position: 'absolute',
    bottom: 0,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: '20px auto',
    border: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

// Create a reusable Table Component
const Table = ({ data }) => (
  <View style={styles.table}>
    {/* Header Row */}
    <View style={[styles.tableRow, styles.tableHeader]}>
      {Object.keys(data[0]).map((header, index) => (
        <Text key={index} style={[styles.tableCell, { fontWeight: 'bold' }]}>
          {header}
        </Text>
      ))}
    </View>
    {/* Data Rows */}
    {data.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.tableRow}>
        {Object.values(row).map((cell, cellIndex) => (
          <Text key={cellIndex} style={styles.tableCell}>
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// Main Document Component
const MyDocument = ({ data }) => {
  const footerImage =
   {headeri}; // Replace with actual image URL

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        {/* Header Image */}
        <Image
          src={headeri}
          style={styles.headerImage}
        />
        <Text style={styles.textCenter}>Welcome to the PDF Document</Text>
        {/* Dynamic Table */}
        <Table data={data} />
        {/* Footer Image will be added at the bottom of this page if space allows */}
        <Image src={footerImage} style={styles.footerImage} />
      </Page>

      {/* Last Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.textCenter}>Thank you for reading!</Text>
        {/* Footer Image */}
        <Image src={footerImage} style={styles.footerImage} />
      </Page>
    </Document>
  );
};

// Component to Download PDF
const PDFGenerator = () => {
  // Sample Dynamic Data
  const data = [
    { Name: 'John Doe', Age: 30, Occupation: 'Developer' },
    { Name: 'Jane Smith', Age: 25, Occupation: 'Designer' },
    { Name: 'Sam Brown', Age: 35, Occupation: 'Manager' },
  ];

  return (
    <div>
      <h1>PDF Generator</h1>
      <PDFDownloadLink
        document={<MyDocument data={data} />}
        fileName="generated_document.pdf"
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
