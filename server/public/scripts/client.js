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
        var todoId = $(this).parent().parent().data('id');
        console.log('Request to complete:', todoId);
        completeTodo(todoId);
    });

    $('#todoList').on('click', '.addOneButton', function() {
        var todoId = $(this).parent().parent().data('id');
        console.log('Request to delay:', todoId, ' by 1 day');
        delayTodo(todoId, 1);
    });

    $('#todoList').on('click', '.addTwoButton', function() {
        var todoId = $(this).parent().parent().data('id');
        console.log('Request to delay:', todoId, ' by 2 days');
        delayTodo(todoId, 2);
    });

    $('#todoList').on('click', '.deleteButton', function() {
        var todoId = $(this).parent().parent().data('id');
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


    // delay a todo
    function delayTodo(todoId, delay) {
        $.ajax({
            type: 'PUT',
            url: '/todo/delay/' + todoId + '/' + delay,
            success: function(result) {
                getTodo();
            },
            error: function(result) {
                console.log('Unable to delay todo:', todoId);
            }
        });
    } // end function delayTodo

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
            var currStatus = todo.status_name;
            var string = '';
            var dueText = "Due: ";
            if (currStatus === 'Closed') {
                string += '<div class="todo closedTodo"';
                formattedDate = formatDate(todo.done_date);
                dueText = "Completed: ";
            } else if (checkOverdue(formattedDate) === true) {
                // console.log(currStatus, checkOverdue(formattedDate));
                  currStatus = 'Overdue';
                  string += '<div class="todo overdueTodo"';
                } else {
                  string += '<div class="todo"';
                }

            string += ' data-id=' + todo.id + '>';
            string += '<p>';
            string += '<span>' + currStatus + '</span>';
            string += ' \- ';
            string += todo.description;
            string += '&nbsp-&nbsp' + dueText + '<span>' + formattedDate + '</span>';
            string += '<button type="button" class="deleteButton" name="deleteButton"><i class="material-icons">remove_circle_outline</i></button>';
            string += '<button type="button" class="addTwoButton" name="addTwoButton"><i class="material-icons">exposure_plus_2</i></button>';
            string += '<button type="button" class="addOneButton" name="addOneButton"><i class="material-icons">exposure_plus_1</i></button>';
            string += '<button type="button" class="completeButton" name="completeButton"><i class="material-icons">done</i></button>';
            string += '</p>';
            string += '</div>';
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

// =================  Utility Functions  ================

// reformat dates
function formatDate(date) {
  var formattedDate = date.substr(5, 2) + '/';
  formattedDate += date.substr(8, 2) + '/';
  formattedDate += date.substr(0, 4);
  return formattedDate;
} //end formatDate

// check if todo is overdue
function checkOverdue(date) {
  var today = new Date();
  var mm = today.getMonth() + 1;
  var dd = today.getDate();
  var yyyy = today.getFullYear();
  if (parseInt(date.substr(6,4)) >= yyyy &&
    parseInt(date.substr(0,2)) >= mm &&
    parseInt(date.substr(3,2)) >= dd) {
      return false;
    } else {
      return true;
    }
} //end checkOverdue
