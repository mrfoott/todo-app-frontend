import React from 'react';
import Login from './Login';
import Register from './Register';
import Main from './Main';
const fetch = require('sync-fetch');

const LOGIN = 'login';
const REGISTER = 'register';
const MAIN = 'main';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        this.checkSession();

        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.generateScreen = this.generateScreen.bind(this);
    }

    checkSession()
    {
        const url = 'http://localhost:3333/api/authen';

        const json = fetch(url).json();
        if (json.token)
        {
            this.state = {
                navi: MAIN,
                token: json.token
            }
        }
        else 
        {
            this.state = {
                navi: LOGIN,
                token: ''
            }
        }
    }

    generateScreen()
    {
        if (this.state.navi === LOGIN)
            return (
                <Login onRegisterClick={this.onRegisterClick} parent={this}/>
            )
        if (this.state.navi === REGISTER)
                return (
                    <Register parent={this} />
                )
        if (this.state.navi === MAIN)
                return (
                    <Main parent={this} token={this.state.token}/>
                )
    }

    onRegisterClick()
    {
        this.setState({
            navi: REGISTER
        })
    }

    render()
    {
        return (
            <div>
                {this.generateScreen()}
            </div>
        );
    }
}

export default Home;