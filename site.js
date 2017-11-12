$.noConflict();
(function($){
  $(document).ready(function() {
      
      var tkn, query, address, community, phone, type;

      getData = function(q) { //Gets the sentiment of text
        $.ajax({
          type: 'GET',
          url: q,
          headers: {
            'X-App-Token' : tkn
          },
          success: function(data) {
            console.log("success");
            $("#output").empty(); //Empties out the #sent list
            console.log(data);
            addToDom(data);
            // console.log(Object.keys(data).length)
          }
        });
      }

      addToDom = function (d) {
        for(var i = 0; i < Object.keys(d).length; i++){
          address=d[i].address;
          community=d[i].community_area;
          phone=d[i].phone_number;
          type=d[i].property_type;
          $('#output').append(
            '<li>'+
            ' <ul class="a"> <b>Address: '+ address+'</b>'+
            '   <li>Community: '+community+'</li>'+
            '   <li>Phone Number: '+phone+'</li>'+
            '   <li>Property Type: '+type+'</li>'+
            ' </ul>'+
            '</li>'
          );
        }
      }

      tkn = 'GJedWg27HSEEJLqHx2riNUWJS';
      query = 'https://data.cityofchicago.org/resource/uahe-iimk.json?$order=community_area';

      getData(query);

      $('#uc-form').on('submit', function(e) {
        console.log('Searching');
        $('#output').empty();
        $('#loading').append('Loading...');
        text = ($('#uc-text').val()).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");//Gets text & deletes punctuation
        console.log(text);
        query = 'https://data.cityofchicago.org/resource/uahe-iimk.json?community_area='+text;
//      text = text.replace(/ /g, "%20");//Replaces spaces with %20
        console.log(query);
        getData(query);
        e.preventDefault();
      });

    $(document).keypress(function(e) { //If user presses Enter key, submit form
      if(e.which === 13) {
        $('#uc-form').submit();
      }
    });
  })
})(jQuery);