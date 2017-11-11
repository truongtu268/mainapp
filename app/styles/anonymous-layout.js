import styled, { keyframes } from 'styled-components'
import { Input } from 'antd'

export const AnswerHighLight = styled.div`
  box-sizing: border-box;
  color: rgba(13, 177, 218, 1);
  display: inline;
  margin: 0;
  font-size: 14px;
  cursor: pointer;
`

export const TagName = styled.div`
  box-sizing: border-box;
  background-color: rgba(40, 130, 199, 1);
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  letter-spacing: 0.5px;
`

export const FileBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

export const FileLabel = styled.label`
  position: absolute;
  top: 8px;
  right: 0;
  display: block;
  margin-right: 10px;
  font-size: 15px;
  color: rgba(29, 51, 68, 1);
  white-space: nowrap;
  cursor: pointer;
`


