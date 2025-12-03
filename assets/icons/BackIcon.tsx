
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const BackIcon:React.FC<SvgProps> = (props) =>{
  const {color}=props;
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={17}
      fill={color||"none"}
      {...props}
    >
      <Path stroke={color||"#fff"} strokeWidth={2} d="m8.914 15.707-7.5-7.5 7.5-7.5" />
    </Svg>
  )
}
