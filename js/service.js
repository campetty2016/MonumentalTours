/*

  Author: Candace Petty
  Date: 4/5/16
  File Name: service.js

*/

//Performs the Services for the Sign Up and Login Forms as well as Connects to the Database
var Service = ( function () {

	//Database URL
	var _dbURL = "https://api.mongolab.com/api/1/databases/dw-speaker-site/collections/speakers?";

	//Database API Key
	var _apiKey = "apiKey=fHjbUqEHKms6Hlc9JG8x8Bc9IqrJBfp3";

	//Performs the Authentication of a User
	var _LoginUser = function ( username, password, callback ) {

		//Declares an AJAX Call to the Database
		$.ajax( {
			url: _dbURL + 'q={"u_email":"' + username + '",p_word:"' + password + '"}&fo=true&' + _apiKey,
			type: "GET",
			contentType: "application/json"

			//Once the Request is Completed Display the Data of the Logged In User in the Console
		} ).done( function ( data ) {

			//Display the Data of the Logged In User in the Console, If Not a Valid User Displays "null"
			console.log( 'data', data );
			callback( data );
		} );
	};

  //Checks a User For an Instance in the Database
	var _CheckUser = function ( email, CheckCallback ) {

    //Declares an AJAX Call to the Database
		$.ajax( {
			url: _dbURL + 'q={"u_email": "' + email + '"}&fo=false&c=true&' + _apiKey,
			type: "GET",
			contentType: "application/json"
		} ).done( function ( data ) {
			console.log( 'data', data );

      //Returns Result of Validity for User through Boolean Value
			var user = false;

			if ( data === 0 ) {
				user = false;
			} else {
				user = true;
			}

      //Checks Callback
			CheckCallback( user, data );
		} );
	};

  //Returns User Information
	var _getUserInfo = function ( data ) {
		return _userInfo;
	};

	//Adds Edited User Information to the Database
	var _EditUser = function ( UserName, PassWord, FirstName, LastName ) {

    //User Object
		var obj = {
			"f_name": FirstName,
			"l_name": LastName,
			"u_email": UserName,
			"p_word": PassWord,
			"role": "user"
		};

		//Declares an AJAX Call to the Database
		$.ajax( {
			url: _dbURL + 'q={"u_email":"' + UserName + '",p_word:"' + PassWord + '",f_name:"' + FirstName + '",l_name:"' + LastName + '" }&fo=true&' + _apiKey,
			type: "POST",
			data: JSON.stringify( obj ),
			contentType: "application/json"

		} ).done( function ( data ) {

			//Display the Data of the Logged In User in the Console, If Not a Valid User Displays "null"
			console.log( 'data', data );
			_userInfo = data;
		} );
	};

	//Removes User Information
	var _RemoveUserInfo = function ( username, password ) {

		//Declares an AJAX Call to the Database
		$.ajax( {
			url: _dbURL + 'q={"u_email":"' + username + '",p_word:"' + password + '"}&fo=true&' + _apiKey,
			type: "GET",
			contentType: "application/json"

			//Once the Request is Completed Display the Data of the Logged In User in the Console
		} ).done( function ( data ) {

			//Set Data to Return Nothing When the User is Logged Out
			data = "";
			console.log( 'data', data );

		} );
	};

	//Returns Private Service Functions In Order for Other JavaScript Files to Be Able to Access Them
	return {
		LoginUser: _LoginUser,
		EditUser: _EditUser,
		CheckUser: _CheckUser,
		getUserInfo: _getUserInfo,
		RemoveUserInfo: _RemoveUserInfo
	};

} )();
