import React, { Component } from 'react';

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(''+cookieName+'[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');
}

class App extends Component {
  state = {
    clickCount: getCookie('count') || 0,
    usernameIsEditable: false,
    username: getCookie('username') || ""
  }

  handleClick = () => {
    const newCount = Number(this.state.clickCount) + 1;
    document.cookie = `count=${newCount}`;
    this.setState({
      ...this.state,
      clickCount: newCount,
    });
  }

  editUsername = () => {
    this.setState({
      ...this.state,
      usernameIsEditable: true,
    });
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    })
  }

  handleLogout = ()=> {
    document.cookie = `username=`
    // this.setState({
    //   ...this.state,
    //   username: ""
    // })
  }

  saveUsername = (event) => {
    this.setState({
      usernameIsEditable: false,
    });
    document.cookie = `username=${this.state.username}`

  }

  render() {
    console.log(this.state.username)
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            Username:
            {/* Username should go here */}

            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {/* 
              This conditional rendering is using a `ternary` operator. It works like an if/else block.
              The part at the front is being evaluated. The `?` starts the conditions. 
              The first condition is what will be done if true.
              The `:` breaks into the else block.
              
              Rewritten as if/else:
              ```
              let buttonToShow;
              if(this.state.usernameIsEditable) {
                buttonToShow = <button onClick={this.saveUsername}>Save Username</button>
              } else {
                buttonToShow = <button onClick={this.editUsername}>Edit Username</button>
              }
              ```

            */}
            {this.state.usernameIsEditable ?
              <>
                <input onChange={this.handleChange}/>
                <button onClick={this.saveUsername}>Save Username</button> 
              </>
              :
              <>  
                <span>  {this.state.username}  </span>
                <button onClick={this.editUsername}>Edit Username</button>
                <button onClick={this.handleLogout}>Log Out</button>
              </>
              
            }
          </p>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
