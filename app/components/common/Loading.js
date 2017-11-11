import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading = () => {
  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  )
}

export default Loading
