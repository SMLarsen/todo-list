$(document).ready(function() {
    console.log("document ready");

    addDatePicker();
    getTodo();

//=====================  Event Listeners  ===============================
    $('#addButton').on('click', function (event){
      event.preventDefault();
      console.log($(this));
      addTodo();
      getTodo();
    });

    $('#todoList').on('click','.completeButton', function (){
      var todoId = $(this).parent().data('id');
      console.log('Request to complete:', todoId);
      getTodo();
    });

    $('#todoList').on('click', '.deleteButton', function (){
      var todoId = $(this).parent().data('id');
      console.log('Request to delete:', todoId);
      deleteTodo(todoId);
    });

//  =======================  Functions  ==================================

    function addTodo() {

      var todo = {};

      $.each($('.addTodo').serializeArray(), function(i, field) {
          todo[field.name] = field.value;
      });
      console.log(todo);
      pathString = '/todo';
      $.ajax({
          type: 'POST',
          url: pathString,
          data: todo,
          success: function(data) {
            console.log("Success - POST /todo");
          },
          error: function(){
            console.log("Error - POST /todo");
          }
      });
    }  // end function addTodo

// delete a todo
    function deleteTodo(todoId) {
          $.ajax({
              type: 'DELETE',
              url: '/todo/delete/' + todoId,
              success: function(result) {
                getTodo();
              },
              error: function(result) {
                  console.log('Unable to delete todo:', todoId);
              }
          });
    } // end function deleteTodo

    function getTodo() {
      $.ajax({
          type: 'GET',
          url: '/todo',
          success: function(data) {
            // displayResult(data);
            console.log("Success - GET /");
            buildTodoList(data);
          },
          error: function(){
            console.log("Error - GET /");
          }
      });
    }  // end function getTodo

    function buildTodoList(todos) {
      $("#todoList").empty();
      for (var i = 0; i < todos.length; i++) {
        todo = todos[i];
        // console.log(todo);
        var string = '';
        string += '<div class="todo" data-id=' + todo.id + '>';
        string += '<h2>' + todo.description + '</h2><p>Date Due: <span>' + todo.due_date + '</span>, Status: <span>' + todo.status_name + '</span></p>';
        string += '<button type="button" class="completeButton" name="completeButton">Complete</button>';
        string += '<button type="button" class="deleteButton" name="deleteButton">Delete</button></div>';
        $("#todoList").append(string);

        // console.log('id: ', $("#todoList").children().last().data('id'));
      }
    }  // end function buildTodoList

    function addDatePicker() {
      $("#dueDate").datepicker();
    } // end function addDatePicker

});
