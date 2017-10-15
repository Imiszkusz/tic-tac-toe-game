/*
1. The comp offers to choose betweeb 1 player or 2 player mode in a window
2. It offers to choose from the two signs (if 2 players, it offers them both)
3. It opens the grid view itself and the game starts
4. It is marked on a label whose turn it is currently 


CSS - ease-out for settings windows

The game is split into turns
- different routing for 1 player / 2 players mode
- algorithm for computer ...

When someone wins, the game ends and it displays a victory window


*/






//***************************************************************************************************



Game();








function setupUI(settings, app){


const table = document.querySelector('.table');
var fields = document.getElementsByClassName('fields');

var publicAPI = {
	updateField: updateField,
}

updateField(table);

return publicAPI;


//****************************************

function updateField(DOMElement){

	DOMElement.addEventListener('click', function checkNewClick(e){

		if(e.target.classList.contains('fields') && !(isMarked(e.target))){
			 e.target.classList.add(settings.symbols[app.playerturn]);

			 for(let i = 0; i < fields.length; i++){
			   if(e.target == fields[i]) app.updateMap(i); //Octopus ???
		}

		if(app.playerturn == 0) app.checkVictory();
			

		}

		
	})
}


function isMarked(DOMElement){

	if(DOMElement.classList.contains(settings.gem) || DOMElement.classList.contains(settings.sapphire)){
		return true
	}

	else return false;
}



}









function Data(settings){

  var playerTurn = 0;
	var map = ['empty', 'empty', 'empty', 
						 'empty', 'empty', 'empty',
						 'empty', 'empty', 'empty'];

	var columns = Number.isInteger(Math.sqrt(map.length)) ? Math.sqrt(map.length) : undefined;
	var rows = Number.isInteger(Math.sqrt(map.length)) ? Math.sqrt(map.length) : undefined;
	var diagonals = 2;

	var publicAPI = {
		playerturn: playerTurn,
		updateMap: updateMap,
		checkVictory: checkVictory
	}



	return publicAPI;



//*********************************
	function updateMap(elementIdx) {
		map[elementIdx] = settings.symbols[playerTurn];
		console.log(map);
	}


	function checkVictory(){

		if(checkRows(map).victory) return true;
		else {
			if(checkColumns(map).victory) return true;

			else if(checkDiagonals(map).victory) return true;
		}
		
		return false;
	}


	function resultEndCheck(result){

		if(result.length == 3){
					if(result[2] == settings.gem) {
						console.log('GEM won!');
						return {
							victory: true,
							player: settings.gem
						}
					}
					else {
						console.log('SAPPHIRE won!');
						return {
							victory: true,
							player: settings.sapphire
						}
					}
				}
		else return {
	 			victory: false
		}
	}


	function checkRows(arr){

		var result = [];


		for(let i = 0; i <= arr.length - columns; i += rows){
			for(let y = 0; y < columns; y++){

				

				if(arr[i + y] == 'empty') {
					result = [];
					break;
				}

				else if(result.length === 0 && arr[i + y] != 'empty') {
					result.push(arr[i + y]);

				}

				else if(result[result.length - 1] != arr[i + y] && result[result.length - 1] !== undefined){
					result = [];
					break;
				}

				else if(result[result.length - 1] == arr[i + y]){
					result.push(arr[i + y]);
					console.log(result);

					if(resultEndCheck(result).victory) return resultEndCheck(result);
				}

			}
		}

		return false;
	}


	function checkColumns(arr){

		var result = [];


		for(let i = 0; i < columns; i++){
			for(let y = 0; y <= map.length - (rows - i); y += rows){
				

			  if(arr[i + y] == 'empty') {
					result = [];
					break;
				}

				else if(result.length == 0 && arr[i + y] != 'empty'){
					result.push(arr[i + y]);
					
				} 

				else if(result[result.length - 1] != arr[i + y] && result[result.length - 1] !== undefined){
					result = [];
					break;
				}

				else if(result[result.length - 1] == arr[i + y]) {
					result.push(arr[i + y]);
				

					if(resultEndCheck(result).victory) return resultEndCheck(result);
				}
			}
		}
		return false;
	}


	function checkDiagonals(arr){

		var result = [];

		for(let i = 0; i < arr.length; i += rows + 1){
			console.log('i is: ', i);
			if(arr[i] == 'empty') {
					result = [];
					break;
				}

			else if(result.length === 0 && arr[i] != 'empty'){
				result.push(arr[i]);
				console.log(result);
			} 

			else if(result[result.length - 1] != arr[i] && result[result.length - 1] !== undefined){
			    result = [];
			    break;
				}

			else if(result[result.length - 1] == arr[i]){
				result.push(arr[i]);
				console.log(result);
			} 
		}

		if(resultEndCheck(result).victory) return resultEndCheck(result);

		for(let i = columns - 1; i <= arr.length - columns; i += rows - 1){
			console.log('i is: ', i);
			if(arr[i] == 'empty') {
					result = [];
					break;
				}

			else if(result.length === 0 && arr[i] != 'empty'){
				result.push(arr[i]);
				console.log(result);
			} 

			else if(result[result.length - 1] != arr[i] && result[result.length - 1] !== undefined){
			    result = [];
			    break;
				}

			else if(result[result.length - 1] == arr[i]){
				result.push(arr[i]);
				console.log(result);
			} 
		}

		if(resultEndCheck(result).victory) return resultEndCheck(result);

		return false;
	}

}




