import styled, { keyframes } from 'styled-components'
import { Input, Button } from 'antd'
import {
  primaryColor,
  secondColor,
  thirdColor,
  primaryText,
  botBgColor,
  white,
  black10,
  black5,
  scale,
  scale105,
  blink,
} from './common'

export const bounce = keyframes`
  40% {
    transform: translateY(-4px);
  }
`

export const flash = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0.3;
  }
`

export const Round = styled.span`
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 0 2px;
  border-radius: 50%;
  background-color: rgba(29, 51, 68, 1);
  opacity: 0.3;
  animation: ${blink} 1s linear infinite ${props => (props.order ? `${props.order * 0.3333}s` : '0s')},
             ${bounce} 1s ease-in-out infinite ${props => (props.order ? `${props.order * 0.2222}s` : '0s')};
`

export const BotPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${white};
  z-index: 99;
`

export const BotFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 640px;
  margin: 0 auto;
  will-change: transform;
  overflow: hidden;
`

export const ChatBoxWrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  overflow: hidden;

  @media screen and (max-width: 640px) {
    margin: 0 10px;
  }
`

export const ChatBox = styled.div`
  margin-top: auto;
  position: relative;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Chat = styled.div`
  display: block;
  padding: 5px 0 15px;
  text-align: ${props => (props.isUser && 'right')};
  will-change: transform;
  animation: ${scale} 0.3s ease-in-out forwards;
  transform: scale(0);
  transform-origin: ${props => (props.isUser ? 'bottom right' : 'bottom left')};

  .chat__photo {
    display: inline-block;
    vertical-align: top;
    position: relative;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 224, 130, 1);

    img {
      max-width: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -45%);
    }
  }

  @media screen and (max-width: 640px) {
    .chat__photo {
      height: 30px;
      width: 30px;
    }
  }
`

export const ChatBubble = styled.div`
  display: inline-block;
  vertical-align: middle;
  border-radius: 5px;
  font-size: 14px;
  color: ${props => (props.isUser ? white : primaryText)};
  background: ${props => (props.isUser ? primaryColor : 'rgba(241, 242, 243, 1)')};
  padding: 8px 12px 7px;
  margin: 0 12px;
  max-width: 65%;
  word-break: break-word;
  line-height: 20px;
  text-align: left;
  overflow: hidden;

  img {
    height: 16px;
    width: auto;
    display: inline-block;
    margin-right: 4px;
  }
`

export const ChatStart = ChatBubble.extend`
  padding: 8px 12px 0;

  .chat__options {
    margin: 10px -11px 0;

    li {
      text-align: center;
      line-height: 32px;
      height: 32px;
      background: ${white};
      border-bottom: 1px solid rgba(241, 242, 243, 1);

      button {
        outline: none;
        box-shadow: none;
        color: ${primaryColor};
        display: block;
        width: 100%;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      &:last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
`

export const ChatBubbleIndicator = ChatBubble.extend`
  transform-origin: 50%;
  animation: ${scale105} 2s linear infinite;
`

// Footer: Input + Send Button
export const Footer = styled.div`
  width: 100%;
  background: ${white};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 0 0 auto;
  margin: 20px auto 0;
  padding: 0;
  border-top: 1px solid ${primaryColor};

  .ant-radio-button-wrapper {
    margin: 0 4px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    transition: none;
    height: auto;
    min-width: 100px;
    text-align: center;
    display: inline-block;
    will-change: opacity;

    img {
      display: block;
      height: 16px;
      width: auto;
      margin: 4px auto -3px;
    }
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    content: none;
  }

  .ant-radio-button-wrapper-checked {
    animation: ${flash} 1s;
    transform-origin: center bottom;
  }

  .ant-radio-button-wrapper-checked,
  .ant-radio-button-wrapper-checked:hover {
    box-shadow: none;
    border: 1px solid ${primaryColor};
    background: ${primaryColor};
    color: ${white};
  }

  .ant-radio-button-wrapper:first-child,
  .ant-radio-button-wrapper:last-child {
    border-radius: 4px;
  }

  .ant-radio-button-wrapper:before {
    content: none;
  }

  .perkfec-radio {
    overflow-y: scroll;
    white-space: nowrap;
    
    ::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (max-width: 640px) {
    padding: 0 10px;
  }
`

export const AnswerContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 90%;
  margin: 24px 0;
  font-size: 14px;
  overflow-y: scroll;

  .icon-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%; 
    padding: 0px 20px;
  }

  .perkfec-slider {
    flex: 1;
    margin: 0 8px;
    text-align: center;

    &:nth-child(2) {
      flex: 16;
    }
  }

  .ant-input, .ant-input:focus, .ant-input:hover {
    padding: 0;
    border-color: transparent;
    box-shadow: none;
    font-size: 14px;
  }

  .ant-input[disabled], .ant-input[disabled]:hover {
    border-color: transparent;
    background: ${white};
  }

  @media screen and (max-width: 640px) {
    flex: ${(props) => {
      switch (props.type) {
        case 5: return '1 1 100%';
        default: return '1 1 80%';
      }
    }};
    margin: 10px 0;
  }
`

// Re-style ant's Input
export const AntInput = styled(Input)`
  width: 100%;
  padding-right: 0;
  font-size: 14px;
  border: none;
  resize: none;
  outline: none;
`

export const SendButton = styled.button`
  flex: 1;
  border: none;
  border-radius: 0;
  background: ${white};
  box-shadow: none;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 5px 0 5px 15px;
  height: auto;
  cursor: pointer;
  color: ${primaryColor};

  svg {
    fill: ${primaryColor}
  }

  &[disabled] svg {
    fill: ${secondColor}
  }
`

export const Options = styled.div`
  width: 100%;
  background: ${white};
  will-change: height;
  overflow-y: scroll;
  box-sizing: border-box;

  .ant-checkbox-wrapper {
    cursor: pointer;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    padding: 4px 25px 4px 2px;
    margin: 0 4px 8px 0;

    img {
      display: inline-block;
      height: 16px;
      width: auto;
      margin-right: 4px;
    }
  }

  .ant-checkbox-group-item {
    width: 130px;
    margin: 2px 0;
  }

  .ant-checkbox {
    position: absolute;
    right: 2px;
  }

  .ant-checkbox-inner,
  .ant-checkbox-checked .ant-checkbox-inner {
    background: transparent;
    border: transparent;
  }

  .ant-checkbox + span {
    display: inline-block;
    vertical-align: top;
    width: auto;
    padding-right: 0;
    padding-left: 4px;
  }

  .ant-checkbox-checked:after {
    display: none;
  }

  .ant-checkbox-checked .ant-checkbox-inner:after {
    top: 0;
    left: 0;
    width: 7px;
    height: 12px;
    border-color: #1FBF77;
  }

  @media screen and (max-width: 640px) {
    .ant-checkbox-group-item {
      width: 100px;
    }
  }
`

export const TagName = styled.span`
  text-decoration: underline;
  color: ${white};
`

export const CloseButton = styled(Button)`
  position: fixed;
  top: 20px;
  right: 50px;  
  z-index: 999;
  border: none;

  @media screen and (max-width: 640px) {
    top: 0;
    right: 0;
  }
`
