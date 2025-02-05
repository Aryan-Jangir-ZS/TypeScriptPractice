import React, { useState } from 'react';
import './TrafficLight.css';

type LightState = 'red' | 'yellow' | 'green';

const TrafficLight: React.FC = () => {
  const [currentLight, setCurrentLight] = useState<LightState>('red');

  const getDuration = (light: LightState): number => {
    switch (light) {
      case 'red':
        return 5000;
      case 'yellow':
        return 2000;
      case 'green':
        return 3000;
      default:
        return 5000;
    }
  };

 setTimeout(() => {
    if (currentLight === 'red') {
      setCurrentLight('yellow');
    } else if (currentLight === 'yellow') {
      setCurrentLight('green');
    } else {
      setCurrentLight('red');
    }
  }, getDuration(currentLight));

  return (
    <div className="traffic-light">
      <div className={`light red ${currentLight !== 'red' ? 'off' : ''}`} />
      <div className={`light yellow ${currentLight !== 'yellow' ? 'off' : ''}`} />
      <div className={`light green ${currentLight !== 'green' ? 'off' : ''}`} />
    </div>
  );
};

export default TrafficLight;
