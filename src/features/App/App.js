import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingScreen from 'features/LoadingScreen';
import Repository from 'features/Repository';
import Typography from '@mui/material/Typography';
import useFetchRepos from './queries';

export default function App() {
	const fetchReposQuery = useFetchRepos();

	if(fetchReposQuery.isError) {
		return <Box>Something went wrong...</Box>
	}

	if(fetchReposQuery.isLoading) {
		return <LoadingScreen/>
	}

	return (
	  <Grid container spacing={2} p={4}>
			<Grid item xs={12} pb={4}>
				<Typography variant="h1">Top repositories</Typography>
			</Grid>
			<Grid item xs={12} spacing={3}>
				<Grid container  alignItems="end">
					{fetchReposQuery.data.map(repository => <Grid item xs={12} sm={6} md={4} lg={3}>
						<Repository key={repository.id} repository={repository}/>
					</Grid>)}
				</Grid>
			</Grid>
	  </Grid>
	);
}
