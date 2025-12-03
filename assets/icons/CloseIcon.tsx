import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CloseIcon:React.FC<SvgProps> = (props) => {
    const {width=30,height=30}=props;
    return(
        (
            <Svg
            //   xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              fill="none"
              {...props}
            >
              <Path
                stroke="#202C43"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m7.5 7.5 15 15M7.5 22.5l15-15"
              />
            </Svg>
          )
    )
}
