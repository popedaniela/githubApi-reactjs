import {CircularProgress, Grid, Typography, List} from '@mui/material';
import Box from '@mui/material/Box';
import useFetchRepos from './queries';
import Repository from 'features/Repository';

export default function App() {
	const fetchReposQuery = useFetchRepos();

	if(fetchReposQuery.isError) {
		return <Box>Something went wrong...</Box>
	}

	if(fetchReposQuery.isLoading) {
		return <CircularProgress/>
	}

	return (
	  <Grid container>
			<Grid item>
				<Typography variant="h1">Top repositories</Typography>
				<List>
					{fetchReposQuery.data.map(repository => <Repository key={repository.id} repository={repository}/>)}
				</List>
			</Grid>
	  </Grid>
	);
}
