import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const SearchIcon:React.FC<SvgProps> = (props) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#202C43"
      fillRule="evenodd"
      d="m16.613 15.499-4.053-4.053a5.67 5.67 0 1 0-1.114 1.114l4.053 4.053 1.114-1.114Zm-4.486-7.467a4.095 4.095 0 1 1-8.19 0 4.095 4.095 0 0 1 8.19 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
