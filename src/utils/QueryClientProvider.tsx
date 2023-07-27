import {
  QueryClient,
  QueryClientProvider as RQClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => (
  <RQClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    {children}
  </RQClientProvider>
);
