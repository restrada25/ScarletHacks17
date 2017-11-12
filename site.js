$.noConflict();
(function($){
  $(document).ready(function() {
      
      var tkn, query, address;

      $('#uc-form').on('submit', function(e) {
      $('#loading').empty();
      $('#loading').append('Loading...');
      tkn = 'GJedWg27HSEEJLqHx2riNUWJS'; //This is the Dandelion token
//      text = ($('#uc-text').val()).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");//Gets text & deletes punctuation
      query = ' https://data.cityofchicago.org/resource/uahe-iimk.json?$$app_token='+tkn;
//      text = text.replace(/ /g, "%20");//Replaces spaces with %20
      
        getData = function() { //Gets the sentiment of text
          $.ajax({
            type: 'GET',
            url: query,
            success: function(data) {
              console.log("success");
//            $("#sent").empty(); //Empties out the #sent list
//            type = data.sentiment.type; //Get either positive, negative of neutral
//            score = data.sentiment.score; //Get score of sentiment
//            addSentToDom(type, score); //Add the sentiment and the GIF to DOM
              address=data.address;
              console.log(address);
              addToDom(address);
            }
          });
        }

        addToDom = function (a) {
          $('#output').append(
            '<li>'+
            ' <p>'+ address+'</p>'+
            '</li>'
          );
        }

        getData();
        e.preventDefault();
      });
    $(document).keypress(function(e) { //If user presses Enter key, submit form
      if(e.which === 13) {
        $('#uc-form').submit();
      }
    });
  })
})(jQuery);