function Game(){

	const GEM = 'gem';
	const SAPPHIRE = 'sapphire';
	const playerSetupBlock = document.querySelector('.player-setup');
	const symbolSetupBlock = document.querySelector('.symbol-setup');

	var playerMode;

startSetup();




//***********************

function startSetup(){

	playerSetupBlock.addEventListener('click', playerSetup, false)
	symbolSetupBlock.addEventListener('click', symbolSetup, false)

}

	
	function playerSetup(e){

		if(e.target.textContent == 'One Player'){

			playerMode = 'one-player';
			playerSetupBlock.style.opacity = '1';
			playerSetupBlock.style.animation = '1s forwards shade_out';

			var delayedAnims = setTimeout(function hideAndShow(){
				playerSetupBlock.classList.add('hidden');

				symbolSetupBlock.classList.remove('hidden');
				symbolSetupBlock.style.animation = '1s ease-in forwards shade_in';
			}, 1100);
		}

		else if(e.target.textContent == 'Two Players'){

			playerMode = 'two-players';
			playerSetupBlock.style.opacity = '1';
			playerSetupBlock.style.animation = '1s forwards shade_out';

			var delayedAnims = setTimeout(function hideAndShow(){
				playerSetupBlock.classList.add('hidden');

				symbolSetupBlock.classList.remove('hidden');
				symbolSetupBlock.style.animation = '1s ease-in forwards shade_in';
			}, 1100);
		}
	}


	function symbolSetup(e){


		const SYMBOLS = (function(){
			if(e.target.className == 'symbol-buttons' && e.target.id == 'gem-setup-icon')
				return [GEM, SAPPHIRE];

			else if(e.target.className == 'symbol-buttons' && e.target.id == 'sapphire-setup-icon')
				return [SAPPHIRE, GEM];
		})();

		if(SYMBOLS !== undefined){

			var settings = {
			gem: GEM,
			sapphire: SAPPHIRE,
			symbols: SYMBOLS,
			playermode: playerMode
		}

		console.log(settings);

		symbolSetupBlock.style.opacity = '1';
		symbolSetupBlock.style.animation = '1s forwards shade_out';

		var delayedHide = setTimeout(function hideSymbolSetup(){
			symbolSetupBlock.classList.add('hidden');
		}, 1100)
		


		startGame(settings)
		}
	}


	function startGame(settings){
		var App = Data(settings);
		var UI = setupUI(settings, App);
	}





}


















