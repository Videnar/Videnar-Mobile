import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function ActivityIcon({ size, color }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M43.171 27.5518H84.2947C84.8699 42.7914 97.0824 55.032 112.273 55.639V96.8293C112.273 105.641 109.695 111.981 105.569 116.114C101.444 120.245 95.1077 122.835 86.2735 122.835H43.171C34.3335 122.835 27.9955 120.245 23.8701 116.114C19.7434 111.981 17.1652 105.641 17.1652 96.8293V53.6684C17.1652 44.8258 19.7462 38.4547 23.8777 34.3014C28.0051 30.1523 34.3411 27.5518 43.171 27.5518Z"
        stroke="black"
        strokeWidth="11"
      />
      <Path
        d="M43 90L56 72.5L72.5 80.5L88 61"
        stroke={color}
        strokeWidth="11"
      />
      <Circle cx="114.5" cy="25.5" r="14.5" fill={color} />
    </Svg>
  );
}

export default ActivityIcon;
