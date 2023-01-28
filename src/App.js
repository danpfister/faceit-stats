import React, {useState, useEffect} from 'react';
import './App.css';
import token from './token.json';

function NameForm(props) {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <input name="nicknameinput" type="text" placeholder="FACEIT Nickname"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

function StatsRequest(props) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [details, setDetails] = useState([]);
    const [matches, setMatches] = useState([]);
    const [stats, setStats] = useState([]);

    const headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + props.token
    }
  
    useEffect(() => {
        if (props.nickname.length === 0) {
            return;
        }
        setIsLoading(true);
        fetch("https://open.faceit.com/data/v4/players?nickname=" + props.nickname, { headers })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Server responded with Error!");
                }
                return response.json()
            })
            .then(
                (result) => {
                    console.log('retrieved player details')
                    setDetails(result);
                    return fetch("https://open.faceit.com/data/v4/players/" + result['player_id'] + "/stats/csgo", { headers });
                },
                (error) => {
                    setError(error);
                    return null;
                }
            )
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Server responded with Error!");
                }
                return response.json()
            })
            .then(
                (result) => {
                    console.log('retrieved player stats');
                    setStats(result);
                    return fetch("https://open.faceit.com/data/v4/players/" + result['player_id'] + "/history?game=csgo&offset=0&limit=20", { headers });
                },
                (error) => {
                    setIsLoading(false);
                    setError(error);
                }
            )
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Server responded with Error!");
                }
                return response.json()
            })
            .then(
                (result) => {
                    console.log('retrieved player matches');
                    setMatches(result);
                    setIsLoading(false);
                    return;
                },
                (error) => {
                    setError(error);
                    setIsLoading(false);
                }
            )
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.nickname])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else if (!isLoaded) {
        return <div></div>
    } else {
        return (
            <div className='stats'>
                <div className='stats-item'>ELO:<br/>{details['games']['csgo']['faceit_elo']}</div>
                <div className='stats-item'>Win Rate %:<br/>{stats['lifetime']['Win Rate %']}</div>
                <div className='stats-item'>Average Headshots %:<br/>{stats['lifetime']['Average Headshots %']}</div>
                <div className='stats-item'>Recent Results:<br/>{stats['lifetime']['Recent Results']}</div>
            </div>
        );
    }
  }

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {nickname: ''};
        this.token = token.api_token;

        this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
    }

    handleNicknameSubmit(event) {
        event.preventDefault();
        this.setState({nickname: event.target.nicknameinput.value});
        console.log('received new nickname')
    }

    render() {
        return (
            <div className='app'>
                <div className='title'>FACEIT Stats Visualizer</div>
                <div className='nameform'>
                    <div>Enter your FACEIT Nickname</div>
                    <NameForm handleSubmit={this.handleNicknameSubmit}/>
                </div>
                <div className='stats'>
                    <StatsRequest nickname={this.state.nickname} token={this.token}/>
                </div>
            </div>
            
        )
    }
}

export default App;