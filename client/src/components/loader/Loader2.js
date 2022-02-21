import React from 'react'
import styled, { keyframes} from 'styled-components'

const anim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoaderC = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80px;

  div{
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 44px;
    height: 44px;
    margin: 8px;
    border: 5px solid #766969;
    border-radius: 50%;
    animation: ${anim} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #766969 transparent transparent transparent;

    &:nth-child(1){
      animation-delay: -0.45s;
    }
    &:nth-child(1){
      animation-delay: -0.3s;
    }
    &:nth-child(1){
      animation-delay: -0.15s;
    }
  }
`

const Loader2 = () => {
  return <LoaderC><div></div><div></div><div></div></LoaderC>
}

export default Loader2