fetch('Students.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    function updateStudentProfiles() {
      const studentNames = document.querySelectorAll('.studentName');
      const studentAges = document.querySelectorAll('.studentAge');
      const studentYearSec = document.querySelectorAll('.studentYearSec');
      const studentAddresses = document.querySelectorAll('.studentAddress');

      const profileElements = xmlDoc.getElementsByTagName('profile');

      for (let i = 0; i < profileElements.length; i++) {
        const profile = profileElements[i];
        const name = profile.querySelector('name').textContent;
        const age = profile.querySelector('age').textContent;
        const yearSec = profile.querySelector('yearSec').textContent;
        const address = profile.querySelector('address').textContent;

        studentNames[i].textContent = name;
        studentAges[i].textContent = age;
        studentYearSec[i].textContent = yearSec;
        studentAddresses[i].textContent = address;
      }
    }

    updateStudentProfiles();
  })
  .catch(error => {
    console.error('Error fetching or parsing XML:', error);
  });

//Map features
var map;

function initMap() {
  var initialLocation = { lat: 14.673602028301183, lng: 120.50175047837489 }; // Default location (Balanga, Bataan)

  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: initialLocation,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var locations = document.getElementsByClassName("aboutUs");
  for (var i = 0; i < locations.length; i++) {
    locations[i].addEventListener("click", zoomToLocation);
  }
}

function zoomToLocation() {
  var lat = parseFloat(this.querySelector(".studentProfile").getAttribute("data-lat"));
  var lng = parseFloat(this.querySelector(".studentProfile").getAttribute("data-lng"));
  var location = { lat: lat, lng: lng };

  map.setZoom(14); // Adjust the desired zoom level here
  map.panTo(location); // Center the map to the clicked location
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    title: "Student's Location"
  });
}

google.maps.event.addDomListener(window, 'load', initMap);