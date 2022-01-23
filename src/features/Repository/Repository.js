import {ListItem, ListItemText, Divider, ListItemAvatar, Avatar} from '@mui/material';
import PropTypes from "prop-types";
import React from 'react'

export default function Repository({repository}) {

	return <>
		<ListItem>
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src={repository.owner.avatar_url} />
			</ListItemAvatar>
			<ListItemText
				primary={repository.name}
				secondary={<>
					<span>{repository.language}</span>
				</>}
			/>
		</ListItem>
		<Divider/>
	</>;
}

Repository.propTypes = {
	repository: PropTypes.object.isRequired
};
