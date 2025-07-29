import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EyeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({
  width = 16,
  height = 17,
  color = '#121212',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
    >
      <Path
        d="M3 3.00015L13 14.0002M9.68169 10.35C9.19107 10.796 8.5434 11.0287 7.88114 10.9972C7.21889 10.9656 6.59629 10.6723 6.1503 10.1817C5.70432 9.69111 5.47147 9.04346 5.50297 8.3812C5.53448 7.71894 5.82776 7.09632 6.31831 6.65029M4.62465 4.78725C2.07657 6.0776 1 8.50015 1 8.50015C1 8.50015 3 12.9997 8 12.9997C9.1715 13.009 10.3284 12.7392 11.3748 12.2125M13.0381 11.0689C14.4007 9.84841 15 8.50015 15 8.50015C15 8.50015 13 3.99966 8 3.99966C7.56695 3.99896 7.13459 4.03416 6.70736 4.10492M8.47046 6.04439C9.00182 6.14642 9.48577 6.41799 9.84973 6.81835C10.2137 7.21871 10.438 7.72628 10.4891 8.26494"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EyeIcon;
