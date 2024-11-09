import Svg, { Path } from 'react-native-svg';

export const ClockSVG = ({width = 18, height = 18, color = '#747268'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 4.5V9L12 10.5"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const CarIcon = ({ width = 32, height = 32, fill = '#fff', stroke = '#fff' }) => (
  <svg 
    fill={fill} 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    width={width} 
    height={height} 
    viewBox="0 0 31.445 31.445" 
    stroke={stroke}
  >
    <g>
      <path d="M7.592,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.768,0,3.203-1.434,3.203-3.204 S9.36,16.86,7.592,16.86z M7.592,21.032c-0.532,0-0.968-0.434-0.968-0.967s0.436-0.967,0.968-0.967 c0.531,0,0.966,0.434,0.966,0.967S8.124,21.032,7.592,21.032z"/>
      <path d="M30.915,17.439l-0.524-4.262c-0.103-0.818-0.818-1.418-1.643-1.373L27.6,11.868l-3.564-3.211 c-0.344-0.309-0.787-0.479-1.249-0.479l-7.241-0.001c-1.625,0-3.201,0.555-4.468,1.573l-4.04,3.246l-5.433,1.358 c-0.698,0.174-1.188,0.802-1.188,1.521v1.566C0.187,17.44,0,17.626,0,17.856v2.071c0,0.295,0.239,0.534,0.534,0.534h3.067 c-0.013-0.133-0.04-0.26-0.04-0.396c0-2.227,1.804-4.029,4.03-4.029s4.029,1.802,4.029,4.029c0,0.137-0.028,0.264-0.041,0.396 h8.493c-0.012-0.133-0.039-0.26-0.039-0.396c0-2.227,1.804-4.029,4.029-4.029c2.227,0,4.028,1.802,4.028,4.029 c0,0.137-0.026,0.264-0.04,0.396h2.861c0.295,0,0.533-0.239,0.533-0.534v-1.953C31.449,17.68,31.21,17.439,30.915,17.439z M20.168,12.202l-10.102,0.511L12,11.158c1.051-0.845,2.357-1.305,3.706-1.305h4.462V12.202z M21.846,12.117V9.854h0.657 c0.228,0,0.447,0.084,0.616,0.237l2.062,1.856L21.846,12.117z"/>
      <path d="M24.064,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.769,0,3.203-1.434,3.203-3.204 S25.833,16.86,24.064,16.86z M24.064,21.032c-0.533,0-0.967-0.434-0.967-0.967s0.434-0.967,0.967-0.967 c0.531,0,0.967,0.434,0.967,0.967S24.596,21.032,24.064,21.032z"/>
    </g>
  </svg>
);

export const PinSVG = ({width = 25, height = 29, color = 'white'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 25 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M24 12.0455C24 20.6364 12.5 28 12.5 28C12.5 28 1 20.6364 1 12.0455C1 9.11602 2.2116 6.30656 4.36827 4.23514C6.52494 2.16371 9.45001 1 12.5 1C15.55 1 18.4751 2.16371 20.6317 4.23514C22.7884 6.30656 24 9.11602 24 12.0455Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 15.7273C14.6171 15.7273 16.3334 14.0789 16.3334 12.0455C16.3334 10.0121 14.6171 8.36365 12.5 8.36365C10.3829 8.36365 8.66669 10.0121 8.66669 12.0455C8.66669 14.0789 10.3829 15.7273 12.5 15.7273Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MapSVG = ({width = 17, height = 20, color = '##747268'}) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.875 5.25V19.25L7 15.75L14 19.25L20.125 15.75V1.75L14 5.25L7 1.75L0.875 5.25Z"
      fill={color}
    />
  </Svg>
);

export const TargetSVG = ({width = 21, height = 20, color = '#747268'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M9.34089 18.3333C14.1176 18.3333 17.9899 14.6024 17.9899 9.99999C17.9899 5.39762 14.1176 1.66666 9.34089 1.66666C4.56418 1.66666 0.691895 5.39762 0.691895 9.99999C0.691895 14.6024 4.56418 18.3333 9.34089 18.3333Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.9899 10H14.5303"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.15149 10H0.691895"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.34088 4.99999V1.66666"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.34088 18.3333V15"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
