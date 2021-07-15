import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

function BackArrowIcon({ size }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 140 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0)">
        <Path
          d="M133 62.6077H7.00003C6.53932 62.6113 6.07997 62.6582 5.62803 62.7477L5.04003 62.9437C4.79014 62.9925 4.54612 63.0675 4.31203 63.1677C4.08897 63.2628 3.87366 63.3751 3.66803 63.5037C3.47331 63.5799 3.28588 63.6737 3.10803 63.7837C2.34302 64.3055 1.68683 64.9712 1.17603 65.7437L0.868027 66.2757C0.739372 66.4909 0.627056 66.7156 0.532027 66.9477C0.532027 67.1717 0.532027 67.4237 0.308027 67.6477C0.23918 67.8398 0.183059 68.0362 0.140027 68.2357C-0.0644165 69.1578 -0.0644165 70.1135 0.140027 71.0357C0.182951 71.2443 0.239064 71.4501 0.308027 71.6517C0.308027 71.8757 0.448027 72.1277 0.532027 72.3517C0.616027 72.5757 0.756027 72.7997 0.868027 73.0237L1.17603 73.5557C1.41844 73.9462 1.71017 74.3038 2.04403 74.6197L58.576 131.096C59.8944 132.373 61.6617 133.081 63.4971 133.068C65.3326 133.054 67.0894 132.321 68.3892 131.025C69.6889 129.728 70.4276 127.974 70.4461 126.138C70.4646 124.303 69.7614 122.534 68.488 121.212L23.884 76.6077H133.084C134.941 76.6077 136.721 75.8702 138.034 74.5574C139.347 73.2447 140.084 71.4642 140.084 69.6077C140.084 67.7512 139.347 65.9707 138.034 64.6579C136.721 63.3452 134.941 62.6077 133.084 62.6077H133Z"
          fill="#111111"
        />
        <Path
          d="M59.0815 2.04634L16.0583 45.0695C13.3246 47.8032 13.3246 52.2354 16.0583 54.969C18.7919 57.7027 23.2241 57.7027 25.9578 54.969L68.981 11.9458C71.7146 9.21217 71.7146 4.78001 68.981 2.04634C66.2473 -0.68733 61.8151 -0.687328 59.0815 2.04634Z"
          fill="#00C569"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="140" height="133.168" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default BackArrowIcon;