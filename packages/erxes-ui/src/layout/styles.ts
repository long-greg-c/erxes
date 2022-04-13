import styled, { css } from 'styled-components';
import styledTS from 'styled-components-ts';
import { TabContainer } from '@erxes/ui/src/components/tabs/styles';
import { colors, dimensions, typography } from '../styles';
import { lighten } from '../styles/ecolor';
import { rgba } from '../styles/ecolor';
import { twinkling } from '../utils/animations';

const FlexContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
`;

const WhiteBoxRoot = styled.div`
  margin-bottom: ${dimensions.coreSpacing}px;
  background-color: ${colors.colorWhite};
  box-shadow: 0 0 6px 1px ${colors.shadowPrimary};
`;

const WhiteBox = styled(WhiteBoxRoot)`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const PageHeader = styled.div`
  height: ${dimensions.headerSpacing}px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 3;
  padding-left: ${dimensions.coreSpacing * 1.5}px;
`;

const Contents = styledTS<{hasBorder?: boolean}>(styled.div)`
  display: flex;
  flex: 1;
  margin-left: ${dimensions.unitSpacing}px;
  max-height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-x: auto;
  border: ${props => props.hasBorder && `1px solid ${colors.borderPrimary}`};
  border-radius: ${props => props.hasBorder && `${dimensions.unitSpacing}px`};
  margin: ${props => props.hasBorder && dimensions.unitSpacing * 2}px;

  @-moz-document url-prefix() {
    overflow: hidden;
  }
`;

const VerticalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 100%;
`;

const HeightedWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const MainHead = styled.div`
  padding: 0 ${dimensions.coreSpacing}px;
  background: ${colors.colorWhite};
  box-shadow: 0 0 6px 1px ${colors.shadowPrimary};
`;

const MainContent = styledTS<{ transparent?: boolean; center?: boolean; leftSpacing?: boolean }>(
  styled.section
)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 480px;
  box-shadow: ${props =>
    !props.transparent && `0 0 6px 1px ${colors.shadowPrimary}`};
  height: ${props => props.center && '100%'};
  margin: ${props => !props.center && '10px 10px 10px 0'};
  padding-left: ${props => props.leftSpacing && `${dimensions.coreSpacing}px`}
`;

const ContentBox = styledTS<{ transparent?: boolean; initialOverflow?: boolean}>(styled.div)`
  flex: 1;
  overflow: ${props => props.initialOverflow ? 'initial' : 'auto'};
  position: relative;
  background-color: ${props => !props.transparent && colors.colorWhite};
`;

const ContentHeader = styledTS<{ background: string; zIndex?: number }>(
  styled.div
)`
  background: ${props =>
    props.background === 'transparent' ? 'none' : colors[props.background]};
  padding: ${props =>
    props.background === 'transparent' ? 0 : `0 ${dimensions.coreSpacing}px`};
  border-bottom: 1px solid ${colors.borderPrimary};
  z-index: ${props => props.zIndex || 2};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: ${dimensions.headerSpacing}px;
`;

const ContenFooter = styled.div`
  ${ContentHeader} {
    border-bottom: none;
    border-top: 1px solid ${colors.borderPrimary};
  }
`;

const HeaderItems = styledTS<{ rightAligned?: boolean; hasFlex?: boolean }>(styled.div)`
  align-self: center;
  flex: ${props => props.hasFlex && 1};
  margin-left: ${props => props.rightAligned && 'auto'};

  > * + * {
    margin-left: ${dimensions.unitSpacing}px;
  }
`;

const SideContent = styledTS<{
  wide?: boolean;
  half?: boolean;
  full?: boolean;
  hasBorder?: boolean;
}>(styled.section)`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  width: ${props => (props.wide ? '340px' : '290px')};
  flex: ${props => (props.half ? '1' : 'none')};
  background: ${props => (props.full ? colors.colorWhite : 'none')};
  padding: ${dimensions.unitSpacing}px ${dimensions.unitSpacing}px ${
  dimensions.unitSpacing
}px 0;
  border-right: ${props => props.hasBorder && `1px solid ${colors.borderPrimary}`};
  box-shadow: ${props =>
    props.full ? `0 0 6px 1px ${colors.shadowPrimary}` : 'none'};

  ${TabContainer} {
    position: sticky;
    top: 0;
    background: ${colors.colorWhite};
  }
`;

const SidebarHeader = styledTS<{
  spaceBottom?: boolean;
  uppercase?: boolean;
  bold?: boolean;
}>(styled.div)`
  background-color: ${colors.bgLight};
  height: ${dimensions.headerSpacing}px;
  margin-bottom: ${props => props.spaceBottom && '10px'};
  align-items: center;
  padding: 0 ${dimensions.coreSpacing}px 0 ${dimensions.coreSpacing}px;
  border-bottom: 1px solid ${colors.borderPrimary};
  text-transform: ${props => props.uppercase && 'uppercase'};
  font-weight: ${props => (props.bold ? 'bold' : '500')};
  display: flex;
  font-size: ${typography.fontSizeHeading8}px;
  flex-direction: row;
  justify-content: space-between;
`;

