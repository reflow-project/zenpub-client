// import { Trans } from '@lingui/macro';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import media from 'styled-media-query';
import { SidePanel } from 'ui/modules/SidePanel';
import { LoadMore } from 'ui/modules/Loadmore';
import { FormikHook } from 'ui/@types/types';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
import { Trans } from '@lingui/react';

export interface Props {
  basePath: string;
  FeaturedCommunitiesBox: JSX.Element;
  FeaturedCollectionsBox: JSX.Element;
  ActivitiesBox: JSX.Element;
  CommunitiesBoxes: JSX.Element;
  CollectionsBoxes: JSX.Element;
  LoadMoreFormik?: FormikHook;
}
export const Discover: React.FC<Props> = ({
  basePath,
  ActivitiesBox,
  CommunitiesBoxes,
  CollectionsBoxes,
  FeaturedCommunitiesBox,
  FeaturedCollectionsBox,
  LoadMoreFormik
}) => {
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <WrapperFeatured>{FeaturedCommunitiesBox}</WrapperFeatured>
          <WrapperFeatured mt={2}>{FeaturedCollectionsBox}</WrapperFeatured>
          <Wrapper>
            <Menu basePath={basePath} />
            <Switch>
              <Route path={`${basePath}/communities`}>
                <WrapperBoxes>{CommunitiesBoxes}</WrapperBoxes>
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
              <Route path={`${basePath}/collections`}>
                {CollectionsBoxes}
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
              <Route path={`${basePath}`}>
                {ActivitiesBox}
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <SidePanel />
    </MainContainer>
  );
};

const Menu = ({ basePath }: { basePath: string }) => (
  <SuperTabWrapper>
    <NavLink exact to={`${basePath}`}>
      <Trans>Timeline</Trans>
    </NavLink>
    <NavLink exact to={`${basePath}/communities`}>
      <Trans>All communities</Trans>
    </NavLink>
    <NavLink exact to={`${basePath}/collections`}>
      <Trans>All collections</Trans>
    </NavLink>
  </SuperTabWrapper>
);

const SuperTabWrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  padding: 12px 8px;
  a {
    font-weight: 700;
    text-decoration: none;
    margin-right: 8px;
    color: ${props => props.theme.colors.gray};
    letterspacing: 1px;
    font-size: 14px;
    padding: 4px 8px;
    white-space: nowrap;
    &.active {
      color: #ffffff;
      background: ${props => props.theme.colors.orange};
      border-radius: 4px;
    }
  }
`;

const WrapperFeatured = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  border-radius: 8px;
`;

const WrapperBoxes = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  padding: 8px;
`;

export const HomeBox = styled(Flex)`
  width: 600px;
  align-items: flex-start;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  ${media.lessThan('1005px')`
  max-width: 100%;
  `};
  // ${media.lessThan('1280px')`
  // top: 60px;
  // `};
          `;

export const MainContainer = styled(Flex)`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
  margin-right: 8px;
`;

export const WrapperCont = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
`;

export const Wrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  & ul {
    display: block;

    & li {
      display: inline-block;

      & h5 {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  & h4 {
    margin: 0;
    font-weight: 400 !important;
    font-size: 14px !important;
    color: #151b26;
    line-height: 40px;
  }
`;

export default Discover;
