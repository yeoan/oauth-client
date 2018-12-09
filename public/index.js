var code1=window.location.href.substring(28, window.location.href.indexOf('&'));

if(code1=='http://localhost:3000/'){

}else{
  document.getElementById("Enter_the_Form_Element_for_Auth_Code").value=code1;
}


$(document).ready(function() {
  $("#btnGetAuthCode").click(function(event) {
    window.location.href='http://140.118.110.32:50080/oauth/web/authorize?response_type=code&client_id=m10709208&state=programming_homework_2&redirect_uri=http://localhost:3000'
  });

  $("#getAccessToken").click(function(event) {
    var clientsecret=document.getElementById("Enter_the_Form_Element_for_Secret").value;
		$.ajax({
            url: "http://140.118.110.32:50080/oauth/web/token",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: {grant_type: 'authorization_code', code : code1, client_id:'m10709208', client_secret:clientsecret, redirect_uri:'http://localhost:3000'},
            success: function(data) {
                console.log(data['access_token']);
                document.getElementById("Enter_the_Form_Element_for_Access_Token").value=data['access_token'];
                document.getElementById("Enter_the_Form_Element_for_Refresh_Token").value=data['refresh_token'];
				console.log(data['refresh_token']);
            },
            error: function(err, status, errorThrown) {
                console.log("Data: " + err + "\nStatus: " + status + "\nError: " + errorThrown);
            }
        });
        event.preventDefault();
    });

    $("#getData").click(function(event) {
      var accesstoken=document.getElementById("Enter_the_Form_Element_for_Access_Token").value;
  		$.ajax({
              url: "http://140.118.110.32:50080/oauth/web/resource",
              method: "GET",
              contentType: "application/x-www-form-urlencoded",
              data: {
                  access_token: accesstoken
              },
              success: function(data) {
  				document.getElementById("data").innerHTML = "Name : "+data['first_name'];
          console.log(data['first_name'])
              },
              error: function(err, status, errorThrown) {
                  console.log("Data: " + err + "\nStatus: " + status + "\nError: " + errorThrown);
              }
          });

          event.preventDefault();
      });

      $("#Refresh").click(function(event) {
        var accesstoken=document.getElementById("Enter_the_Form_Element_for_Refresh_Token").value;
        var clientsecret2=document.getElementById("Enter_the_Form_Element_for_Secret").value;
    		$.ajax({
                url: "http://140.118.110.32:50080/oauth/web/token",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: jQuery.param({ grant_type: "refresh_token", client_id: 'm10709208', client_secret:clientsecret2, refresh_token:accesstoken}),
                success: function(data) {
                  console.log(data['access_token']);
                  document.getElementById("Enter_the_Form_Element_for_Access_Token").value=data['access_token'];
                  document.getElementById("Enter_the_Form_Element_for_Refresh_Token").value=data['refresh_token'];
          console.log(data['refresh_token']);
                },
                error: function(err, status, errorThrown) {
                    console.log("Data: " + err + "\nStatus: " + status + "\nError: " + errorThrown);
                }
            });

            event.preventDefault();
        });
});
