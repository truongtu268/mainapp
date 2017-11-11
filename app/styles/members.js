import styled from 'styled-components'
import {
  primaryColor,
  primaryText,
  white,
  paddingDefault,
  contentMaxWidth,
  bgGrayColor,
} from './common'

export const ListMember = styled.div`
  text-align: center;
  .members {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 20px 0;
    padding: 10px;

    &__item {
      position: relative;
      display: flex;
      flex: 0 0 25%;
      max-width: 25%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      user-select: none;
      border-radius: 3px;
      border: 1px solid transparent;
      box-shadow: none;
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 4px 20px 0 rgba(168, 182, 191, 0.3);
        .members__item__triggericon {
          transition: all 0.7s ease-in-out;
          opacity: 1;
        }
      }

      &__triggericon {
        position: absolute;
        top: 0;
        right: 5px;
        opacity: 0;
        transition: all 0.4s ease-in-out;
        transform-origin: 50%;
        font-size: 20px;
      }

      &__name {
        margin-top: 5px;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        user-select: initial;
      }
      &__role {
        line-height: initial;
        height: initial;
        padding: 0 8px;
        margin: 0;
      }
    }
  }

  .group {
    display: flex;
    padding-left: 80px;
    font-size: 30px;
  }

  .avatarWrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid rgba(245, 245, 245, 1);
    background: rgba(255, 255, 255, 1);
  }

  .avatar {
    max-width: 100%;
  }

  .avatarInactive {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    filter: grayscale(1) opacity(0.3);
  }

  @media screen and (max-width: 800px) {
    .members {
      &__item {
        flex-basis: 50%;
        max-width: 50%;
      }
    }
  }

  @media screen and (max-width: 420px) {
    .members {
      &__item {
        flex-basis: 100%;
        max-width: 100%;
      }
    }
  }
`
