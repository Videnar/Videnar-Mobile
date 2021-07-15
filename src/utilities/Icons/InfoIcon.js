import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function InfoIcon({ size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 148 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0)" filter="url(#filter0_d)">
        <Path
          d="M9.5 68.6139C9.5 33.9194 38.3338 5.5 74 5.5C109.666 5.5 138.5 33.9194 138.5 68.6139C138.5 103.308 109.666 131.728 74 131.728C38.3338 131.728 9.5 103.308 9.5 68.6139Z"
          fill="white"
          stroke="black"
          strokeWidth="15"
        />
        <G filter="url(#filter1_d)">
          <Path
            d="M82.167 35.4507C82.167 39.2402 79.033 42.3121 75.167 42.3121C71.301 42.3121 68.167 39.2402 68.167 35.4507C68.167 31.6613 71.301 28.5894 75.167 28.5894C79.033 28.5894 82.167 31.6613 82.167 35.4507Z"
            fill="#29BB89"
          />
          <Path
            d="M87.125 108.638H60.875C57.6493 108.638 55.042 106.077 55.042 102.921C55.042 99.764 57.6493 97.2031 60.875 97.2031H68.167V62.8962H63.792C60.5663 62.8962 57.9579 60.3343 57.9579 57.1777C57.9579 54.0221 60.5663 51.4602 63.792 51.4602H74C77.2257 51.4602 79.8329 54.0221 79.8329 57.1777V97.2031H87.125C90.3507 97.2031 92.9579 99.764 92.9579 102.921C92.9579 106.077 90.3507 108.638 87.125 108.638V108.638Z"
            fill="black"
          />
        </G>
      </G>
    </Svg>
  );
}

export default InfoIcon;
