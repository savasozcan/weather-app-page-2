window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree      = document.querySelector('.degree');
    let locationTimezone       = document.querySelector('.location-timezone');
    let temperatureSection     = document.querySelector('.temperature');
    const temperaturesSpan     = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api   = `${proxy}https://api.darksky.net/forecast/f7bee4ad30ce65e2d30ae364e5118233/${long},${lat}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    const timeZone               = data.timezone;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent      = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent       = timeZone;
                    let celcius = Math.floor((temperature-32) * (5/9));
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    //Change the degree to celcius from fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperaturesSpan.textContent === "F") {
                            temperaturesSpan.textContent = "C"
                            temperatureDegree.textContent = celcius;
                        }else {
                            temperaturesSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

});