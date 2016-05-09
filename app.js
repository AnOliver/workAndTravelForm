var http = require('http');
var mysql = require('mysql');

//Connects to mysql
var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'murakami',
  password: 'AYAnGTr',
  database: 'trialformdb'
});
connection.connect();

const port=8080; 

//Retrieves table
function handleRequest(request, response){
	if (request.method == 'GET'){
		var query = connection.query('select * from customers', function(err, result) {
			response.setHeader('Access-Control-Allow-Origin','*')
			response.end(JSON.stringify(result));
		});	
	}
	else if (request.method == 'POST') {
        var body = "";
        request.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        request.on('end', function () {
            console.log("Body: " + body);
			saveForm(body)
        });	
		
	}
}

//Saves form data
function saveForm(customer){
	customer = JSON.parse(customer)		
	var query = connection.query('insert into customers set ?', customer, function (err, result) {
		if (err) {
			console.error(err);
			return;
		}
		console.error(result);
	});
}

//Creates server
var server = http.createServer(handleRequest);

server.listen(port, function(){
    console.log("Listening at: http://localhost:%s", port);
});