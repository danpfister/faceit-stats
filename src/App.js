import React, {useState, useEffect} from 'react';
import './App.css';

function NameForm(props) {
    return (
        <div>
            <h1>Enter your FACEIT Nickname</h1>
            <form onSubmit={props.handleSubmit}>
                <input name="nicknameinput" type="text" placeholder="FACEIT Nickname"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {nickname: ''};

        this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
    }

    handleNicknameSubmit(event) {
        event.preventDefault();
        this.setState({nickname: event.target.nicknameinput.value});
        console.log('app received ' + event.target.nicknameinput.value);
    }

    render() {
        return (
            <div className='app'>
                <div className='nameform'>
                    <NameForm handleSubmit={this.handleNicknameSubmit}/>
                </div>
                <div className='stats'>
                    temp
                </div>
            </div>
            
        )
    }
}

export default App;