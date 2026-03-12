async function getWeather(cities, info = 'all') {
    if (!Array.isArray(cities)) {
        cities = [cities];
    }
    const fetchCityWeather = async (city) => {
        try {
            let url = `http://localhost:3000/weather?city=${encodeURIComponent(city)}`;
            if (info !== 'all') {
                url += `&info=${encodeURIComponent(info)}`;
            }
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            console.log(`CITY: ${data.city}`);
            const weather = data.weather || {};
            if (weather.wind) {
                console.log(`WIND: ${weather.wind.speed} m/s, ${weather.wind.deg} deg`);
                if (weather.wind.speed > 15) {
                    console.log(`WARNING! Wind speed over 15 m/s`);
                }
            } else {
                console.log(`WIND: 0 m/s, 0 deg`);
            }
            if (info === 'all' || info === 'clouds') {
                console.log(`CLOUDS: ${weather.clouds ?? 0} %`);
            }
            if (info === 'all' || info === 'temp') {
                console.log(`TEMP: ${weather.temp ?? 0} C`);
                if ((weather.temp ?? 0) < -20) {
                    console.log(`WARNING! Temperature below -20 degrees`);
                }
            }
            if (info === 'all' || info === 'precipitation') {
                console.log(`PRECIPITATION: ${weather.precipitation ?? 0} %`);
            }
            console.log('');
        } catch (err) {
            console.log(`CITY: ${city}`);
            console.log('Unable to retrieve weather data:', err.message);
            console.log('');
        }
    };
    await Promise.all(cities.map(fetchCityWeather));
}


// --- Test examples ---
getWeather('Berlin', 'wind');
getWeather(['Oslo', 'Yakutsk'], 'all');