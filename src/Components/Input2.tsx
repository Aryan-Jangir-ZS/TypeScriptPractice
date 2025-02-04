import React from 'react';

interface Input2Props {
  value: string;
}

const Input2: React.FC<Input2Props> = ({ value }) => {
  return (
    <input
      type="text"
      value={value}
      readOnly
      placeholder="Value will appear here..."
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

export default Input2; 