const SidebarTitle = styledTS<{ children: any }>(
  styled(SidebarHeader.withComponent('h3'))
)`
  padding: 0 ${dimensions.coreSpacing}px;
  margin: 0;
  text-transform: uppercase;
  position: relative;
`;

const SidebarMainContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  position: relative;
`;

const SidebarFooter = styledTS<{ children: any }>(styled(SidebarHeader))`
  border-top: 1px solid ${colors.borderPrimary};
  border-bottom: none;
`;

const SidebarBox = styledTS<{
  noBackground?: boolean;
  noShadow?: boolean;
  collapsible?: boolean;
  full?: boolean;
}>(styled.div)`
  background-color: ${props => (props.noBackground ? '' : colors.colorWhite)};
  margin-bottom: ${dimensions.unitSpacing}px;
  box-shadow: ${props =>
    props.noShadow ? 'none' : `0 0 6px 1px ${colors.shadowPrimary}`};
  padding-bottom: ${props =>
    props.collapsible ? `${dimensions.unitSpacing}px` : '0'};
  position: ${props => (props.full ? 'initial' : 'relative')};
  justify-content: center;
  transition: max-height 0.4s;
  overflow: ${props => (props.collapsible ? 'hidden' : 'initial')};
  display: ${props => props.full && 'flex'};

  &:last-child {
    margin-bottom: 0;
  }
`;

const BoxContent = styled.div`
  flex: 1;

  ul:first-child {
    padding: 10px 0;
  }
`;

const SidebarToggle = styledTS<{ inverse?: boolean }>(styled.a)`
  width: 100%;
  color: ${colors.colorCoreGray};
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 0;
  background: ${props => (props.inverse ? colors.colorWhite : colors.bgLight)};
  border-top: 1px solid ${colors.borderPrimary};
  z-index: 2;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

const HelperButtons = styledTS<{ isSidebarOpen?: boolean }>(styled.div)`
  position: absolute;
  right: ${dimensions.coreSpacing}px;
  top: ${props =>
    props.isSidebarOpen ? `${dimensions.unitSpacing - 2}px` : '15px'};
  color: ${colors.colorCoreLightGray};
  padding-right: ${props => (props.isSidebarOpen ? '20px' : '0')};

  a, button {
    color: ${colors.colorCoreLightGray};
    text-transform: none;
    cursor: pointer;
    margin-left: ${dimensions.unitSpacing - 2}px;
    font-size: ${typography.fontSizeHeading8}px;
    font-weight: ${typography.fontWeightLight};
    outline: 0;
    padding: 0;
    border: none;
    background: none;

    > i {
      font-size: 16px;

      &:hover {
        color: ${colors.colorCoreBlack};
      }
    }
  }
`;

const SidebarCounter = styledTS<{ nowrap?: boolean; fullLength?: boolean }>(
  styled.div
)`
  font-size: ${typography.fontSizeHeading8}px;
  text-align: ${props => (props.nowrap ? 'right' : 'left')};
  color: ${colors.colorCoreGray};
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ${props => !props.fullLength && 'ellipsis'};
  padding-left: 5px;

  a {
    padding: 0 !important;
    color: ${colors.linkPrimary};
  }

  span {
    float: right;
    margin-left: 5px;
  }

  ${props =>
    props.nowrap &&
    css`
      display: block;
      white-space: normal;
    `};
`;

const SidebarList = styledTS<{ capitalize?: boolean }>(styled.ul)`
  margin: 0;
  padding: 0;
  list-style: none;

  li.child-segment {
    border-bottom: none;
    background-color: ${colors.bgLight};

    > span {
      background-color: ${colors.bgLight};
      box-shadow: -2px 0 10px 2px ${colors.bgLight};
    }
  }

  &.no-link li,
  a {
    display: flex;
    padding: 6px 20px;
    color: ${colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    text-transform: ${props => (props.capitalize ? 'capitalize' : 'normal')};
    outline: 0;
    border-left: 2px solid transparent;
    transition: background 0.3s ease;

    > i {
      margin-right: 5px;
    }

    &:hover,
    &.active {
      cursor: pointer;
      background: ${colors.bgActive};
      text-decoration: none;
      outline: 0;
      color: ${lighten(colors.textPrimary, 40)};
    }

    &.active {
      background: ${rgba(colors.colorPrimary, 0.2)};
      color: ${colors.colorPrimary};
    }

    &.multiple-choice {
      flex-wrap: wrap;
      justify-content: space-between;
      white-space: normal;

      ${SidebarCounter} {
        max-width: 60%;
        word-break: break-word;
      }
    }
  }

  .icon {
    margin-right: 6px;
    color: ${colors.colorCoreGray};
  }

  button {
    font-size: 11px;
    padding-bottom: 0;
  }
`;

