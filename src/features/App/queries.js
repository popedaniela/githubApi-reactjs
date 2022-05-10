import axios from 'axios';
import {orderBy} from 'lodash';
import {useQuery} from 'react-query';

export default function useFetchRepos(isActive, username) {

	return useQuery(
		['REPOS', username],
		() => axios.get(`https://api.github.com/orgs/${username}/repos`,
			{ params: {
				per_page: 40,
			}
		}),
		{
			enabled: !!isActive && !!username !== '',
			retry: 1,
			select: response => orderBy(response.data,['stargazers_count'], ['desc']),
		}
	)
}
