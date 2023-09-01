import styled from 'styled-components';

export const AutoCompleteContainer = styled.div`
  position: relative;
  max-width: 540px;
  flex: 1 1 0%;

  .search__input {
    min-width: 500px;

    > input {
      min-width: 100%;
    }

    .clearbtn {
      position: absolute;
      border: 2px solid black;
      top: 5px;
      right: 18px;
      font-size: var(--large-text-size);
      line-height: 18px;
      color: black;
      cursor: pointer;
      transition: color 0.1s ease-in;

      &:hover {
        color: var(--light);
      }
    }
  }
`;

export const DropDownContainer = styled.ul`
  position: absolute;
  margin-top: var(--spacing-2);
  top: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid var(--light-gray-4);
  border-radius: 3px;
  list-style: none;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 8px 12px rgba(9, 30, 66, 0.15);
  z-index: 999;

  li {
    padding: 15px 18px;
    padding-left: 38px;
    font-size: var(--large-text-size);
    line-height: 18px;
    cursor: pointer;

    &:first-child {
      border-radius: 3px 3px 0 0;
    }

    &:last-child {
      border-radius: 0 0 3px 3px;
    }

    &:hover {
      background-color: var(--light-gray-1);
    }

    &.active {
      background-color: var(--primary-blue-light-3);
      font-weight: 600;
    }
  }
`;