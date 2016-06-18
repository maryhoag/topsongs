var inquirer = require('inquirer');
var mysql = require('mysql');

//connection function
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'odette1',
	database: 'TopSongsDB'
});

//establish connection
connection.connect(function(error) {
	if(error) throw error;
	console.log('connected');
})

//function to retrieve all data for a specific artist
var specificArtist = function(name) {
	//is this going to pull the whole row
	//check this syntax of query/var now that there is internet again!
	connection.query('SELECT artist FROM topsongs WHERE artist =' + name, function(error, results) {
		if(error) throw error;
		console.log(results); //make me pretty
	})
}

//list all artists who appear more than once
var moreThanOnce = function(name) {
	connection.query('SELECT artist FROM topssongs', function(error, results) {
		if(error) throw error;
		var list = [];
		for(i = 0; i < results.length; i++) {
			//the logic here? 
			//loop over and see what pops up more than once 
			//start at one and see if it is there, if not pop it off?
		}
		console.log(list);

	})
}

//list all entires within a range
// of year?
var yearRange = function(date1, date2) {
	connection.query('SELECT * FROM topsongs', function(error, results) {
		if(error) throw error;
		var list = [];
		for(i = 0; i < results.length; i++) {
			if(results[i].year >= date1 || results[i].year <= date2) {
				list.push(results[i]);
			}
		}
		console.log(list);

	})
}

var song = function(songName) {
	//retrieve a single song
	connection.query('SELECT song FROM topsongs WHERE song = ' + songName, function(error, results) {
		if(error) throw error;
		//pretty console.log
		console.log('rank: ' + results.position, + ' | artist: ' + results.artist + ' | title: ' + results.song + ' | year: ' + results.year + ' | total: ' + results.raw_total + ' | usa: ' + results.raw_usa + ' | uk: ' + results.raw_uk + ' | europe: ' + results.raw_eur + ' | row: ' + results.raw_row);
	})
}

inquirer.prompt([{
	name: 'choice1',
	type: 'rawlist',
	message: 'What would you like to search?',
	choices: ['artist', 'artist who has hit mulitple times', 'date range', 'song']

}]).then(function() {
	if(answer == 'artist') {
		inquirer.prompt([{
			name: 'name',
			type: 'input',
			message: 'Artist name?',
			}].then(function(response) {
				artist(response);
			}))
	} else if(answer == 'artist who has hit multilple times') {
		moreThanOnce()
	}






})