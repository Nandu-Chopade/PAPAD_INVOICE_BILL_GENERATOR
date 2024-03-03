// Invoice.js
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './Invoice.css';

const Invoice = () => {
  const [parcelDate, setParcelDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [travelCharges, setTravelCharges] = useState('');
  const [autoRikshaCharges, setAutoRikshaCharges] = useState('');
  const [packagingCharges, setPackagingCharges] = useState('');
  const [papads, setPapads] = useState([]);
 

  const products = ['Nagali Papad', 'Jwari Papad', 'Makka Papad', 'Tandul Papad'];

  const calculateTotal = () => {
    const totalProductCost = papads.reduce((acc, papad) => acc + papad.quantity * papad.pricePerKg, 0);
    const totalCharges = parseFloat(travelCharges) + parseFloat(autoRikshaCharges) + parseFloat(packagingCharges);
    return totalProductCost + totalCharges;
  };

  const handleAddPapad = () => {
    if (selectedProduct && quantity && pricePerKg) {
      const newPapad = {
        product: selectedProduct,
        quantity: parseFloat(quantity),
        pricePerKg: parseFloat(pricePerKg),
      };

      setPapads([...papads, newPapad]);

      // Reset input fields
      setSelectedProduct('');
      setQuantity('');
      setPricePerKg('');
    }
  };
  const countingOfQuantity = papads.reduce((totalQuantity, papad) => totalQuantity + papad.quantity, 0);
  const handleGenerateInvoice = () => {
   
    const formattedDates = new Intl.DateTimeFormat('en-US', {
        month:'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(parcelDate));
    const invoiceContent = `
    <div class="bill-container" style=" max-width: 1180px; margin: 20px auto; padding: 20px; border: 5px solid brown; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div class="bill-header" style="text-align: center; padding-bottom: 10px; border-bottom: 1px solid brown;">
      <h1 style="font-size: 24px; font-weight: bold; color: #001211; margin: 0;">PAPAD BILL</h1>
      <div style="display: flex; justify-content: space-between; font-size: 16px; margin-top: 30px; font-weight: bold;">
        <div style="margin-right: 10px;">DATE: ${formattedDates}</div>
        <div> ${countingOfQuantity > 9 ? `TOTAL BOX : ${countingOfQuantity <= 13 ? 1:countingOfQuantity <= 25 ? 2 : countingOfQuantity <= 35 ? 3:countingOfQuantity <= 47 ? 4: ""  }` : ""}</div>
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #030303;">
      <thead>
        <tr>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">ITEM</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">QUANTITY (KG)</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">PRICE (PER KG)</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">TRAVEL CHARGES</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">AUTO RIKSHA CHARGE</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">BOX AND PAKAGING CHARGE</th>
          <th style="padding: 12px; border: 1px solid #030303; text-align: left; font-weight: bold; background-color: brown; color: white; white-space: nowrap;">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${papads.map((papad, index) => `
          <tr key=${index}">
            <td style="padding: 12px; border: 1px solid #303436; text-align: left; text-transform: uppercase; font-weight: bold; white-space: nowrap; ">${papad.product}</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; ">${papad.quantity}</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; "> &#8377  ${papad.pricePerKg}</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; ">-</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; ">-</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; ">-</td>
            <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left; font-weight: bold; "> &#8377 ${papad.quantity * papad.pricePerKg}</td>
          </tr>`).join('')}
        <tr>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;font-weight: bold;" colspan="3"></td>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;font-weight: bold;">  &#8377  ${travelCharges}  </td>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;font-weight: bold;">  &#8377  ${autoRikshaCharges} </td>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;font-weight: bold;">  &#8377  ${packagingCharges}</td>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;font-weight: bold;">  &#8377  ${parseFloat(travelCharges) + parseFloat(autoRikshaCharges) + parseFloat(packagingCharges)}</td>
        </tr>
        <tr style="background-color: brown;">
          <td style="padding: 12px; border: 1px solid #303436; text-align: left;" colspan="5"></td>
          <td style="padding: 12px; border: 1px solid #303436; text-align: right; color: white; font-weight: bold;">TOTAL BILL AMOUNT</td>
          <td style="padding: 12px; text-align: center; border: 1px solid #303436; text-align: left;  color: white; font-weight: bold;""> &#8377  ${calculateTotal()}</td>
        </tr>
      </tbody>
    </table>
    <h1 style="font-weight: bold;">BY NANDU CHOPAE JAMNER</h1>
  </div>
  
    `;
  
    const element = document.createElement('div');
    element.innerHTML = invoiceContent;
  
    html2pdf(element, {
      margin: 10,
      filename: `${formattedDates}' PapadInvoice.pdf'`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'legal', orientation: 'landscape' },
    });
  };
  


  return (
    <div className="invoice-container">
      <h2 className="invoice-title">PAPAD BILL INVOICE GENERATOR</h2>

      <label className="custom-input">
        PARCEL DATE:
        <input type="date" value={parcelDate} onChange={(e) => setParcelDate(e.target.value)} />
      </label>

      <label className="custom-input">
  SELECT PRODUCT:
  <select className="custom-select" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
    <option value="" disabled>Select Papad Type</option>
    {products.map((product, index) => (
      <option key={index} value={product}>
        {product}
      </option>
    ))}
  </select>
</label>
      <label className="custom-input">
        QUANTITY (KG):
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>

      <label className="custom-input">
        PRICE PER KG:
        <input type="number" value={pricePerKg} onChange={(e) => setPricePerKg(e.target.value)} />
      </label>

      <button className="add-button" onClick={handleAddPapad}>
        ADD TO LIST
      </button>

      {papads.length > 0 && (
  <div className="papad-list">
    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>ADDED PAPADS:</h3>
    <table className="styled-table">
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>QUANTITY(KG)</th>
          <th>PRICE PER KG</th>
        </tr>
      </thead>
      <tbody>
        {papads.map((papad, index) => (
          <tr key={index}>
            <td className="uppercase">{papad.product}</td>
            <td className="center-text">{papad.quantity}</td>
            <td className="center-text">{papad.pricePerKg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



      <div>
         <p style={{'margin-bottom':'10px', 'font-weight':'bold'}}>CHARGES TO BE APPLIED ON PARCEL:</p> 
        <label className="custom-input">
          TRAVEL CHARGES:
          <input type="number" value={travelCharges} onChange={(e) => setTravelCharges(e.target.value)} />
        </label>
        <label className="custom-input">
          AUTO RIKSHA CHARGES
          <input type="number" value={autoRikshaCharges} onChange={(e) => setAutoRikshaCharges(e.target.value)} />
        </label>
        <label className="custom-input">
          PAKAGING CHARGES:
          <input type="number" value={packagingCharges} onChange={(e) => setPackagingCharges(e.target.value)} />
        </label>
      </div>
  
      <button className="generate-button" onClick={handleGenerateInvoice}>
        GENERATE INVOICE
      </button>
    </div>
  );
};

export default Invoice;
