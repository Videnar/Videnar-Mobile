import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

function MoreIcon({ size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0)" filter="url(#filter0_d)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 40C35 40 44 31 44 20C44 9 35 0 24 0C13 0 4 9 4 20C4 31 13 40 24 40ZM24 120C13 120 4 129 4 140C4 151 13 160 24 160C35 160 44 151 44 140C44 129 35 120 24 120Z"
          fill="black"
        />
        <Circle cx="24" cy="80" r="20" fill="#00C569" />
      </G>
    </Svg>
  );
}

export default MoreIcon;
