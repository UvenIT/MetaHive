function reload(){
    $.ajax({
       type: "POST",
       url: "ProfileInfo/Addpost/reload.php",
       success: function(odpowiedz) {
           $(".posts").html(odpowiedz);
       },
   });
   setTimeout("reload()", 20000);
}

function reloadwhenadd(){
    $.ajax({
       type: "POST",
       url: "ProfileInfo/Addpost/reload.php",
       success: function(odpowiedz) {
           $(".posts").html(odpowiedz);
       },
   });
}