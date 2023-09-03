import styled from 'styled-components';
import { COLOR } from '../../constants';

export const DropdownWrapper = styled.div`
  display: none;
  width: 100%;
  padding: 0 15px;
  position: absolute;
  left: 0;
  z-index: 1;
  line-height: 1.4375;

  &.visible {
    display: block;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    padding: 0 40px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    padding: 0;
  }
`;

export const DropdownMenu = styled.ul`
  width: 100%;
  padding: 4px;
  border: 1px solid ${COLOR.subFontColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    width: 1120px;
    margin: 0 auto;
  }
`;

export const Item = styled.li`
  padding: 3px 11px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.themeStyle.searchBarColor};
    cursor: pointer;
  }
`;

export const NotFoundMessage = styled.div`
  padding: 3px 11px;
`;
