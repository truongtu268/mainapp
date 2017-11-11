import styled, { keyframes } from 'styled-components'

export const primaryColor = 'rgba(3, 155, 229, 1)'
export const secondColor = 'rgba(185, 185, 185, 1)'
export const bgGrayColor = '#E9EFF2'
export const thirdColor = 'rgba(132, 139, 148, 1)'
export const primaryText = 'rgba(28, 28, 28, 1)'
export const botBgColor = 'rgba(195, 232, 253, 1)'

export const white = 'rgba(255, 255, 255, 1)'
export const black10 = 'rgba(0, 0, 0, 0.1)'
export const black5 = 'rgba(0, 0, 0, 0.05)'
export const green = 'rgba(0, 255, 0, 0.3)'

export const paddingDefault = 15
export const contentMaxWidth = '920px'

// scale to 1
export const scale = keyframes`
  100% {
    transform: scale(1);
  }
`

// scale to 1.05
export const scale105 = keyframes`
  50% {
    transform: scale(1.05);
  }
`

// blink effect
export const blink = keyframes`
  50% {
    opacity: 0.5;
  }
`

// Title on top of every pages
export const PageTitle = styled.h2`
`
