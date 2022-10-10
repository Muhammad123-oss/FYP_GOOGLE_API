/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

function initMap() {
  const khi = new google.maps.LatLng(24.8607, 67.0011);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: khi,
    zoom: 10,
  });

  const request = {
    /* radius: 5, */
    location: khi,
    types:['bus_station','transit_station'],
    query: "stop",
    bounds: new google.maps.LatLngBounds(
    new google.maps.LatLng(24.9329048,66.9673828),
    new google.maps.LatLng(24.9109894,67.0307512)
    ),
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log("faiz");
        console.log(results[i].geometry.location.lat());
      }
      console.log(results[0].geometry.location.lat());
      console.log(results[0].geometry.location.lng());
      console.log(results[3].geometry.location.lat());
      console.log(results[3].geometry.location.lng())
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;
