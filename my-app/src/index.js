import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import {Icon, Grid, Image, Loder, Loader} from 'semantic-ui-react'
import './index.css';

class Repository extends React.Component{
    handleClick = () => {
        this.props.didClickRepository(this.props.repository)
    };
    handleMoreClick = () =>{
    };
    render() {
        const {repository} = this.props;
        return (
            <li>
                <div className="repository-owner-icon" style={{backgroundImage: `url(${repository.owner.avatar_url})`}}></div>
                <div className="repository-info" onClick={this.handleClick}>
                    <p className="medium">{repository.name}</p>
                    <p>{repository.owner.login}</p>
                    <p>  <Icon name='star' className="start"/> {repository.stargazers_count}</p>
                </div>
                <div className="icon-like"></div>
                <div className="icon-more" onClick={this.handleMoreClick}></div>
            </li>
        )
    }
}

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            reposState: [],
            isLoadedState: false,
            errorState: null,
            activeRepositoryState: [],
            pullRequestsState : [],

        };
    }

    componentDidMount() {
        axios.get('https://api.github.com/orgs/octokit/repos')
            .then(
                (response) => {
                    const orderedRepos = _.orderBy(response.data, ['stargazers_count'], ['desc']);
                    this.setState({
                        reposState: _.take(orderedRepos, 10),
                        isLoadedState: true,
                    });
                },
                (error) => {
                    this.setState({
                        isLoadedState: true,
                        error
                    });
                }
            );
    }

    didClickRepository = (repository) =>{
        this.setState({
            activeRepository : repository
        });
        axios.get('https://api.github.com/repos/octokit/'+repository.name+'/pulls')
            .then(
                (response) => {
                    const pullRequests = response.data;
                    this.setState({
                        pullRequestsState : _.take(response.data, 10),
                        isLoadedState: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoadedState: true,
                        error
                    });
                }
            );
    };

    render() {
        const { errorState, isLoadedState, reposState, pullRequestsState } = this.state;
        if(errorState){
            return <div>Error: {errorState.message}</div>
        }else if(!isLoadedState){
            return <div><Loader active>Loading</Loader></div>
        }else{
            return (
                <div className="App">
                    <h1>Hello, React!</h1>
                    <div className="container">
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <ul className="ul-list-repositories">
                                        {reposState.map(item =>(
                                            <Repository repository={item} key={item.id} didClickRepository={this.didClickRepository} />
                                        ))}
                                    </ul>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="repository-info">
                                        <h2>{this.state.activeRepositoryState.name}</h2>
                                        <ul className="pull-requests">
                                            {pullRequestsState.map(item =>(
                                                <li key={item.id}>
                                                    <p>#{item.number}</p>
                                                    <p>{item.title}</p>
                                                    <p>{item.user.login}</p>
                                                    <p>{item.user.state}</p>
                                                    <Image src={item.user.avatar_url} avatar />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

