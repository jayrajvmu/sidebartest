import React from 'react';
import './Challan.css';  // You can use a separate CSS file or inline styles

const deliveryData = [
  { item: 'Item 1', quantity: 2, price: 50 },
  { item: 'Item 2', quantity: 3, price: 30 },
  { item: 'Item 3', quantity: 1, price: 100 },
];

function Challan() {
  return (
    <div className="challan-container">
      {/* Header Section */}
      <header className="challan-header">
        <div className="challan-title">
          <h1>Delivery Challan</h1>
          <p>Company Name</p>
        </div>
        <div className="challan-info">
          <p>Challan Number: #12345</p>
          <p>Date: 2024-12-18</p>
        </div>
      </header>

      {/* Center Section with Tables */}
      <section className="challan-body">
        <table className="challan-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {deliveryData.map((data, index) => (
              <tr key={index}>
                <td>{data.item}</td>
                <td>{data.quantity}</td>
                <td>{data.price}</td>
                <td>{data.quantity * data.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer Section */}
      <footer className="challan-footer">
        <div className="footer-info">
          <p>Authorized Signature</p>
          <p>Company Address</p>
        </div>
      </footer>
    </div>
  );
}

export default Challan;
