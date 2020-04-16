import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ResetPasswordRequestMutationVariables = {
  email: Types.Scalars['String']
};


export type ResetPasswordRequestMutation = (
  { __typename: 'RootMutationType' }
  & Pick<Types.RootMutationType, 'resetPasswordRequest'>
);


export const ResetPasswordRequestDocument = gql`
    mutation resetPasswordRequest($email: String!) {
  resetPasswordRequest(email: $email)
}
    `;
export type ResetPasswordRequestMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordRequestMutation, { data, loading, error }] = useResetPasswordRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, baseOptions);
      }
export type ResetPasswordRequestMutationHookResult = ReturnType<typeof useResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationResult = ApolloReactCommon.MutationResult<ResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;


export interface ResetPasswordRequestMutationOperation {
  operationName: 'resetPasswordRequest'
  result: ResetPasswordRequestMutation
  variables: ResetPasswordRequestMutationVariables
  type: 'mutation'
}
export const ResetPasswordRequestMutationName:ResetPasswordRequestMutationOperation['operationName'] = 'resetPasswordRequest'
