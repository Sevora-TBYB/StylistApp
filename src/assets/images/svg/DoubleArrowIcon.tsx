import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface DoubleArrowIconProps {
  size?: number;
  color?: string;
}

const DoubleArrowIcon: React.FC<DoubleArrowIconProps> = ({ size = 18, color = '#121212' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 3.375L12.375 9L6.75 14.625"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DoubleArrowIcon;
