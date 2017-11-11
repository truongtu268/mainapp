import styled, { css } from 'styled-components'

export const Row = styled.div`
  margin: 10px 0 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  ${(props) => (props.lastRow && css`
    padding-bottom: 0;
    border-bottom: none;
  `)}

  img {
    max-width: 100%;
  }
`

export const FeedbackList = styled.div`
  margin-top: 16px;
`

export const FeedbackBlock = styled.div`
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 11px 0px 9px;
  cursor: pointer;
  word-break: break-word;
  text-overflow: ellipsis;
  color: rgba(17, 33, 46, 1);
  font-size: 14px;

  &:hover {
    background: rgba(245, 248, 249, 1);
    color: rgba(17, 33, 46, 1);
  }

  .feedback {
    &__col {
      &:nth-child(1) {
        flex: 0 0 70%;
      }
      &:nth-child(2) {
        flex: 0 0 30%;
        text-align: right;
      }
    }

    &__img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    &__stats {
      display: inline-block;
      margin-left: 15px;
      color: rgba(0, 0, 0, 0.4);
    }

    &__date {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  @media screen and (max-width: 640px) {
    padding: 5px 0;
    flex-wrap: wrap;

    .feedback {
      &__col {
        &:nth-child(1) {
          flex: 1 1 13%;
          margin-right: 0;
        }

        &:nth-child(2) {
        }

        &:nth-child(3) {
          flex: 1 1 100%;
          padding-left: 13%;
        }
      }

      &__img {
        width: 30px;
        height: 30px;
      }
    }
  }
`

export const FeedbackCate = styled.span`
  display: inline-block;
  margin-right: 5px;
  padding: 0 8px;
  border: 1px solid rgba(0, 140, 236, 1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  color: rgba(0, 140, 236, 1);
  text-transform: capitalize;

  &:last-child {
    text-transform: initial;
  }
`

export const FeedbackName = styled.span`
  color: rgba(0, 140, 236, 1);
  font-weight: 500;
`

export const FeedbackView = styled.div`
  font-size: 16px;
  margin: 3px 0;
`

export const FilterBlock = styled.div`
  margin: 10px 50px 0 0;
`

export const Filter = styled.div`
  display: flex;
  flex-direction: row;

  .feedback__cate-title {
    display: inline-block;
    margin-right: 12px;
  }
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  .tab {
    &__col {
      margin-right: 15px;
    }

    &__img {
      width: 28x;
      height: 28px;
      margin-top: 2px;
    }

    &__number {
      font-size: 28px;
      color: rgba(0, 0, 0, 1);
      line-height: 0.9;
    }

    &__text {
      font-size: 12px;
      color: rgba(147, 147, 147, 1);
    }
  }

  @media screen and (max-width: 640px) {
    .tab {
      &__img {
        display: none;
      }

      &__number {
        font-size: 20px;
      }
    }
  }
`

export const NewsFeedItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const NewsFeedName = styled.span`
  display: inline-block;

  i, span {
    color: #0088CC;
  }
`

export const NewsFeedTime = styled.span`
  color: rgba(0, 0, 0, 0.4);
  display: inline-block;
  font-size: 12px;
`

export const NewsFeedEmpty = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  justify-content: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  text-align: center;
`

export const Chart = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`

