import React, {useState, useEffect} from 'react';
import './App.css';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('name submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <div>test</div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {nickname: ''};

        this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
    }

    handleNicknameChange(nickname) {
        this.setState({nickname: nickname})
    }

    handleNicknameSubmit(nickname) {
        console.log('app received ' + nickname);
    }

    render() {
        return (
            <div className='app'>
                <div className='nameform'>
                    <NameForm handleSubmit={this.handleNicknameSubmit} handleChange={this.handleNicknameChange}/>
                </div>
                <div className='stats'>
                    temp
                </div>
            </div>
            
        )
    }
}

export default App;