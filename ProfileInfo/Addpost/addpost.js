
$(document).ready(function () {
    $('.addpost-submit').click(function (e) {
        e.preventDefault();
        var tagsinput = $('.add-tags').val();
        var textinput = $('.add-text').val();

        var fd = new FormData();
        var files = $('#add-img-input')[0].files;
        if(files.length > 0){
            fd.append('addimg',files[0]);
            fd.append('posttags', tagsinput);
            fd.append('posttext', textinput);
            $.ajax({
                type: 'POST',
                url: "ProfileInfo/Addpost/addpost.php",
                data: fd,
                contentType: false,
                processData: false,
                success: function (odpowiedz) {
                    $(".posts").html(odpowiedz);
                    $("#form-post")[0].reset();
                    document.querySelector(".uploaded-img").classList.add("d-none");
                    document.querySelector(".uploaded-img").classList.remove("d-block");
                },
            });
        }else{
            $.ajax({
                type: 'POST',
                url: "ProfileInfo/Addpost/addpost.php",
                data: {
                    posttags: tagsinput,
                    posttext: textinput,
                },
                success: function (odpowiedz) {
                    $(".posts").html(odpowiedz);
                    $("#form-post")[0].reset();
                },
            });
        }
    });
})