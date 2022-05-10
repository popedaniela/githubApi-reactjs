import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingScreen from 'features/LoadingScreen';
import RepositoryGrid from 'features/RepositoryGrid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useFetchRepos from './queries';
import {isCancelledError} from 'react-query';
import {useEffect, useState} from 'react';

export default function App() {
	const [isQueryActive, setisQueryActive] = useState(false);
	const [repositories, setRepositories] = useState([]);
	const [username, setUsername] = useState('');

	const fetchReposQuery = useFetchRepos(isQueryActive, username);

	const onEnter = (event) => {
		if(event.code === 'Enter') {
			setisQueryActive(true);
			setRepositories([])
		}
	}
	useEffect(() => {
		if(fetchReposQuery.data) {
			setRepositories(fetchReposQuery.data);
			setisQueryActive(false);
		}
	}, [fetchReposQuery.data]);

	return (
	  <Grid container spacing={2} p={4}>
			<Grid item xs={12}>
				<Box>
					<TextField
						id="outlined-basic"
						label="Search for an organisation"
						onChange={event => setUsername(event.target.value)}
						onKeyDown={onEnter}
						variant="outlined"
					/>
				</Box>
			</Grid>
			<Grid item xs={12}>
				{fetchReposQuery.isLoading && <LoadingScreen/>}
			</Grid>
			{
				!!repositories.length && !fetchReposQuery.isLoading && <>
					<Grid item xs={12} pb={4}>
						<Typography variant="h1">Top repositories</Typography>
					</Grid>
					<Grid item xs={12}>
						<RepositoryGrid repositories={repositories}/>
					</Grid>
				</>
			}
			{
				fetchReposQuery.isError && !isCancelledError(fetchReposQuery.error)
					&& <Box>{fetchReposQuery.error.message}</Box> 
			}
	  </Grid>
	);
}
