var modal = $('#modalDialog');

// Get the button that opens the modal
var btn = $("#mbtn");

// Get the <span> element that closes the modal
var span = $(".close");

function validateForm(){
            document.getElementById('log').innerHTML = '';
            var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            var string2 = removeSpaces(document.getElementById('txtInput').value);
            if (string1 != string2 || string2 == ""){
                Captcha();
                document.getElementById('log').innerHTML += '<span style="font-size:12px; padding: 20px;">Entered Invalid Captcha</span> ';
                return false;
            }
        }
  function Captcha(){
      var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0');
      var i;
      for (i=0;i<6;i++){
          var a = alpha[Math.floor(Math.random() * alpha.length)];
          var b = alpha[Math.floor(Math.random() * alpha.length)];
          var c = alpha[Math.floor(Math.random() * alpha.length)];
          var d = alpha[Math.floor(Math.random() * alpha.length)];
          var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e ;
      document.getElementById("mainCaptcha").value = code;
      var colors = ["#bd5353", "#beb1dd", "#b200ff", "#faff00", "#7575ff", "#FE2E9A", "#e89520", "#2EFE2E", ];
      var rand = Math.floor(Math.random() * colors.length);
      $('#mainCaptcha').css("background-color", colors[rand]);

  }
  function removeSpaces(string){
      return string.split(' ').join('');
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



$(document).ready(function(){
    // When the user clicks the button, open the modal
    btn.on('click', function() {
        modal.show();
        document.body.style.position = 'fixed';

    });

    // When the user clicks on <span> (x), close the modal
    span.on('click', function() {
        modal.hide();
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    });
});

// When the user clicks anywhere outside of the modal, close it
$('body').bind('click', function(e){
    if($(e.target).hasClass("modal")){
        modal.hide();
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
});


$(document).ready(function(){
    $('#contactFrm').submit(function(e){
        if(validateForm() == false){
          e.preventDefault();
        }
        else{
          var formContainer = $(".modal");
          var formData = $(this).serialize();
          var alert = document.getElementById("success-alert");
          e.preventDefault();
          $.ajax({
          method: 'POST',
          url: $(this).attr("action"),
          dataType: 'json',
          accepts: 'application/json',
          data: formData,
          error: function(err) {
            console.log("Uh, oh. There was an error:", err); // You broke something...
          },
          success: function() {
            $(formContainer).hide(); // Hide the initial form
            console.log("Success!"); // Yay!
            $('#contactFrm')[0].reset();
            if (alert.style.display === "none") {
              alert.style.display = "block";
              sleep(3000).then(() => { alert.style.display = "none"; });
            }
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
          });
        }
    });
});
