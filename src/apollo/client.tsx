import { ApolloLink, Operation, Observable, FetchResult } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { createHttpLink } from 'apollo-link-http';
import { hasSubscription } from '@jumpn/utils-graphql';
import apolloLogger from 'apollo-link-logger';
import * as AbsintheSocket from '@absinthe/socket';
const introspectionQueryResultData = require('../fragmentTypes.json');
import {
  GRAPHQL_ENDPOINT,
  PHOENIX_SOCKET_ENDPOINT,
  IS_DEV
} from '../constants';

import { onError } from 'apollo-link-error';
import { RootMutationType, RootQueryType } from '../generated/graphqlapollo';
import { OperationDefinitionNode, GraphQLError, FieldNode } from 'graphql';

// const { meQuery } = require('../graphql/me.graphql');
interface Cfg {
  authToken?: string;
}
export default async function initialise({ authToken }: Cfg) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({ fragmentMatcher });

  const setTokenLink = new ApolloLink((operation, nextLink) => {
    const createSessionOpName: OperationName = 'createSession';
    const createUserOpName: OperationName = 'createUser';
    const deleteSessionOpName: OperationName = 'deleteSession';
    const opName = getOperationName(operation);
    if (opName === deleteSessionOpName) {
      authToken = undefined;
    }
    return nextLink(operation).map(resp => {
      if (opName === createUserOpName || opName === createSessionOpName) {
        const authPyload: ResponseOf<
          typeof createSessionOpName | typeof createUserOpName
        > = resp.data && resp.data[opName];
        authToken =
          authPyload && authPyload.token ? authPyload.token : undefined;
      }
      return resp;
    });
  });

  /**
   * This context link is used to assign the necessary Authorization header
   * to all HTTP requests to the GraphQL backend. In the case that the user
   * is authenticated it sets their access token as the value, otherwise null.
   */
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : null
      }
    };
  });

  function handleError(message) {
    alert(message); //TODO: nicer display of errors
  }

  function handleErrorGraphQL(message, locations, path) {
    console.log(
      `! GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
    );

    if (!message.includes('You need to log in first')) {
      // don't display this error - we redirect to login screen instead
      handleError(message);
    }
  }

  const errorLink = onError(
    ({ operation, response, graphQLErrors, networkError }) => {
      // console.log( 'errorLink', operation, response );

      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          handleErrorGraphQL(message, locations, path)
        );
      }

      if (networkError) {
        console.log(`! Network error: ${networkError}`);
        handleError(networkError);
      }
    }
  );

  const clientAwarenessHeadersLinkForNonApollo3Server = setContext((_, ctx) => {
    const { headers } = ctx;
    return {
      ...ctx,
      clientAwareness: undefined,
      headers: {
        ...headers
      }
    };
  });

  const operationInterceptors = new Set<Interceptor<OperationName>>();

  const addInterceptor = (interc: Interceptor<OperationName>) => {
    operationInterceptors.add(interc);
    return () => {
      operationInterceptors.delete(interc);
    };
  };

  const oprationInterceptorLink = new ApolloLink((operation, nextLink) => {
    const interceptorOperationResponseHandlers: InterceptorOperationResponseHandler<
      OperationName
    >[] = [];
    const defOpName = getOperationName(operation);
    if (defOpName) {
      for (const interceptor of operationInterceptors) {
        if (interceptor.operation === defOpName) {
          const interceptorAction = interceptor.request(operation);
          if (interceptorAction === BLOCK_REQUEST) {
            interceptorOperationResponseHandlers.forEach(responseHandler =>
              responseHandler(BLOCK_REQUEST)
            );
            const error = new GraphQLError(`Operation ${defOpName} Aborted`);
            const result: FetchResult = {
              errors: [error],
              data: null,
              context: operation.getContext(),
              extensions: operation.extensions
            };
            return Observable.of(result);
          } else if ('function' === typeof interceptorAction) {
            interceptorOperationResponseHandlers.push(interceptorAction);
          }
        }
      }
    }

    return nextLink(operation).map(result => {
      if (defOpName) {
        interceptorOperationResponseHandlers.forEach(responseHandler =>
          responseHandler(result.data && result.data[defOpName])
        );
      }
      return result;
    });
  });

  // used for graphql query and mutations
  const httpLink = ApolloLink.from(
    [
      IS_DEV ? apolloLogger : null,
      oprationInterceptorLink,
      errorLink,
      authLink,
      clientAwarenessHeadersLinkForNonApollo3Server,
      setTokenLink,
      createHttpLink({ uri: GRAPHQL_ENDPOINT })
    ].filter(Boolean)
  );

  // used for graphql subscriptions
  const absintheSocket = createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(PHOENIX_SOCKET_ENDPOINT))
  );

  // if the operation is a subscription then use
  // the absintheSocket otherwise use the httpLink
  const link = ApolloLink.split(
    operation => hasSubscription(operation.query),
    absintheSocket,
    httpLink
  );

  const client = new ApolloClient({
    cache,
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  });
  const opInterceptor = {
    add: addInterceptor
  };
  return {
    client,
    opInterceptor
  };
}
export interface InterceptorSrv {
  add: <OpName extends OperationName>(
    interc: Interceptor<OpName>
  ) => () => void;
}
export type MutationName = keyof RootMutationType;
export type QueryName = keyof RootQueryType;
export type OperationName = QueryName | MutationName;

export type ResponseOf<
  OpName extends OperationName
> = OpName extends MutationName
  ? RootMutationType[OpName]
  : OpName extends QueryName ? RootQueryType[OpName] : never;

export type InterceptorOperationResponseHandler<
  OpName extends OperationName
> = (response: ResponseOf<OpName> | BlockRequest) => unknown;

export type Interceptor<OpName extends OperationName> = {
  operation: OpName;
  request: (
    operation: Operation
  ) => InterceptorOperationResponseHandler<OpName> | void | BlockRequest;
};
export const BLOCK_REQUEST = Symbol();
export type BlockRequest = typeof BLOCK_REQUEST;

export const getOperationName = (
  operation: Operation
): OperationName | null => {
  const opDefNodes = operation.query.definitions.filter(
    (def): def is OperationDefinitionNode => def.kind === 'OperationDefinition'
  );
  const maybeOperationName = opDefNodes.reduce<string | undefined>(
    (found, opDefNode) => {
      if (!found) {
        const maybeFieldNode = opDefNode.selectionSet.selections.find(
          (selNode): selNode is FieldNode => selNode.kind === 'Field'
        );
        found = maybeFieldNode && maybeFieldNode.name.value;
      }
      return found;
    },
    undefined
  );

  if (!maybeOperationName) {
    return null;
  }
  const opName = maybeOperationName as OperationName; /*  operation.operationName.replace(
    new RegExp(
      `${
        maybeOperationDef.operation === 'mutation'
          ? 'Mutation'
          : maybeOperationDef.operation === 'query'
            ? 'Query'
            : 'Subscription'
      }$`
    ),
    ''
  ) as OperationName; */
  return opName;
};
