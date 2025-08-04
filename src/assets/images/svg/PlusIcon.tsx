// PlusIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ size = 14, color = '#121212' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path
      d="M2.1875 7H11.8125M7 2.1875V11.8125"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
