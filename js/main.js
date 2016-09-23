/**
 * Author: Candace Petty
 * File Name: main.js
 * Date: 10/12/15
 */

 //Ready Function that Waits for When the Page is Ready
$(document).ready(function() {

    //Calls the Animate Section Function
    AnimateSection();
});

//Animate Section Function that Animates the Page to Scroll Once a Link is Clicked
function AnimateSection(){
	
	//Assigns a Click Handler to the Links within the Navigation
	$("nav a").click(function(event) {
		
		//Declares the Variable ViewID By Assigning the ID of the Link Clicked and Appending the Word View at the End
		var ViewID = this.id + "View";
		
		//Animates All of HTML and Body to Animate and Scroll to the Corresponding Link IDs Clicked
		$("html, body").animate({
			
			//Allows the Page to Automatically Scroll to a LinkID Once Clicked Through Appending a # to the ViewID
			scrollTop: $("#" + ViewID).offset().top
			
		}, 2000);	
	})
}
