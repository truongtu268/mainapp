import styled from 'styled-components'
import {
  primaryColor,
  primaryText,
  white,
  paddingDefault,
  contentMaxWidth,
  bgGrayColor,
} from './common'

export const FeedbackPage = styled.div`
  position: relative;

  .ant-tabs-nav-animated:last-child {
    margin: 0 auto;
    float: none;
    display: table;
  }

  .feedback {
    &__body {
      padding: 0 ${paddingDefault}px;
      max-width: ${contentMaxWidth};
      margin: 0 auto;
    }
  }
`
