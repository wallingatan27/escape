
<script type="text/javascript">
 $(document).ready(function() {
      $("input[type=button]").click(function () {
      var username = $('input[id=username]').val(); // get the content of what user typed ( in textarea ) 
      var password = $('input[id=password]').val(); // get the content of what user typed ( in textarea ) 
                            $.ajax({
                            type: "POST",
                            url: "loginUser.php",
                            data : "username="+username+"&password="+password,
                            dataType: "json",
                            success: function (data) {
                            var success = data['success'];
                            if(success == false){
        var error = data['message'];
                            alert(error); // just in case somebody to click on share witout writing anything :


                                }

                                if(success == true) {
   $('#mask , .login-popup').fadeOut(300 , function() {
   $('#mask').remove();  
                                });// end fadeOut function()
    setTimeout("location.href = 'home.php';",1000);                                 
                                                }
                                                    }

                        });//end ajax             
                 })}
         );
         </script>