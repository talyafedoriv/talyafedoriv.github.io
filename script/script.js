const iconWrap = document.getElementById('iconWrap')
const iconOpen = document.getElementById('iconOpen')
const iconClose = document.getElementById('iconClose')
const mainMenu = document.getElementById('mainMenu')



iconWrap.addEventListener('click',() => {
	mainMenu.classList.toggle('hide-menu')
	iconOpen.classList.toggle('hide')
	iconClose.classList.toggle('hide')
})


 window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    var remainingHeight = documentHeight - (scrollPos + windowHeight);

    var scrollButton = document.querySelector('.scroll-to-top');

    if (remainingHeight < 10) {
      scrollButton.style.display = 'block'; 
    } else {
      scrollButton.style.display = 'none'; 
    }
  });