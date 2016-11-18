$(document).ready(function() {
    console.log("document ready");

    // $('.input-number').on('click', function (event){
    //   event.preventDefault();
    //   num+= $(this).attr("name");
    //   $('#result').text(num);
    //   lastResult = "";
    // });
    //
    // $('.operator').on('click', function (event){
    //   event.preventDefault();
    //   // console.log('lastResult:', lastResult, 'num:', num, 'cr:', compRequest.x);
    //   if (compRequest.x === "" || compRequest.x === undefined) {
    //     if (lastResult === "") {
    //       compRequest.x = num;
    //       num = "";
    //     } else {
    //       compRequest.x = lastResult;
    //       lastResult = "";
    //     }
    //   }
    //   calcType = $(this).attr("name").toLowerCase();
    //   compRequest.type = calcType;
    //   $('#result').text('');
    // });
    //
    // $('#equals-btn').on('click', function (event){
    //   event.preventDefault();
    //   compRequest.y = num;
    //   putRequest(compRequest);
    //   compRequest.x = "";
    //   compRequest.y = "";
    //   compRequest.type = '';
    //   num = "";
    // });
    //
    // $('#clear-btn').on('click', function (event){
    //   event.preventDefault();
    //   clearInput();
    // });
    //
    // function buildCompRequest(calcType) {
    //   inputArray = $(".calc-form").serializeArray();
    //   inputArray.forEach(function (element, index, array) {
    //     compRequest[element.name] = element.value;
    //   });
    //   compRequest.type = calcType;
    // }
    //
    // function putRequest() {
    //   pathString = '/calc/' + calcType;
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
    // function getResponse() {
    //   $.ajax({
    //       type: 'GET',
    //       url: '/calc',
    //       success: function(data) {
    //         displayResult(data);
    //         console.log('data:', data);
    //         lastResult = data.value;
    //         console.log('result:', result);
    //         console.log("Success - GET /calc/add");
    //       },
    //       error: function(){
    //         console.log("Error - GET /calc/add");
    //       }
    //   });
    // }
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
