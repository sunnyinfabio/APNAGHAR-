// Script add
// https://maps.googleapis.com/maps/api/js?key=AIzaSyAdgtKv7SriM13lFaja6Kg0DM4yZXkpoRA;

// 


    function getLocation() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

  function showPosition(position) {
    // latA = position.coords.latitude;
    // latB = position.coords.longitude;
    getlat(position.coords.latitude,position.coords.longitude)
    return position.coords.latitude;
    // locat = `https://www.google.com/maps/dir/${latA},${latB}/Aapno+Ghar+%2F+Airport+Motel+Amusement+%26+Water+Park+43rd+Mile+Stone+,+NH-8+Delhi+%E2%80%93+Jaipur+Expressway,+Sec-77+Gurugram,+Haryana/@28.3865758,76.9703948,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x390d17f5eb48c11b:0xfc3bfa172749641c!2m2!1d76.9738709!2d28.3865107`;
  }


  function getlat(l,t){
    $('.inputlat').val(l);
    $('.inputlon').val(t);
  }
  
getLocation();

var locat;
var locations = "";
$(function(){
    var lang = $('.inputlat').val();
    var tat = $('.inputlon').val();
    locat = `https://www.google.com/maps/dir/${lang},${tat}/Aapno+Ghar+%2F+Airport+Motel+Amusement+%26+Water+Park+43rd+Mile+Stone+,+NH-8+Delhi+%E2%80%93+Jaipur+Expressway,+Sec-77+Gurugram,+Haryana/@28.3865758,76.9703948,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x390d17f5eb48c11b:0xfc3bfa172749641c!2m2!1d76.9738709!2d28.3865107`;
    locations = [
        ['<div class="mapWr"><h4>Aapno Ghar</h4><p>Aapno Ghar / Airport Motel Amusement & Water Park 43rd Mile Stone , NH-8 Delhi – Jaipur Expressway, Sec-77 Gurugram, Haryana</p><div class="getdirec"><a target="_blank" href="'+locat+'">Get direction</a></div></div>', 28.3865154, 76.971296, 16, '#loc1'],    
    ];
})



    var map_style = [
{
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#f5f5f5"
    }
  ]
},
{
    "elementType": "labels.icon",
    "stylers": [
    {
        "visibility": "off"
    }
  ]
},
{
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#616161"
    }
  ]
},
{
    "elementType": "labels.text.stroke",
    "stylers": [
    {
        "color": "#f5f5f5"
    }
  ]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#bdbdbd"
    }
  ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#eeeeee"
    }
  ]
},
{
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#757575"
    }
  ]
},
{
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#e5e5e5"
    }
  ]
},
{
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#9e9e9e"
    }
  ]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#ffffff"
    }
  ]
},
{
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#757575"
    }
  ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#dadada"
    }
  ]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#616161"
    }
  ]
},
{
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#9e9e9e"
    }
  ]
},
{
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#e5e5e5"
    }
  ]
},
{
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#eeeeee"
    }
  ]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
    {
        "color": "#c9c9c9"
    }
  ]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
    {
        "color": "#9e9e9e"
    }
  ]
}
]

$(function(){
    var zumSet = 0;
    if ($(window).width() <= 1366) {
        zumSet = 4.7
    }
    else {
        zumSet = 7.2;
    }

    var map = new google.maps.Map(document.getElementById('map_2'), {
        zoom: zumSet,
        center: new google.maps.LatLng(28.3865154, 76.971296),
        styles: map_style,
        streetViewControl: true,
        backgroundColor: "#222",
        mapTypeControl: false,
        mapTypeControl: false, disableDefaultUI: true,
        panControl: true,
        zoomControl: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if ($(window).width() <= 1366) {
        map.panBy(100, 150);
    }
    else {
        map.panBy(140, 80);
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'assets/images/pinmn.png'
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }




    function onloadMap(){
          var la,lt,z;
          la= "28.3865154";
          lt= "76.971296";
          z= 14;
          map.setCenter(new google.maps.LatLng(la, lt));
          map.setZoom(parseInt(z));
    }
    onloadMap();
})