import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export function DateTimePicker({ onDateTimeChange }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateTimeChange(date);
  };

  return (
    <div>
      <Datetime
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}