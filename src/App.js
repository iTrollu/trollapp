import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class App extends Component {
	responseFacebook = (response) => {
    console.log(response);
  };
  render() {
  	 function statusChangeCallback(response) {

   if (response.status === 'connected') {
     testAPI();
   } else if (response.status === 'not_authorized') {
     document.getElementById('status').innerHTML = 'Please log ' +
       'into this app.';
   } else {
     document.getElementById('status').innerHTML = 'Please log ' +
       'into Facebook.';
   }
 }
 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }

 window.fbAsyncInit = function() {
 FB.init({
   appId      : '1621640161482398',
   cookie     : true,  // enable cookies to allow the server to access
   xfbml      : true,  // parse social plugins on this page
   version    : 'v2.5' // use graph api version 2.5
 });

 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });

 };

 (function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 function testAPI() {
   console.log('Welcome!  Fetching your information.... ');
   FB.api('/me', {fields: "id,name,picture"}, function(response) {
     FB.api("/me/picture?width=180&height=180",  function(response) {
        var elem = document.createElement("img");
        elem.setAttribute("class", "img-style");
        document.getElementById("status").appendChild(elem);
        elem.src = response.data.url;
});
     console.log('Successful login for: ' + response.name);
     var words = ["Web Developer", "Poet", "Writer", "Gamer", "App Developer", "Sportsman"];
     var word = words[Math.floor(Math.random() * words.length)];
     console.log(word);
     document.getElementById('status').innerHTML =
       "Congrats " + response.name + " You're a " + word;
     });
 }

    return (
      <div id="status">
      	<FacebookLogin
		    appId
		    autoLoad={true}
		    callback={responseFacebook} 
		/>
      </div>
    );
  }
}
