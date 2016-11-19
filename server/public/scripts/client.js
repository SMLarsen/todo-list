$(document).ready(function() {
    console.log("document ready");

    addDatePicker();
    getTodo();

    //=====================  Event Listeners  ===============================
    $('#addButton').on('click', function(event) {
        event.preventDefault();
        console.log($(this));
        addTodo();
        getTodo();
    });

    $('#todoList').on('click', '.completeButton', function() {
        var todoId = $(this).parent().data('id');
        console.log('Request to complete:', todoId);
        completeTodo(todoId);
    });

    $('#todoList').on('click', '.deleteButton', function() {
        var todoId = $(this).parent().data('id');
        console.log('Request to delete:', todoId);
        deleteConfirm(todoId);
    });

    //  =======================  Functions  ==================================

    // add a todo
    function addTodo() {

        var todo = {};

        $.each($('.addTodo').serializeArray(), function(i, field) {
            todo[field.name] = field.value;
        });
        console.log(todo);
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data) {
                console.log("Success - POST /todo");
                getTodo();
            },
            error: function() {
                console.log("Error - POST /todo");
            }
        });
    } // end function addTodo

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

    // complete a todo
    function completeTodo(todoId) {
        $.ajax({
            type: 'PUT',
            url: '/todo/complete/' + todoId,
            success: function(result) {
                getTodo();
            },
            error: function(result) {
                console.log('Unable to complete todo:', todoId);
            }
        });
    } // end function completeTodo

    // get all todos
    function getTodo() {
        $.ajax({
            type: 'GET',
            url: '/todo',
            success: function(data) {
                // displayResult(data);
                console.log("Success - GET /");
                buildTodoList(data);
            },
            error: function() {
                console.log("Error - GET /");
            }
        });
    } // end function getTodo

    // build the todo list
    function buildTodoList(todos) {
        $("#todoList").empty();
        var todo = {};
        for (var i = 0; i < todos.length; i++) {
            todo = todos[i];
            var formattedDate = formatDate(todo.due_date);

            var string = '';
            if (todo.status_name === 'Closed') {
                string += '<div class="todo closedTodo"';
            } else {
                string += '<div class="todo"';
            }
            string += ' data-id=' + todo.id + '>';
            string += '<h2>' + todo.description + '</h2><p>Date Due: <span>' + formattedDate + '</span>, Status: <span>' + todo.status_name + '</span></p>';
            string += '<button type="button" class="completeButton" name="completeButton"><i class="material-icons">done</i></button>';
            string += '<button type="button" class="deleteButton" name="deleteButton"><i class="material-icons">remove_circle_outline</i></button></div>';
            $("#todoList").append(string);

            // console.log('id: ', $("#todoList").children().last().data('id'));
        }
    } // end function buildTodoList

    // add jquery-ui datepicker to DOM
    function addDatePicker() {
        $("#dueDate").datepicker();
    } // end function addDatePicker


    // add jquery-ui dialog for delete confirmation to DOM
    function deleteConfirm(todoId) {
        $(function() {
            $("#dialog-confirm").dialog({
                resizable: false,
                height: "auto",
                width: 270,
                modal: true,
                dialogClass: "no-close",
                buttons: {
                    "Delete Task": function() {
                        deleteTodo(todoId);
                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $(this).dialog("close");
                    }
                }
            });
        });
    } // end function deleteConfirm

}); // end Document Ready

// reformat dates
function formatDate(date) {
  var formattedDate = date.substr(5, 2) + '/';
  formattedDate += date.substr(8, 2) + '/';
  formattedDate += date.substr(0, 4);
  return formattedDate;
} //end formatDate
