import React, { useState } from 'react';
import './DateCalculator.css'; // Import CSS file for styling

function DateCalculator() {
  const [presentDate, setPresentDate] = useState(formatDate(new Date()));
  const [selectedDay, setSelectedDay] = useState('');
  const [calculatedDate, setCalculatedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const calculateDate = () => {
    if (presentDate && selectedDay !== '') {
      const present = new Date(presentDate);
      const presentDayOfWeek = present.getDay();
      const selectedDayOfWeek = parseInt(selectedDay); 
  
      let daysToSubtract = (presentDayOfWeek - selectedDayOfWeek + 7) % 7;
      if (daysToSubtract === 0 && presentDayOfWeek !== selectedDayOfWeek) daysToSubtract = 7; // If it's the same day, subtract 7 days to get to previous occurrence
      
      const previousOccurrence = new Date(present.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
  
      setCalculatedDate(formatDate(previousOccurrence));
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container">
      <h1>Calculate Previous Occurrence of Selected Day</h1>
      <div className="input-container">
        <label>Present Date:</label>
        <input type="date" value={presentDate} onChange={(e) => setPresentDate(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Select Day:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="">Select Day</option>
          <option value="0">Sunday</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
      </div>
      <button className="calculate-button" onClick={calculateDate}>Calculate</button>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p><strong>Previous occurrence of selected day : &nbsp; &nbsp;&nbsp;</strong><hr/> <br/><div><strong style={{ textAlign: 'center' }}>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{calculatedDate}</strong></div></p>
          </div>
        </div>
      )}
    </div>
  );
}

// Function to format date as "04-03-2024"
const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default DateCalculator;
