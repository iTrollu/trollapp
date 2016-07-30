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
        const {name, url,total_count} = this.props;
        return (
            <div className="profile-header">
                <h2 className="profile-name">Know your story, after you reborn</h2>
                <br />
                <img src={url} alt="" className="profile-img"/>
                <h2 className="profile-name">This is {name}, he will be a {this.guessRender()} with  {total_count * 100000} followers</h2>
            </div>
        );
    }
}

export default Profile;
