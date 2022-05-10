import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import githubColors from './githubColors';

export default function RepositoryLanguage({language}) {
	
	const getColor = language => {
		const colorObject = Object.entries(githubColors)
		.filter(value => value[0] === language)
		.flat()[1];

		return colorObject?.color;
	}

	return (
		<Box display="flex" alignItems="center">
			<Box
				backgroundColor={getColor(language)}
				borderRadius={2}
				width={16}
				height={16}
				mr={0.5}
			/>
			<Typography variant="body2">{language}</Typography>
		</Box>
	)
}

RepositoryLanguage.propTypes = {
	language: PropTypes.string.isRequired
}