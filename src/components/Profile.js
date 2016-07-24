import React, {Component, PropTypes} from 'react';

class Profile extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };
    guessRender = () => {
        let words = ["Web Developer", "Poet", "Writer", "Gamer", "App Developer", "Sportsman"];
        let word = words[Math.floor(Math.random() * words.length)];
        return word;
    };
    render() {
        const {name, url} = this.props;
        return (
            <div className="profile-header">
                <img src={url} alt="" className="profile-img"/>
                <h2 className="profile-name">This is {name}, he is a {this.guessRender()}</h2>
            </div>
        );
    }
}

export default Profile;