const FieldStyle = styledTS<{ overflow?: string }>(styled.div)`
  white-space: nowrap;
  overflow: ${props => (props.overflow ? props.overflow : 'hidden')};
  text-overflow: ellipsis;
  flex: 1;
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a {
    border: 1px solid ${colors.colorWhite};
    color: ${colors.colorWhite};
  }
`;

const SectionContainer = styledTS<{noShadow?: boolean}>(styled.div)`
  position: relative;
  box-shadow: ${props => !props.noShadow && `0 0 6px 0 rgba(0, 0, 0, 0.08)`};
  margin-bottom: 10px;

  > div {
    margin-bottom: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${SidebarBox} {
    box-shadow: none;
  }

  ${SidebarTitle} {
    height: 40px;
  }
`;

const SidebarCollapse = styled.a`
  color: ${colors.colorCoreGray};
  position: absolute;
  top: ${dimensions.unitSpacing - 2}px;
  right: ${dimensions.coreSpacing - 3}px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

const BarItems = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .dropdown-menu {
    min-width: 200px;
  }

  > * + * {
    margin: 5px 0 5px ${dimensions.unitSpacing}px;
  }

  .Select {
    min-width: 200px;
  }

  input[type='text'] {
    width: auto;
    display: inline-block;
  }

  @media (max-width: 768px) {
    > * + * {
      margin: 3px 0 3px ${dimensions.unitSpacing / 2}px;
    }
  }
`;

const SidebarFlexRow = styled.li`
  white-space: inherit !important;
  display: flex !important;
  justify-content: space-between;

  span {
    color: ${colors.colorCoreGray};
    overflow: hidden;
    max-height: 140px;
    padding-left: ${dimensions.coreSpacing}px;
    text-align: right;
  }
`;

const FlexItem = styledTS<{ count?: number; hasSpace?: boolean }>(styled.div)`
  flex: ${props => (props.count ? props.count : 1)};
  position: relative;

  ${props =>
    props.hasSpace &&
    css`
      margin-left: ${dimensions.coreSpacing}px;
    `};
`;

const FlexRightItem = styled.div`
  margin-left: auto;
`;

const SectionBodyItem = styled.div`
  border-bottom: 1px solid ${colors.borderPrimary};
  word-break: break-word;

  > a {
    padding: 10px 20px;
    display: flex;
    width: 100%;
    color: ${colors.textSecondary};

    &:hover {
      text-decoration: underline;
    }
  }

  > span {
    display: block;
    padding: 0px 20px 10px 20px;
    margin-top: -10px;
  }

  ul li {
    margin-left: ${dimensions.coreSpacing}px;
  }
`;

const AuthContent = styled.div`
  position: relative;
  margin: auto;
`;

const AuthDescription = styled.div`
  margin: 20px 0;
  img {
    width: 100px;
    margin-bottom: 50px;
  }
  h1 {
    font-weight: bold;
    font-size: 34px;
    margin: 10px 0 30px;
    color: ${colors.colorWhite};
  }
  h2 {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.4em;
    font-weight: 500;
  }
  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 50px;
    font-size: 18px;
    line-height: 1.8em;
  }
  a {
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: ${colors.colorWhite};
    }
  }
  .not-found {
    margin-top: 0;
  }
`;

const Authlayout = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
  background: ${colors.colorPrimaryDark} url('/images/stars.png') repeat top
    center;
  flex: 1;
  display: flex;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent url('/images/twinkling.png') repeat top center;
    animation: ${twinkling} 200s linear infinite;
  }
  @media (max-width: 768px) {
    overflow: auto;
    padding-bottom: ${dimensions.coreSpacing * 5}px;
  }
`;

const MobileRecommend = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 12px;
  background: linear-gradient(
    to right,
    ${colors.colorSecondary},
    ${colors.colorCoreTeal}
  );
  color: ${colors.colorWhite};
  transition: all ease 0.3s;
  padding: 15px ${dimensions.coreSpacing}px;
  box-shadow: 0 -5px ${dimensions.unitSpacing}px 0 ${rgba(colors.colorBlack, 0.2)};
`;

export {
  PageHeader,
  AuthContent,
  AuthDescription,
  Authlayout,
  MobileRecommend,
  VerticalContent,
  HeightedWrapper,
  Contents,
  MainHead,
  MainContent,
  ContentBox,
  ContenFooter,
  ContentHeader,
  HeaderContent,
  CenterContent,
  HeaderItems,
  SideContent,
  SidebarHeader,
  SidebarMainContent,
  SidebarFooter,
  SidebarBox,
  BoxContent,
  SidebarToggle,
  SidebarCounter,
  HelperButtons,
  SidebarTitle,
  SidebarList,
  FieldStyle,
  SectionContainer,
  SidebarCollapse,
  WhiteBoxRoot,
  WhiteBox,
  BarItems,
  SidebarFlexRow,
  FlexItem,
  FlexContent,
  FlexRightItem,
  SectionBodyItem
};
