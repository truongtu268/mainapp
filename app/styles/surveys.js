import styled from 'styled-components'
import {
  primaryColor,
  primaryText,
  white,
  paddingDefault,
  contentMaxWidth,
  bgGrayColor,
} from './common'
import emptySurvey from '../images/empty_survey.png'

const surveyItemWidth = '130px'

export const SurveysSection = styled.div`
  position: relative;

  .page_title {
    max-width: ${contentMaxWidth};
    margin: 0 auto;
    margin-bottom: ${paddingDefault}px;
    font-size: 1.5em;
    font-weight: bold;
  }

  .sub_section {
    width: 100%;
    clear: both;
    max-width: ${contentMaxWidth};
    margin: 0 auto;
    padding: 0 ${paddingDefault}px;
    &__title {
      font-size: 16px;
      margin: 1.6em 0 .6em;
    }
  }

  .templates {

    &__icons {
      background-size: cover;
      width: 50px;
      height: 50px;
    }

    &__empty {
     background: url(${emptySurvey}) no-repeat 0 0;
     background-size: cover;
     width: 120px;
     height: 120px;
     background-position: center;
     margin: 0 auto;
    }

    &__surveyTemplate {
      max-width: 940px;
      margin: 30px auto;
      text-align: center;
    }

    &__surveyStatus {
      font-size: 24px;
      color: ${primaryText};
      margin-top: 10px;
      text-align: center;
    }

    &__name {
      font-size: 12px;
      line-height: 18px;
      font-weight: bold;
      color: #FFF;
    }

    &__wrapper {
      color: ${white};
      background: #223444;
    }

    &__content {
      max-width: 940px;
      margin: 0 auto;
      padding: ${paddingDefault}px;
    }

    &__title {
      font-size: 15px;
      font-weight: bold;
      color: ${white};
      margin-bottom: ${paddingDefault}px;
    }

    &__list {
      display: flex;
      margin-left: -10px;
      margin-right: -10px;
      justify-content: flex-start;
    }

    &__item {
      width: ${surveyItemWidth};
      min-width: ${surveyItemWidth};
      flex: 1 1 0;
      vertical-align: top;
      text-align: center;
      cursor: pointer;
      margin: 0 10px;
    }

    &__photo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 105px;
      margin-bottom: 5px;
      border-radius: 5px;
      background: ${white};
      color: ${primaryColor};
      text-align: center;
      line-height: 105px;
    }
  }

  .my_surveys {
    &__list {
    }

    &__item {
      width: 100%;
      margin-bottom: ${paddingDefault}px;
      &__body {
        padding: ${paddingDefault}px;
        cursor: pointer;
        background-color: ${bgGrayColor};
      }
      &__title {
        font-weight: bold;
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
      }
      &__footer {
        &__actions {
          width: 100%;
          border-top: 1px solid #EEE;
        }
        &__action {
          width: 33.33333%;
          border-radius: 0 !important;
          border-top: none;
          border-bottom: none;
          &.single {
            width: 100%;
          }
          &:hover {
            background-color: ${primaryColor};
            color: white;
          }
          &:first-child {
            border-left: none;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
`
export const SurveyEditPage = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 ${paddingDefault}px;
  max-width: 940px;

  .page_title {
    padding: 0 ${paddingDefault}px;
    font-size: 18px;
    font-weight: bold;
    outline: none;
  }

  .steps {
    margin-bottom: ${paddingDefault * 2}px;
  }
  .step1 {
    &__questions {
      &__item {
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        display: inline-block;
        width: 100%;
        position: relative;
        padding: ${paddingDefault}px;
        margin-bottom: ${paddingDefault * 2}px;
        transition: all .2s;
        &.active {
          border: 1px solid ${primaryColor};
          outline: none;
        }
        &__content {
          font-weight: bold;
          font-size: 1.2em;
        }
        .ant-form-item:last-child {
          margin-bottom: 0;
        }
        &__scale {
          &__spacer {
            text-align: center;
            width: 10% !important;
            pointer-events: none;
            background-color: #fff;
          }
          &__label {
            pointer-events: none;
            width: 30% !important;
            text-align: left;
          }
          &__inputone , &__inputtwo {
            width: 28% !important;
          }
          &__top {
            .ant-input, .ant-select-selection {
              border-bottom: 0;
              border-bottom-right-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
            }
          }
          &__bottom {
            .ant-input, .ant-select-selection {
              border-top-right-radius: 0 !important;
              border-top-left-radius: 0 !important;
              margin-top: -7px;
            }
          }
        }
        &__actions {
          text-align: right;
          &__item {
            margin-left: ${paddingDefault}px;
            color: #666;
            border: 0;
            &:hover {
              color: #333;
              background-color: #DCDCDC;
            }
          }
        }
      }
      &__add {
        margin-top: ${paddingDefault}px;
        &__btn {
          width: 100%;
          margin-top: ${paddingDefault}px;
        }
      }
      &__answers {
        .ant-input-group-wrapper {
          width: 100%;
          margin-bottom: ${paddingDefault}px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    &__preview {
      &__title {
        line-height: initial;
        margin-top: 7px;
        text-align: center;
        &__helper {
          font-size: 12px;
          color: #777;
          font-weight: 300;
        }
      }
    }
  }
  .step2 {
    &__selectItem {
      margin-bottom: ${paddingDefault}px;
      display: flex;
      .ant-checkbox-wrapper, .ant-radio-wrapper {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
        height: 36px;
        border-radius: 18px;
        &.selected {
          border: solid 1px ${primaryColor};
          background-color: ${primaryColor};
          color: ${white};
        }
      }
    }

    &__receiverAvatar {
      vertical-align: middle;
    }

    &__day {
      margin: 0 10px 0 0;
    }


    &__button {
      display: flex;
      justify-content: flex-end;
    }

    &__selectForm {
      display: flex;
    }
  }
  .footer {
    text-align: right;
    &__btn {
      margin-left: ${paddingDefault}px;
    }
  }
`
