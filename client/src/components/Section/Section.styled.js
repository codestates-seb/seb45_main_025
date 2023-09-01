import styled from 'styled-components';

export const SectionContainer = styled.div`
  position: relative;
  margin-bottom: 50px;

  .target {
    height: 150px;
    margin-top: 225px;
    color: white;
  }

  .loader {
    width: 64px;
    height: 64px;
    border: 5px solid lightgray;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin: 0 auto;
    margin-top: 100px;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    justify-content: space-between;

    .search__error {
      display: flex;
      width: 100%;
      font-size: var(--large-text-size);
      font-weight: bold;
      line-height: var(--large-text-line-height);
      justify-content: center;
      align-items: center;
    }

    .my-logs__card {
      position: relative;
      width: calc((100vw - 228px) / 5);
      cursor: pointer;

      .meta__snack-image {
        margin-bottom: var(--spacing-5);
        width: calc((100vw - 228px) / 4);
        height: calc((100vw - 228px) / 4);
        border-radius: 5px;
      }

      .meta_title {
        margin-bottom: var(--spacing-1);
        font-size: var(--large-text-size);
        line-height: var(--large-text-line-height);
        font-weight: 600;
      }

      .meta_content {
        margin-bottom: 2px;
        color: var(--light);

        svg {
          padding-top: 5px;
          margin-right: 5px;
        }

        span {
          display: inline-block;
          margin-right: 10px;
        }
      }

      .meta_likes {
        position: absolute;
        top: var(--spacing-3);
        right: var(--spacing-3);
        height: 24px;
        width: 24px;
        cursor: pointer;

        svg path {
          color: rgba(15, 15, 15, 0.25);
          stroke-width: 1.5;
          stroke: var(--white);
        }

        /* &:hover {
          svg path {
            color: rgba(202, 53, 53, 0.25);
            stroke-width: 1.5;
            stroke: var(--red-light-1);
          }
        } */

        &.likes {
          svg path {
            color: var(--red);
            stroke: var(--red);
          }
        }
      }

      .meta_profile {
        margin-top: var(--spacing-2);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);

        .profile__image {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        > span {
          color: var(--dark-gray-3);
        }
      }
    }
  }
`;