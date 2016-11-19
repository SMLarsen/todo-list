var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/stevelarsen';

// Route: Create todo
router.post('/', function(req, res) {
    console.log('post /');
    var todo = req.body;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('connection error: ', err);
            res.sendStatus(500);
        }
        client.query(
            'INSERT INTO todos (description, due_date, status_name) VALUES ($1, $2, $3)', [todo.description, todo.dueDate, 'Open'],
            function(err, result) {
                done();

                if (err) {
                    console.log('insert query error: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });
}); // end route Create todo

// Route: Read todo list
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

                // console.log(result.rows);
                res.send(result.rows);
            }
        );
    });
}); // end route Read todo list

// Route: Update todo
router.delete('/complete/:id', function(req, res) {
    var todoId = req.params.id;
    // todoId = parseInt(todoId);
    console.log('todo to complete: ', todoId);

    pg.connect(connectionString, function(err, client, done) {
      if (err) {
          console.log('connection error: ', err);
          res.sendStatus(500);
      }

      client.query(
          "UPDATE todos SET done_date = CURRENT_DATE, status_name = 'Closed' WHERE id = $1",
          [todoId],
          function(err, result) {
              done();

              if (err) {
                  res.sendStatus(500);
              } else {
                  res.sendStatus(200);
              }
          }
      );
  });
}); // end route Update todo

// Route: Delete todo
router.delete('/delete/:id', function(req, res) {
    var todoId = req.params.id;
    // todoId = parseInt(todoId);

    console.log('todo to delete: ', todoId);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('connection error: ', err);
            res.sendStatus(500);
        }

        client.query(
            'DELETE FROM todos WHERE id = $1', [todoId],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    });
}); // end route Delete todo



module.exports = router;
