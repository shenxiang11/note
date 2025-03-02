import {ApolloClient, ApolloLink, from, HttpLink, InMemoryCache} from "@apollo/client";
import {userAuthStore} from "@/store/use-auth.ts";

const httpLink = new HttpLink({
  // uri: 'http://localhost:8000/graphql',
  uri: '/graphql',
  includeExtensions: true,
})

const middleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('app_token');
  if (token) {
    operation.setContext({
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  }
  return forward(operation).map((response) => {
    if (response.errors?.some((error) => error.extensions?.code === 401)) {
      const authStore = userAuthStore.getState();
      authStore.showLoginDialog();
      return response;
    }

    const responseHeaders = operation.getContext().response?.headers;
    const token = responseHeaders.get("token") as string;
    if (token) {
      localStorage.setItem('app_token', token);
    }
    return response;
  });
});

const client = new ApolloClient({
  dataMasking: true,
  link: from([
    middleware,
    httpLink
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          comments: {
            keyArgs: false,
            merge(existing = [], incoming) {
              const s = new Set();
              const result = [...existing];
              for (const e of existing) {
                s.add(e.__ref);
              }
              for (const i of incoming) {
                if (!s.has(i.__ref)) {
                  result.push(i);
                }
              }
              return result;
            },
          },
        },
      },
      Comment: {
        keyFields: ["bizId", "id"],
        fields: {
          replies: {
            merge(existing = [], incoming) {
              const s = new Set();
              const result = [...existing];
              for (const e of existing) {
                s.add(e.__ref);
              }
              for (const i of incoming) {
                if (!s.has(i.__ref)) {
                  result.push(i);
                }
              }
              return result;
            },
          },
        },
      }
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
