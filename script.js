function scrollToScale(){
    $('body, html').animate({
        scrollLeft: 1600
    }, 1000);
}

let planetsAxis = document.querySelectorAll('.planet');
planetsAxis = [...planetsAxis];

let planetsNav = document.querySelectorAll('.nav-right__go-to');
planetsNav = [...planetsNav];

planetsNav.forEach(planet =>{
    planet.addEventListener('click', goToPlanet);
})

function goToPlanet(){
    for(var i=0; i<10; i++){
        if(this == planetsNav[i])
        $('body, html').animate({
            scrollLeft: $(planetsAxis[i]).offset().left - 800
        }, 2500);
    }
}

function addActive(elem){
    elem.addClass('active');
}

function removeActive(elem){
    elem.removeClass('active');
}

function toggleActive(elem){
    elem.toggleClass('active');
}

let menuRight = $('.nav-right');

function hideMenuRight(){
    let showMenuBtn = $('.menu-right__show');
    let hideMenuBtn = $('.menu-right__hide');
    toggleActive(showMenuBtn);
    toggleActive(hideMenuBtn);
    menuRight.addClass('hidden');
}

function showMenuRight(){
    let showMenuBtn = $('.menu-right__show');
    let hideMenuBtn = $('.menu-right__hide');
    toggleActive(showMenuBtn);
    toggleActive(hideMenuBtn);
    menuRight.removeClass('hidden');
}

function togglePlanetInfo(){
    let nextElem = this.nextElementSibling;
    $(nextElem).slideToggle();
}

function toggleUnitsBar(){
    let unitsMenu = $('.units-choice');
    unitsMenu.toggleClass('active');
}

let chosenUnits = 'px';

function setUnits(units){
    chosenUnits = units;
}

let unitsBar = document.querySelectorAll('.unit');
unitsBar = [...unitsBar];
unitsBar.forEach(unit =>{
    $(unit).on('click', function(){
        const units = unit.innerHTML;
        setUnits(units);
        toggleUnitsBar();
        countDistance();
    })
});

function countDistance(){
    let scrollFromSun = $(window).scrollLeft() - 2040;
    let distanceLabel = $('.distance-counter__distance');
    switch(chosenUnits){
        case 'km':
            scrollFromSun = scrollFromSun*3474;
            break;
        case 'px':
            scrollFromSun = scrollFromSun;
            break;     
        case 'au':
            scrollFromSun = scrollFromSun*3474/150000000;
            break;
        case 'lm':
            scrollFromSun = scrollFromSun*3474/17987520;
            break;

    }
       distanceLabel.text(+scrollFromSun.toFixed(1) + chosenUnits);
}

function showDistance(){
    const sunFromLeft = 2040;
    let distanceCounter = $('.distance-counter');
    if($(window).scrollLeft() >= sunFromLeft){
       addActive(distanceCounter);
    }
    else{
        removeActive(distanceCounter);
    }
}

function putLightBeam(x,y){
    $('.lightbeam').css('left', x + 'px');
    $('.lightbeam').css('top', y + 'px');
    $('.lightbeam').css('z-index', '1');
    $('.lightbeam').addClass('lightspeed');
    changeCursor();
    toggleLightspeedMsg();
}

function removeLightBeam(){
    $('.lightbeam').removeClass('lightspeed');
    $('.lightbeam').css('z-index', '0');
}

let defaultCursor = true;
let lightSpeedBtnClicked = false;

function changeCursor(){
    if(defaultCursor == true){
    $('body').css('cursor', "url('img/cursor.png'), auto");
    defaultCursor = false;
    }
    else{
        $('body').css('cursor', 'default');
        defaultCursor = true;
    }
    lightSpeedBtnClicked = true;
}

function disableLightspeedBtn(){
    $('.nav-right__lightspeed-btn').css('pointer-events', 'none');
}

function enableLightspeedBtn(){
    $('.nav-right__lightspeed-btn').css('pointer-events', 'all');
}

function toggleLightspeedMsg(){
    let lightspeedMsg = $('.lightspeed-msg');
    toggleActive(lightspeedMsg);
}

$(window).on('scroll', countDistance);
$(window).on('scroll', showDistance);
$('.distance-counter__distance').on('click', toggleUnitsBar);
$('.welcome-header__button').on('click', scrollToScale);
$('.menu-right__hide').on('click', hideMenuRight);
$('.menu-right__show').on('click', showMenuRight);
$('.planets_names').on('click', togglePlanetInfo);
$('.nav-right__lightspeed-btn').on('click', changeCursor);
$('.nav-right__lightspeed-btn').on('click', toggleLightspeedMsg);
$('.nav-right__lightspeed-btn').on('click', disableLightspeedBtn);
$('.wraper').on("click",function(event){
 if(lightSpeedBtnClicked == true){
      putLightBeam(event.pageX, event.pageY);
      lightSpeedBtnClicked = false;
 }
});
$('.lightbeam').on('click', removeLightBeam);
$('.lightbeam').on('click', enableLightspeedBtn);



// Horizontal scroll 

(function() {
 function scrollHorizontally(e) {
e = window.event || e;
var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
document.documentElement.scrollLeft -= (delta*29); // Multiplied by 40
document.body.scrollLeft -= (delta*29); // Multiplied by 40
// e.preventDefault();
 }
 if (window.addEventListener) {
// IE9, Chrome, Safari, Opera
window.addEventListener("mousewheel", scrollHorizontally, false);
// Firefox
window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
// IE 6/7/8
window.attachEvent("onmousewheel", scrollHorizontally);
 }
})();

$(window).scroll(function(){
var scroll = $(window).scrollLeft();
// console.log(scroll);
});