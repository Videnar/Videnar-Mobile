import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function ReportIcon({ size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 140 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M69.7778 108.778C65.4822 108.778 62 105.296 62 101C62 96.7044 65.4822 93.2222 69.7778 93.2222C74.0733 93.2222 77.5556 96.7044 77.5556 101C77.5556 105.296 74.0733 108.778 69.7778 108.778ZM62 31H77.5556V85.4444H62V31Z"
          fill="#FFB26B"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.0111 0L140 40.9889V99.0111L99.0111 140H40.9889L0 99.0111V40.9889L40.9889 0H99.0111ZM124.444 92.5555V47.4444L92.5555 15.5556H47.4444L15.5556 47.4444V92.5555L47.4444 124.444H92.5555L124.444 92.5555Z"
          fill="black"
        />
      </G>
    </Svg>
  );
}

export default ReportIcon;
