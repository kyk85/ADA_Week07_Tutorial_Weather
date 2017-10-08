var weatherArray=[]
var savedWeatherArray=[]

$(function(){
	retrieveItem();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
		//alert("Latitude: " + position.coords.latitude + " " + "Longitude: " + position.coords.longitude);
		var url="https://api.openweathermap.org/data/2.5/forecast/daily?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&cnt=16&appid=8131be7e3e6b2014b3af931e011bd730";

			$.getJSON(url,function(data,status) {
				//console.log(data.list);
				weatherArray = data.list
				$("#location").html(data.city.name)
				$.each(data.list, function(index,value){
					//console.log(index)
					$("#weatherTableBody").append("<tr><td>"
						+new Date(value.dt*1000)
						+"</td><td>"
						+"<img src='http://openweathermap.org/img/w/"+value.weather[0].icon+".png'>"+"</img></td><td>"
						+value.temp.day+"&#8451"
						+"</td><td>"
						+value.pressure
						+"</td><td>"
						+value.humidity
						+"</td><td>"
						+"<button onclick='saveItem("+index+")'>Save This</button>"
						+"</td>"
						)
					
				})
			})
		})
	}
	
})				


function retrieveItem(){
		savedWeatherArray=JSON.parse(localStorage.getItem("weathers"))
		console.log(savedWeatherArray)
		$.each(savedWeatherArray, function(index,value){
					//console.log(index)
					$("#savedWeatherTableBody").append("<tr><td>"
						+new Date(value.dt*1000)
						+"</td><td>"
						+"<img src='http://openweathermap.org/img/w/"+value.weather[0].icon+".png'>"+"</img></td><td>"
						+value.temp.day+"&#8451"
						+"</td><td>"
						+value.pressure
						+"</td><td>"
						+value.humidity
						+"</td><td>"
						+"<button onclick='saveItem("+index+")'>Save This</button>"
						+"</td>"
						)
})
	}


function saveItem(item) {
		var savedItem = weatherArray[item]
		console.log(weatherArray[item])
		if (!savedWeatherArray) {
			savedWeatherArray =[];
		}
		savedWeatherArray.push(weatherArray[item])
		if (typeof(Storage) !=="undefined") {
			localStorage.setItem("weathers", JSON.stringify(savedWeatherArray))

		} else {
			alert("Sorry your browser does not support local storage.")
		}
		$("#savedWeatherTableBody").append("<tr><td>"
						+new Date(savedItem.dt*1000)
						+"</td><td>"
						+"<img src='http://openweathermap.org/img/w/"+savedItem.weather[0].icon+".png'>"+"</img></td><td>"
						+savedItem.temp.day+"&#8451"
						+"</td><td>"
						+savedItem.pressure
						+"</td><td>"
						+savedItem.humidity
						+"</td><td>"
						+"<button onclick='saveItem("+item+")'>Save This</button>"
						+"</td>"
						)

		console.log(savedWeatherArray)
	}



