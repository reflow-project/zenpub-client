import { Trans } from '@lingui/macro';
import React from 'react';
import { graphql, GraphqlQueryControls, OperationOption } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { TabPanel, Tabs } from 'react-tabs';
import { compose } from 'recompose';
import Loader from '../../components/elements/Loader/Loader';
import LoadMoreTimeline from '../../components/elements/Loadmore/localInstance';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import TimelineItem from '../../components/elements/TimelineItem';
import FeaturedCollections from '../../components/featuredCollections';
import FeaturedCommunities from '../../components/featuredCommunities';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import {
  WrapperPanel,
  Panel,
  PanelTitle,
  Nav,
  NavItem
} from '../../sections/panel';
const localActivities = require('../../graphql/localActivities.graphql');

interface Data extends GraphqlQueryControls {
  // localActivities: {
  //   user: {
  //     name: string;
  //     icon: string;
  //     summary: string;
  //     id: string;
  //     localId: string;
  //     inbox: any;
  //   };
  // };
  localActivities: any;
}

interface Props {
  data: Data;
}

const Home: React.FC<Props> = props => {
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <WrapperFeatured>
            <FeaturedCollections />
          </WrapperFeatured>
          <WrapperFeatured>
            <FeaturedCommunities />
          </WrapperFeatured>
          <Wrapper>
            <Tabs>
              <SuperTabList>
                <SuperTab>
                  <h5>
                    <Trans>Instance timeline</Trans>
                    <Helmet>
                      <title>Instance timeline</title>
                    </Helmet>
                  </h5>
                </SuperTab>
              </SuperTabList>
              <TabPanel>
                {props.data.error ? (
                  <span>
                    <Trans>Error loading instance timeline</Trans>
                  </span>
                ) : props.data.loading ? (
                  <Loader />
                ) : (
                  <div>
                    {props.data.localActivities.nodes.map((t, i) => (
                      <TimelineItem node={t} user={t.user} key={i} />
                    ))}
                    <div style={{ padding: '8px' }}>
                      <LoadMoreTimeline
                        fetchMore={props.data.fetchMore}
                        localInstance={props.data.localActivities}
                      />
                    </div>
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Browse Home instance</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={4} fontSize={1} fontWeight={'bold'}>
              <Trans>All communities</Trans>
            </NavItem>
            <NavItem fontSize={1} fontWeight={'bold'}>
              <Trans>All collections</Trans>
            </NavItem>
          </Nav>
        </Panel>

        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular hashtags: network</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>#learningdesign</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#MPI</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#Youtube</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#models</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#ADDIE</Trans>
            </NavItem>
          </Nav>
        </Panel>

        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular hashtags: local instance</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>#learningdesign</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#MPI</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#Youtube</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#models</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#ADDIE</Trans>
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

const WrapperFeatured = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  border-radius: 6px;
  margin-top: 16px;
`;

const withGetInbox = graphql<
  {},
  {
    data: {
      localActivities: any;
    };
  }
>(localActivities, {
  options: (props: Props) => ({
    variables: {
      limit: 15
    }
  })
}) as OperationOption<{}, {}>;

export default compose(withGetInbox)(Home);