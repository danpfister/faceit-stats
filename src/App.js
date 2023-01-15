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
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
        fetch("https://open.faceit.com/data/v4/players?nickname=" + props.nickname, {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        }, [props.nickname])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>{items['player_id']}</div>
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
                <h1>Enter your FACEIT Nickname</h1>
                <div className='nameform'>
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