import * as React from "react"
import { IArrowProps } from "../../interfaces";



export const Arrow: React.FC<IArrowProps> = ({width, height, direction }) => {
  return (<>
    {
      direction === 'right' 
      && 
      <svg width={width} height={height} viewBox="0 0 22 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.88705 0.858778C3.1641 0.114747 1.96945 0.114747 1.2465 0.858778C0.552359 1.57317 0.552357 2.7101 1.2465 3.42449L16.5279 19.1516C16.7164 19.3456 16.7164 19.6544 16.5279 19.8484L1.2465 35.5755C0.552359 36.2899 0.552359 37.4268 1.2465 38.1412C1.96945 38.8853 3.1641 38.8853 3.88705 38.1412L21.3229 20.1969C21.6999 19.8088 21.6999 19.1912 21.3229 18.8031L3.88705 0.858778Z" fill="url(#paint0_linear_414_2064)"/>
          <defs>
          <linearGradient id="paint0_linear_414_2064" x1="11" y1="-0.5" x2="11" y2="39.5" gradientUnits="userSpaceOnUse">
          <stop stopColor={"var(--themePrimary)"} />
          <stop offset="1" stopColor={"var(--themeDark)"}/>
          </linearGradient>
        </defs>
      </svg>
    }
    {
      direction === "left" 
      && 
      <svg width={width} height={height} viewBox="0 0 22 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.113 0.858778C18.8359 0.114747 20.0306 0.114747 20.7535 0.858778C21.4476 1.57317 21.4476 2.7101 20.7535 3.42449L5.47211 19.1516C5.28358 19.3456 5.28357 19.6544 5.47211 19.8484L20.7535 35.5755C21.4476 36.2899 21.4476 37.4268 20.7535 38.1412C20.0306 38.8853 18.8359 38.8853 18.113 38.1412L0.677123 20.1969C0.300051 19.8088 0.300051 19.1912 0.677123 18.8031L18.113 0.858778Z"
          fill="url(#paint0_linear_440_1345)"
        />
        <defs>
          <linearGradient id="paint0_linear_440_1345" x1="11" y1="-0.5" x2="11" y2="39.5" gradientUnits="userSpaceOnUse">
            <stop stopColor={"var(--themePrimary)"} />
            <stop offset="1" stopColor={"var(--themeDark)"} />
          </linearGradient>
        </defs>
      </svg>
    }
  </>)

};