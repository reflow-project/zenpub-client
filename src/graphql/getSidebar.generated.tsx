import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetSidebarQueryQueryVariables = {
  limitComm?: Types.Maybe<Types.Scalars['Int']>,
  endComm?: Types.Maybe<Array<Types.Maybe<Types.Scalars['Cursor']>>>
};


export type GetSidebarQueryQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'canonicalUrl' | 'name' | 'preferredUsername' | 'icon'>
      & { followedCommunities: Types.Maybe<(
        { __typename: 'FollowedCommunitiesPage' }
        & { pageInfo: (
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        ), edges: Array<(
          { __typename: 'FollowedCommunity' }
          & { follow: (
            { __typename: 'Follow' }
            & Pick<Types.Follow, 'id'>
          ), community: (
            { __typename: 'Community' }
            & Pick<Types.Community, 'id' | 'preferredUsername' | 'name' | 'icon'>
          ) }
        )> }
      )> }
    ) }
  )> }
);


export const GetSidebarQueryDocument = gql`
    query getSidebarQuery($limitComm: Int, $endComm: [Cursor]) {
  me {
    user {
      id
      canonicalUrl
      name
      preferredUsername
      icon
      followedCommunities(limit: $limitComm, after: $endComm) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          follow {
            id
          }
          community {
            __typename
            ... on Community {
              id
              preferredUsername
              name
              icon
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetSidebarQueryQuery__
 *
 * To run a query within a React component, call `useGetSidebarQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSidebarQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSidebarQueryQuery({
 *   variables: {
 *      limitComm: // value for 'limitComm'
 *      endComm: // value for 'endComm'
 *   },
 * });
 */
export function useGetSidebarQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSidebarQueryQuery, GetSidebarQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSidebarQueryQuery, GetSidebarQueryQueryVariables>(GetSidebarQueryDocument, baseOptions);
      }
export function useGetSidebarQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSidebarQueryQuery, GetSidebarQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSidebarQueryQuery, GetSidebarQueryQueryVariables>(GetSidebarQueryDocument, baseOptions);
        }
export type GetSidebarQueryQueryHookResult = ReturnType<typeof useGetSidebarQueryQuery>;
export type GetSidebarQueryLazyQueryHookResult = ReturnType<typeof useGetSidebarQueryLazyQuery>;
export type GetSidebarQueryQueryResult = ApolloReactCommon.QueryResult<GetSidebarQueryQuery, GetSidebarQueryQueryVariables>;


export interface GetSidebarQueryQueryOperation {
  operationName: 'getSidebarQuery'
  result: GetSidebarQueryQuery
  variables: GetSidebarQueryQueryVariables
  type: 'query'
}
export const GetSidebarQueryQueryName:GetSidebarQueryQueryOperation['operationName'] = 'getSidebarQuery'
