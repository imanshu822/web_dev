$("button")[0].style.backgroundColor = "green";
// $("#p1").hover(function(){
//     alert("You entered p1!");
//   },
//   function(){
//     alert("Bye! You now leave p1!");
//   });

  $("input").focus(function(){
    $(this).css("background-color", "#cccccc");
  });
  $("input").blur(function(){
    $(this).css("background-color", "#ffffff");
  });