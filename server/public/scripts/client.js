$(document).ready(function() {
    console.log("document ready");

    getTodo();

//=====================  Event Listeners  ===============================
    $('#addButton').on('click', function (event){
      event.preventDefault();
      console.log($(this));
      getTodo();
    });

    $('.completeButton').on('click', function (){
      console.log($(this));
      getTodo();
    });

    $('.deleteButton').on('click', function (){
      console.log($(this));
      getTodo();
    });

//  =======================  Functions  ==================================

    // function putRequest() {
    //   var
    //   pathString = '/todo';
    //   $.ajax({
    //       type: 'POST',
    //       url: pathString,
    //       data: compRequest,
    //       success: function(data) {
    //         getResponse();
    //         console.log("Success - POST /calc/add");
    //       },
    //       error: function(){
    //         console.log("Error - POST /calc/add");
    //       }
    //   });
    // }
    //
    function getTodo() {
      console.log('getTodo');
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
    }

    function buildTodoList(todos) {
      $("#todoList").empty();
      for (var i = 0; i < todos.length; i++) {
        todo = todos[i];
        console.log(todo);
        var string = '';
        string += '<div class="todo"><h2>' + todo.description + '</h2><p>Date Due: <span>' + todo.due_date + '</span>, Status: <span>' + todo.status_name + '</span></p>';
        string += '<button type="button" class="completeButton" name="completeButton">Complete</button>';
        string += '<button type="button" class="deleteButton" name="deleteButton">Delete</button></div>';
        $("#todoList").append(string);
      }
    }


    //
    // function displayResult(data) {
    //   $('#result').text(data.value);
    // }
    //
    // function clearInput() {
    //   $('#result').text("");
    //   num = "";
    //   compRequest.x = "";
    //   compRequest.y = "";
    //   compRequest.type = '';
    // }

});
