$(document).ready(function() {
    console.log("document ready");


//=====================  Event Listeners  ===============================
    $('#addButton').on('click', function (event){
      event.preventDefault();
      console.log($(this));
      getTodo();
    });

    $('.completeButton').on('click', function (){
      console.log($(this));
    });

    $('.deleteButton').on('click', function (){
      console.log($(this));
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
            console.log('data:', data);
            console.log('result:', result);
            console.log("Success - GET /");
          },
          error: function(){
            console.log("Error - GET /");
          }
      });
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
