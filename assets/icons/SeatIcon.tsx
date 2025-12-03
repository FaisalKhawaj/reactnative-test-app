import * as React from "react";
import Svg, { Rect } from "react-native-svg";

type SeatIconProps = {
  color: string;
  opacity?: number;
  size?: number;
};

export const SeatIcon: React.FC<SeatIconProps> = ({
  color,
  opacity = 1,
  size = 18, // will scale the icon
}) => {
  // original svg is 7x7, scale with size
  const scale = size / 7;

  return (
    <Svg
      width={7 * scale}
      height={7 * scale}
      fill="none"
      // ⛔️ IMPORTANT: no xmlns attribute in RN
    >
      <Rect
        width={6.982 * scale}
        height={5.232 * scale}
        fill={color}
        fillOpacity={opacity}
        rx={0.978 * scale}
        transform={`matrix(-1 0 0 1 ${6.982 * scale} 0)`}
      />
      <Rect
        width={4.887 * scale}
        height={1.046 * scale}
        fill={color}
        fillOpacity={opacity}
        rx={0.523 * scale}
        transform={`matrix(-1 0 0 1 ${5.935 * scale} ${5.581 * scale})`}
      />
    </Svg>
  );
};
