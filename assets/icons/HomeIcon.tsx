import * as React from "react"
import Svg, { Circle, SvgProps } from "react-native-svg"
export const HomeIcon:React.FC<SvgProps> = (props) => {
    return(
        <Svg
        //   xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
          {...props}
        >
          <Circle cx={13} cy={3} r={3} fill="#827D88" />
          <Circle cx={13} cy={13} r={3} fill="#827D88" />
          <Circle cx={3} cy={13} r={3} fill="#827D88" />
          <Circle cx={3} cy={3} r={3} fill="#827D88" />
        </Svg>
      )
}
