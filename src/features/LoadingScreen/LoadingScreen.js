import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function LoadingScreen(){
	return (
		<Grid alignItems="center" container height="100%" justifyContent="center">
			<CircularProgress/>
		</Grid>
	)
}