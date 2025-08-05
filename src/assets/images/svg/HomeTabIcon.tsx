import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeTabIconProps {
  color?: string;
  size?: number;
}

const HomeTabIcon: React.FC<HomeTabIconProps> = ({ color = '#121212', size = 18 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M2.8125 6.1875H15.1875M12.375 1.6875V3.9375M5.625 1.6875V3.9375M3.375 2.8125H14.625C14.9357 2.8125 15.1875 3.06434 15.1875 3.375V14.625C15.1875 14.9357 14.9357 15.1875 14.625 15.1875H3.375C3.06434 15.1875 2.8125 14.9357 2.8125 14.625V3.375C2.8125 3.06434 3.06434 2.8125 3.375 2.8125Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeTabIcon;
