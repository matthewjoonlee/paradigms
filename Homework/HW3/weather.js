function toCelsius(){

	// grabs the input from the user
	let input =  document.getElementById("temperature").value;

	// validate input
	if (input === "" || Number.isNaN(Number(input))) {
		document.getElementById("result-parent").innerHTML = '<span id="result">Please input a valid number!</span>';
		document.getElementById("result").style.color = "red";
		document.getElementById("result").style.fontWeight = "bold";
		document.getElementById("result-parent").style.visibility = "visible";
		return;
	}

	// restore result line for valid input
	document.getElementById("result-parent").innerHTML = 'The Temperature in Celsius is <span id="result"></span>';

	// converts the temperature to C
	let celsius = (input - 32) * 5/9;

	// show back to the user, on the <span> element
	document.getElementById("result").innerText = celsius;
	document.getElementById("result").style.color = "black";
	document.getElementById("result").style.fontWeight = "normal";
	// makes the div visible
	// element.style can be used to change CSS properties of an HTML document
	document.getElementById("result-parent").style.visibility = "visible";
}
