(function() {
	var map = new google.maps.Map(document.querySelector('.map-wrapper'), {
			
          styles: [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ]
		}),
		preloader = document.querySelector('.preload-wrapper'),

		// import the geocode API
		geocoder = new google.maps.Geocoder(),
		geocodeButton = document.querySelector('.geocode'),

		// directions display
		directionsService = new google.maps.DirectionsService(),
		directionsDisplay,
		locations = [],
		marker;

	function initMap(position) {
		
		locations[0] = { lat: position.coords.latitude, lng: position.coords.longitude };

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);

		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
		map.setZoom(14);

		marker = new google.maps.Marker({
			position: { lat: position.coords.latitude, lng: position.coords.longitude },
			map: map,
			title: "Hello world!",
			animation:google.maps.Animation.BOUNCE,
		});

		codeAddress();
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	} else {
		console.log('we were on a break!');
	}

	function handleError() {
		console.log('something went wrong');
	}

	function codeAddress() {
		var address = "86 Saugeen St, Southampton, ON";

		geocoder.geocode({ 'address' : address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				locations[1] = { lat: results[0].geometry.location.lat(),
									lng: results[0].geometry.location.lng()
								};
				map.setCenter(results[0].geometry.location);

				if (marker) {
					marker.setMap(null);

					marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});

					calcRoute(results[0].geometry.location);
					calcDistance(results[0].geometry.location);
					
				} 			

				else {
					console.log('Geocode was not successful for the following reason: ', status);
				}
			}
		});
	}

	function calcRoute(codedLoc) {
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: 'DRIVING'
		};

		directionsService.route(request, function(response, status) {
			if (status == 'OK') {
				directionsDisplay.setDirections(response);
			}
		});
	}
	
	function calcDistance(codedLoc)
	{
		console.log("calc distance entered!");
		var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [locations[0]],
          destinations: [locations[1]],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.querySelector('#distance');
            outputDiv.innerHTML = '';

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
              }
            }
          }
        });	
	}

})();