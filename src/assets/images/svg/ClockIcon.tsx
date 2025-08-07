import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ClockIconProps {
  size?: number;
  color?: string;
}

const ClockIcon: React.FC<ClockIconProps> = ({ size = 14, color = '#737378' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7.5 3.9375C7.5 3.66136 7.27614 3.4375 7 3.4375C6.72386 3.4375 6.5 3.66136 6.5 3.9375H7.5ZM7 7H6.5C6.5 7.27614 6.72386 7.5 7 7.5V7ZM10.0625 7.5C10.3386 7.5 10.5625 7.27614 10.5625 7C10.5625 6.72386 10.3386 6.5 10.0625 6.5V7.5ZM12.25 7H11.75C11.75 9.62335 9.62335 11.75 7 11.75V12.25V12.75C10.1756 12.75 12.75 10.1756 12.75 7H12.25ZM7 12.25V11.75C4.37665 11.75 2.25 9.62335 2.25 7H1.75H1.25C1.25 10.1756 3.82436 12.75 7 12.75V12.25ZM1.75 7H2.25C2.25 4.37665 4.37665 2.25 7 2.25V1.75V1.25C3.82436 1.25 1.25 3.82436 1.25 7H1.75ZM7 1.75V2.25C9.62335 2.25 11.75 4.37665 11.75 7H12.25H12.75C12.75 3.82436 10.1756 1.25 7 1.25V1.75ZM7 3.9375H6.5V7H7H7.5V3.9375H7ZM7 7V7.5H10.0625V7V6.5H7V7Z"
        fill={color}
      />
    </Svg>
  );
};

export default ClockIcon;
