import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import {Icon, Grid, Image, Loader, Menu} from 'semantic-ui-react'

import './index.css';

class Repository extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showMoreState: false,
        }
    }
    handleClick = () => {
        this.props.didClickRepository(this.props.repository)
    };
    handleMoreClick = () =>{
        this.setState({showMoreState: true});
    };
    handleBookmarkClick = () =>{
        const bookmarkState = JSON.parse(localStorage.getItem('myBookmarkedRepos')) || [];
        const bookmarkIndex = bookmarkState.indexOf(this.props.repository.id);

        if (bookmarkIndex < 0) {
            bookmarkState.push(this.props.repository.id);
        } else {
            bookmarkState.splice(bookmarkIndex, 1);
        }
        localStorage.setItem('myBookmarkedRepos', JSON.stringify(bookmarkState));
        this.props.didClickBookmark();
    };

    triggerSeeMoreMenuState = () => {
        this.setState({
            ...this.state,
            showMoreState: false,
            isSeeMoreMenuState: true
        })
    };

    render() {
        const {repository, isBookmarked} = this.props;
        const SeeMoreMenu = props => {
            return (
                <Menu pointing vertical>
                    <Menu.Item href={repository.homepage} target="_blank">Go to repository</Menu.Item>
                </Menu>
            )
        };

        return (
            <li>
                <div className="repository-owner-icon" style={{backgroundImage: `url(${repository.owner.avatar_url})`}}></div>
                <div className="repository-info" onClick={this.handleClick}>
                    <p className="medium">{repository.name}</p>
                    <p>{repository.owner.login}</p>
                    <p>  <Icon name='star' className="start"/> {repository.stargazers_count}</p>
                </div>
                {isBookmarked
                    ? <div className="icon-like filled" onClick={this.handleBookmarkClick}></div>
                    : <div className="icon-like" onClick={this.handleBookmarkClick}></div>
                }
                <div className="icon-more" onClick={this.handleMoreClick}></div>
                {this.state.showMoreState && <SeeMoreMenu addTrip={this.triggerSeeMoreMenuState} />}
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
            currentGitOwner : 'octokit',
            bookmarkState : JSON.parse(localStorage.getItem('myBookmarkedRepos')) || []
        };
        //creates a reference for your element to use
        this.myDivToFocus = React.createRef()
    }

    componentDidMount() {
        const apiUrlRepos = this.apiUrl+'repos';
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
            activeRepositoryState : repository
        });
        axios.get('https://api.github.com/repos/octokit/'+repository.name+'/pulls')
            .then(
                (response) => {
                    const pullRequests = response.data;
                    console.log(pullRequests);
                    this.setState({
                        pullRequestsState : _.take(pullRequests, 10),
                        isLoadedState: true,
                    });
                    //scroll down to pull requests if mobile
                    let currentWidthScreen = (window.innerWidth < 768);
                    //.current is verification that your element has rendered
                    if (currentWidthScreen && this.myDivToFocus.current){
                        this.myDivToFocus.current.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        })
                    }
                },
                (error) => {
                    this.setState({
                        isLoadedState: true,
                        error
                    });
                }
            );
    };

    didClickBookmark = () => {
        this.setState({
            bookmarkState : JSON.parse(localStorage.getItem('myBookmarkedRepos')) || []
        })
    };

    render() {
        const { errorState, isLoadedState, reposState, pullRequestsState, bookmarkState } = this.state;

        if(errorState){
            return <div>Error: {errorState.message}</div>
        }else if(!isLoadedState){
            return <div><Loader active>Loading</Loader></div>
        }else{
            return (
                <div className="App">
                    <div className="container">
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <h1 className=""><span className="color-blue">{this.state.currentGitOwner}</span> top repos</h1>

                                    <ul className="ul-list-repositories">
                                        {reposState.map(item =>(
                                            <Repository repository={item} key={item.id} didClickRepository={this.didClickRepository} didClickBookmark={this.didClickBookmarku7m8    } isBookmarked={bookmarkState.indexOf(item.id) !== -1} />
                                        ))}
                                    </ul>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="repository-info"  ref={this.myDivToFocus}>
                                    <h2 className="color-blue ">
                                            {this.state.activeRepositoryState.name
                                                ? <a href={this.state.activeRepositoryState.homepage} target="_blank">{this.state.currentGitOwner+'/'+this.state.activeRepositoryState.name} </a>
                                                : ''}
                                        </h2>
                                        <ul className="ul-list-pull-requests">
                                            {pullRequestsState.map(item =>(
                                                <li key={item.id} className="pull-request-list-item">
                                                    <div className="user-icon-number">
                                                        <Image src={item.user.avatar_url} avatar />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <p className="medium">#{item.number}</p>
                                                        </div>
                                                        <p className="color-blue">{item.title}</p>
                                                        <p>{item.user.login}</p>
                                                        <p>{item.user.state}</p>
                                                    </div>
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

