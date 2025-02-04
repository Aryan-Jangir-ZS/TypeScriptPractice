import React, { useState, useEffect } from 'react';

interface Input1Props {
  onValueChange: (value: string) => void;
}

const Input1: React.FC<Input1Props> = ({ onValueChange }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onValueChange(value);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [value, onValueChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type in Input 1..."
      style={{
        padding: '8px 12px',
        fontSize: '50px',
        borderRadius: '4px',
        border: '5px solid cyan',
        margin: '10px',
        width: '700px',
        height: '150px',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.1), 0 0 30px rgba(0, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        outline: 'none'
      }}
    />
  );
};

export default Input1;