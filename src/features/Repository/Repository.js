import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import PropTypes from "prop-types";
import RepositoryLanguage from './RepositoryLanguage';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';

export default function Repository({repository}) {
	return (
		<Card>
			<CardHeader title={repository.name}/>
			<CardContent>
				<Box display="flex">
						<Box display="flex">
							<StarBorderIcon fontSize="small"/>
							<Typography pl={0.5} variant="body2">
								{repository.stargazers_count}
							</Typography>
						</Box>
						<Box pl={2}>
							<RepositoryLanguage language={repository.language}/>
						</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

Repository.propTypes = {
	repository: PropTypes.object.isRequired
};
