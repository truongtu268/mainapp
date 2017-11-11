import styled from 'styled-components'
import {
  primaryColor,
  primaryText,
  white,
  paddingDefault,
  contentMaxWidth,
  bgGrayColor,
} from './common'

export const UserProfile = styled.div`
  .profile {
    &__info {
      display: flex;
      justify-content: center;
    }

    &__infoHeader {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__icon {
      position: relative;
      overflow: hidden;
      border: 1px solid #E4EAEF;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      background-color: #E8E8E8;
      text-align: center;
      font-size: 60px;
    }

    &__avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      &__inactive {
        filter: grayscale(1) opacity(0&__3);
      }
    }

    &__infoRow {
      margin: 10px 0;
    }

    &__infoRowLabel {
      color: #49A9EE;
    }

    &__buttonCenter {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 20px;
      button {
        width: 140px;
        margin-right: ${paddingDefault}px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`
