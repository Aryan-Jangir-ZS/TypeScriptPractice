import React, { useState } from 'react';
import Input1 from './Input1';
import Input2 from './Input2';

const InputContainer: React.FC = () => {
  const [debouncedValue, setDebouncedValue] = useState('');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px'
    }}>
      <h2>Debouncing Input value</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
        padding: '20px'
      }}>
      <div >
        <Input1 onValueChange={setDebouncedValue} />
      </div>
      <div>
        <Input2 value={debouncedValue} />
      </div>
      </div>
    </div>
  );
};

export default InputContainer; 