/*

  Author: Candace Petty
  Date: 4/5/16
  File Name: app.js

*/

//Tests for a Valid Email
function ValidateEmail( Email ) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Returns the Result of the Test
	return re.test( Email );
}

//Sets Configurations for the Application
function SetConfig() {

	//Assigns LoggedIn Variable to False Since User is Not Logged In Yet and Logs "User is Not Logged In" to the Console
	var LoggedIn = false;
	console.log( "User is Not Logged In" );

	//When the Log In Link is Clicked Display the Login Modal
	$( ".LogIn" ).click( function () {
		$( ".LoginModal" ).css( "display", "flex" );
	} );

	//When the Log Out Link is Clicked Remove User Information and Assign the Logged In Status to False
	$( ".LogOut" ).click( function () {

		LoggedIn = false;
		$( ".LogIn" ).css( "display", "block" );
		$( ".LogOut" ).css( "display", "none" );
		$( ".settings" ).css( "display", "none" );
		$( ".SettingsModal" ).css( "display", "none" );
		Service.RemoveUserInfo();
		console.clear();
		console.log( "User is No Longer Logged In" );
		$( ".Welcome" ).css( "display", "block" );
		$( ".Welcome h2" ).html( "Welcome" );
		$( ".Welcome p" ).html( "Please Login." );
	} );

	//When the Exit Button is Clicked Set the Display of the Current Model to None
	$( ".exitModal" ).click( function ( e ) {

		var PresentModal = this.parentElement.parentElement.className;
		$( "." + PresentModal ).css( "display", "none" );
	} );

	//When the Login Submit Button is Clicked Log the User In If They Are a Valid User
	$( "#LoginSubmit" ).click( function ( e ) {

		//Prevents Default Events From Happening
		e.preventDefault();

		//Retrieves the Values from the Login Form
		var UserName = $( "#UName" ).val();
		var PassWord = $( "#PWord" ).val();

		//Scenario #1: If Inputs Contain Data Run Them Through Checks for Validity
		if ( UserName !== "" && PassWord !== "" ) {

			//Assigns the Result of the ValidateEmail Function to the Variable ValidEmail
			var ValidEmail = ValidateEmail( UserName );

			//Scenario #2: If Valid Email Check If Valid User
			if ( ValidEmail === true ) {

				//Check the Login Information and Login the User If They Authenticate as a Valid User
				Service.LoginUser( UserName, PassWord, function ( result ) {

					//If They Are a Valid User Log Them In
					if ( result !== null ) {

						//Display Success Message and Log the User In
						LoggedIn = true;
						swal( "Success", "Login Successful", "success" );
						console.log( "User is Logged In: Welcome", result.f_name );

						//Display None for the Following Elements
						$( ".LoginModal" ).css( "display", "none" );
						$( ".LogIn" ).css( "display", "none" );
						$( ".SignUp" ).css( "display", "none" );

						//Display Block for the Following Elements
						$( ".LogOut" ).css( "display", "inline-block" );
						$( ".settings" ).css( "display", "block" );

						//Customize the Headings to Match the Logged In User
						$( ".Welcome h2" ).html( "Welcome " + result.f_name );
						$( ".Welcome p" ).html( "You are now logged in." );

						//When the Settings Icon Link is Clicked Display the Settings Modal
						$( ".settings" ).click( function () {

							$( ".SettingsModal" ).css( "display", "flex" );

							//Customize the Headings to Match the Logged In User
							$( ".Welcome h2" ).html( "Welcome " + result.f_name );
							$( ".Welcome p" ).html( "You are now logged in." );

							//Display None for the Following Elements
							$( ".LogIn" ).css( "display", "none" );
							$( ".settings" ).css( "display", "block" );

							//Replace the Values of the Input Boxes in the User Account Settings Form with Actual User Account Information
							$( "#EditFName" ).val( result.f_name );
							$( "#EditLName" ).val( result.l_name );
							$( "#EditUName" ).val( result.u_email );
							$( "#EditPWord" ).val( result.p_word );

							//When the User Presses on the Edit Button Allow th Inputs to Be Editable
							$( "#Edit" ).click( function ( e ) {

								//Prevents Default Events From Happening
								e.preventDefault();

								//Customize the Headings to Match the Logged In User
								$( ".Welcome h2" ).html( "Welcome " + result.f_name );
								$( ".Welcome p" ).html( "You are now logged in." );

								//Display the Settings Modal
								$( ".SettingsModal" ).css( "display", "flex" );

								//Allows the Inputs to Be Editable
								$( "#EditFName" ).attr( "readonly", false );
								$( "#EditLName" ).attr( "readonly", false );
								$( "#EditUName" ).attr( "readonly", false );
								$( "#EditPWord" ).attr( "readonly", false );

								//Assigns Varables to the Current Values of the Inputs
								var UName = $( "#EditUName" ).val();
								var PWord = $( "#EditPWord" ).val();
								var FName = $( "#EditFName" ).val();
								var LName = $( "#EditLName" ).val();

								//Adds the New Edited Values to the Database
								Service.EditUser( UName, PWord, FName, LName );

							} );
						} );

					//Otherwise If They Are Not A Valid User Display Error "Incorrect Username/Password"
					} else {

						LoggedIn = false;
						console.log( "User is Not Logged In: ", result );
						swal( "Error", "Incorrect Username/Password.", "error" );
						$( ".Welcome" ).css( "display", "block" );
					}

				} );

			//Scenario #3: If Email was Not a Valid Email Address Display Error
			} else {

				swal( "Error", "Invalid Email: Please Enter a Valid Email Address.", "error" );
				LoggedIn = false;
				console.log( "User is Not Logged In" );
			}

		//Scenario #4: If Both Inputs Are Not Filled Out Display Error
		} else {

			swal( "Error", "Please fill out both inputs", "error" );
			LoggedIn = false;
			console.log( "User is Not Logged In" );
		}
	} );
}

//Waits till the Document is Ready to Run the Following Functions
$( document ).ready( function () {

	//Sets Configurations
	SetConfig();
} );
