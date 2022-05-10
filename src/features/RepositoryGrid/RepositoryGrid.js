import Grid from '@mui/material/Grid'
import PropTypes from "prop-types";
import Repository from 'features/Repository';

export default function RepositoryGrid({repositories}) {
	return (
		<Grid container alignItems="end" spacing={3}>
			{repositories.map(repository =>
				<Grid item key={repository.id} xs={12} sm={6} md={4} lg={3}>
					<Repository repository={repository}/>
				</Grid>
			)}
		</Grid>
	)
};

RepositoryGrid.propTypes = {
	repositories: PropTypes.arrayOf(PropTypes.object)
}