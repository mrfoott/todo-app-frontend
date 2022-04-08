import React from 'react';
import '../CSS/Login.css';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

        this.state = {
            username: '',
            password: '',
            loginClicked: false,
            loginfailed: false
        };
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }
    
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    sendInfo() {
        this.setState({
            loginClicked: true
        });

        if (this.state.username.trim() && this.state.password.trim())
        {
            const url = 'http://localhost:3333/api/login';
            const headers = {'Content-Type': 'application/json'};
            const body = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });
            const method = 'POST';

            fetch(url, {headers, body, method})
            .then(resp => resp.json())
            .then(json => {
                if (json.error)
                {
                    this.setState({
                        loginfailed: true
                    })
                    return ;
                }

                this.props.parent.setState({
                    navi: 'main',
                    token: json.token,
                    loginfailed: false
                });

            })
            .catch(error => console.log(error.message));
        }
    }

    render()
    {
        // return jsx here
        return (
            
                <div className="container">
                    <div className='loginform'>
                        <div className="header">
                            <h1>Welcome, Travellers!</h1>
                        </div>
                        
                        <div>
                            <p className="info">Username</p>
                            <input type="text" className="username" onChange={this.onUsernameChange} placeholder="Enter your username"/>
                        {!this.state.username && this.state.loginClicked && <p className="alert">Username cannot be blank!!!</p>}
                        </div>
                        
                        <div>
                            <p className="info">Password</p>
                            <input type="password" className="password" onChange={this.onPasswordChange} placeholder="Enter your password"/>
                            {!this.state.password && this.state.loginClicked && <p className="alert">Password cannot be blank!!!</p>}
                        </div>

                        <div>
                            <span>Don't have an account? 
                                Create <button className="create" onClick={this.props.onRegisterClick}>here!</button></span>

                            <span className="button">
                                <button className="buttonLogin" onClick={() => this.sendInfo()}>Login</button>
                            </span>
                            {this.state.loginfailed && <span>Login failed, please try again</span>}
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login;