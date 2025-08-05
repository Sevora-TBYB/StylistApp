import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface WalletTabIconProps {
  color?: string;
  size?: number;
}

const WalletTabIcon: React.FC<WalletTabIconProps> = ({ color = '#737378', size = 18 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M2.8125 4.5V13.5C2.8125 13.7984 2.93103 14.0845 3.142 14.2955C3.35298 14.5065 3.63913 14.625 3.9375 14.625H15.1875C15.3367 14.625 15.4798 14.5657 15.5852 14.4602C15.6907 14.3548 15.75 14.2117 15.75 14.0625V6.1875C15.75 6.03832 15.6907 5.89524 15.5852 5.78975C15.4798 5.68426 15.3367 5.625 15.1875 5.625H3.9375C3.63913 5.625 3.35298 5.50647 3.142 5.29549C2.93103 5.08452 2.8125 4.79837 2.8125 4.5ZM2.8125 4.5C2.8125 4.20163 2.93103 3.91548 3.142 3.7045C3.35298 3.49353 3.63913 3.375 3.9375 3.375H13.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.6562 10.9688C13.1222 10.9688 13.5 10.591 13.5 10.125C13.5 9.65901 13.1222 9.28125 12.6562 9.28125C12.1903 9.28125 11.8125 9.65901 11.8125 10.125C11.8125 10.591 12.1903 10.9688 12.6562 10.9688Z"
        fill={color}
      />
    </Svg>
  );
};

export default WalletTabIcon;
