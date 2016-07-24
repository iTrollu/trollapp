import React, { Component } from 'react';
import Profile from './Profile';
import config from '../../config';
import Spinner from './Spinner';
import { getData } from '../utils/util';


class App extends Component {

  state = {
    status: 'loading'
  };

  componentWillMount = () => {
    document.body.style.backgroundColor = '#2c3e50';
  };

  componentDidMount = () => {

    window.fbAsyncInit = () => {
      FB.init(config);

      // show login
      FB.getLoginStatus(
        response => response.status !== 'connected' && this.setState({ status: response.status })
      );

      FB.Event.subscribe('auth.authResponseChange', (response) => {
        // start spinner
        this.setState({ status: 'loading' });

        (async () => {
          try {
            const { profile } = await getData();
            this.setState({ status: response.status, profile });
          } catch (e) {
            this.setState({ status: 'err' });
          }
        })();
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };

  mainRender = () => {
    const { profile, status } = this.state;
    if (status === 'connected') {
      return (
          <Profile {...profile} />
      );
    }
    return (<Spinner />);
  };



  render() {

    return (
      <div className="profile-wrapper">
        {this.mainRender()}
      </div>
    );
  }

}

export default App;
