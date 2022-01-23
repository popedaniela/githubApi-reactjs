import axios from 'axios';
import {orderBy} from 'lodash';
import {useQuery} from 'react-query';

export default function useFetchRepos() {

	return useQuery(
		['REPOS'],
		() => axios.get('https://api.github.com/orgs/octokit/repos'),
		{
			enabled: true,
			select: response => {
				return orderBy(response.data,['stargazers_count'], ['desc'])
			}
		}
	)
}
