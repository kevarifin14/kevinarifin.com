$(function() {
 var currentPopup;

 function showPopup(popupName) {
  $(popupName).fadeIn(500);
  $(".shroud").fadeTo(500, 0.5);
 }

 function hidePopup(popupName) {
  $(popupName).fadeOut(500);
  $(".shroud").fadeOut(500);
 }

 $(".btn.btn-primary").click(function() {
  console.log($(this).attr("id"));
  currentPopup = "#" + $(this).attr("id") + ".popup";
  showPopup(currentPopup);
 });

 $(".shroud").click(function() {
   hidePopup(currentPopup);
 });
});
