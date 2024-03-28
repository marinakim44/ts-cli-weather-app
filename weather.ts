import { fetchLocationData } from "./location";
import { fetchWeatherData } from "./weatherapi";
import type { LocationInfo } from "./location";

const GEOCODE_API_URL = "https://geocode.maps.co/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

async function main(): Promise<number> {
  if (process.argv.length !== 3) {
    console.error("usage: weather LOCATION");
    return 1; // 1 will be error
  }
  // get location
  const location = process.argv[2];

  // convert to lat/long
  let locationInfo: LocationInfo;

  try {
    locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
  } catch (err) {
    console.log(err);
    return 1;
  }

  // fetch weather data
  console.log(`Fetching weather data for ${locationInfo.display_name}`);
  try {
    const weather = await fetchWeatherData(
      WEATHER_API_URL,
      locationInfo.lat,
      locationInfo.lon
    );
    console.log(weather.format());
  } catch (err) {
    console.error(err);
    return 1;
  }

  // display weather data

  return await Promise.resolve(0);
}

main().catch((err) => console.error(err));
