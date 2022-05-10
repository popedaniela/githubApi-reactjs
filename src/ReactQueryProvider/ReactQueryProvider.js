import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchIntervalInBackground: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
})

export default function ReactQueryProvider({children}) {

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
