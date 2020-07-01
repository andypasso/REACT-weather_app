
import convert from 'convert-units';
import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,

} from '../constants/weathers';

const getTemp = k => {
    return Number(convert(k).from('K').to('C').toFixed(2));
}


const getWeatherState = weather_data => {
    return SUN;
}

const transformWeather = weather_data => {
    const {humidity, temp} = weather_data.main;
    const { speed } = weather_data.wind;
    const weatherState = getWeatherState();
    const temperature = getTemp(temp);

    const data = {
        temperature,
        weatherState,
        humidity,
        wind: `${speed} m/s`
    };
    
    return data

}

export default transformWeather