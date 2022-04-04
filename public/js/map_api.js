function initMap(){
    var mapOptions = {
        center: new google.maps.LatLng(10.762913, 106.679983),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initMap);