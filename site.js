$.noConflict();
(function($){
  $(document).ready(function() {
      
      var tkn, query, address, community, phone, type;

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
           $("#output").empty(); //Empties out the #sent list
              addToDom(data);
              // console.log(Object.keys(data).length)
            }
          });
        }

        addToDom = function (data) {
          for(var i = 0; i < Object.keys(data).length; i++){
            address=data[i].address;
            community=data[i].community_area;
            phone=data[i].phone_number;
            type=data[i].property_type;
            $('#output').append(
              '<li>'+
              ' <ul class="a"> Address: '+ address+
              '   <li>Community: '+community+'</li>'+
              '   <li>Phone Number: '+phone+'</li>'+
              '   <li>Property Type: '+type+'</li>'+
              ' </ul>'+
              '</li>'
            );
          }
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