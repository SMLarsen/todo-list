var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/stevelarsen';


router.post('/', function(req, res) {
  console.log('post /');
});

router.put('/', function(req, res) {
  console.log('put /');
});

// Route: get todo list
router.get('/', function(req, res) {
  console.log('get /');

  pg.connect(connectionString, function(err, client, done) {
      console.log('connection started');
      if (err) {
          console.log('connection error: ', err);
          res.sendStatus(500);
      }

      client.query(
          'SELECT * FROM todos JOIN status ON todos.status_name = status.name ORDER BY status.sort_order',
          function(err, result) {
              done(); // close the connection.

              if (err) {
                  console.log('select query error: ', err);
                  res.sendStatus(500);
              }

              console.log(result.rows);
              res.send(result.rows);
          }
      );
    });
}); // end get todo list




module.exports = router;
