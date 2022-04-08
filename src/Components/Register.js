import React from 'react';
import '../CSS/Register.css'; 
import '../CSS/Login.css';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepasswordChange = this.onRepasswordChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);

        this.state = {
            username: '',
            password: '',
            repassword: '',
            name: '',
            registerClicked: false
        };
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value,
        });
    }
    
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onRepasswordChange(e) {
        this.setState({
            repassword: e.target.value,
        });
    }

    sendInfo() {
        this.setState({
            registerClicked: true,
        });

        if (this.state.name.trim() && this.state.username.trim() && this.state.password.trim())
        {
            const url = 'http://localhost:3333/api/register';
            const headers = {'Content-Type': 'application/json'};
            const body = JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                password: this.state.password
            });
            const method = 'POST'

            fetch(url, {body, headers, method})
            .then(resp => resp.json())
            .then(json => {
                if (json.error)
                    return Promise.reject(new Error(json.error));

                this.props.parent.setState({
                    navi: 'login'
                });
            })
            .catch(error => console.log(error.message));
        }
    }

    checkPasswordMatch()
    {
        if ((this.state.password !== this.state.repassword) && this.state.registerClicked)
            return <p className="alert">Make sure you retype password correctly</p>
        return null;
    }

    render()
    {
        // return jsx here
        return (
           <div className="container">
                <div className='signupform'>
                    <p>Already has an account? Go to <button className="create" onClick={() => {this.props.parent.setState({navi: 'login'})}}>Login Page</button> </p>
                 
                    <div className="info">
                        <p>Name</p>
                        <input type="text" className="name" onChange={this.onNameChange} placeholder="Enter your Name"/>
                        {!this.state.name.trim() && this.state.registerClicked && <p className="alert">Name cannot be blank</p>}
                    </div>

                    <div className="info">
                        <p>Username</p>
                        <input type="text" className="name" onChange={this.onUsernameChange} placeholder="Enter your Username"/>
                        {!this.state.username.trim() && this.state.registerClicked && <p className="alert">Username cannot be blank</p>}
                    </div>

                    <div>
                        <p className="info">Password</p>
                        <input type="password" className="password" onChange={this.onPasswordChange} placeholder="Enter your password"/>
                        {!this.state.password.trim() && this.state.registerClicked && <p className="alert">Password cannot be blank</p>}
                    </div>

                    <div>
                        <p className="info">Retype password</p>
                        <input type="password" className="repassword" onChange={this.onRepasswordChange} placeholder="Re enter your password"/>
                        {!this.state.repassword.trim() && this.state.registerClicked && <p className="alert">Password cannot be blank</p>}
                        {this.checkPasswordMatch()}
                    </div>

                    <div>

                        <span className="button">
                            <button className="button" onClick={() => this.sendInfo()} type="submit">Sign Up</button>
                        </span>
                    </div>
                </div>
           </div>
        )
    }
}

export default Login;
