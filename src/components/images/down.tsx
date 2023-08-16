import React from 'react';

type SVGImage = {
  strokeColor?: string;
  fillColor?: string;
  size?: string;
} & React.ComponentProps<'svg'>;

const Down = ({
  width = 1792,
  height = 1792,
  strokeColor = 'currentColor',
  ...props
}: SVGImage) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 1792 1792"
    fill="none"
    {...props}
    id="caret"
  >
    <path
      d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19L403 749q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"
      fill="#ffffff"
      className="color000000 svgShape"
    ></path>
  </svg>
);

export default Down;
