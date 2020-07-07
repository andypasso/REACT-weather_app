import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import ForecastItem from './ForecastItem';
import forecastExtended from '../services/transformForecast'
import transformForecast from '../services/transformForecast';

// const days = [
//     'Lunes',
//     'Martes',
//     'Miercoles',
//     'Jueves',
//     'Viernes'
// ];

// const data = {
//     temperature: 10,
//     humidity: 10,
//     weatherState: 'normal',
//     wind: 'normal',
// };
const api = {
    key: "4c4e39e4d19df4b03f3b39a7f44a5e0e",
    base: "https://api.openweathermap.org/data/2.5/forecast?q="
}

class ForecastExtended extends Component {

    constructor (){
        super();
        this.state ={
            forecastData: null
        }
    }

    componentDidMount() {

        const url_forecast = `${api.base}${this.props.city}&appid=${api.key}`

        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                this.setState( { forecastData } )
            }
        )
    
    }
    

    renderForecastItemDays() {
        return 'Render Items'
        // return days.map(day => <ForecastItem weekDay={day} hour='10' data={data}></ForecastItem>)
    }

    renderProgress() {
        return <h3>cargando pronostico extendido...</h3>
    }


    render() {
        const { city } = this.props;
        const { forecastData } = this.state;

        return (
        <div>
            <h2 className='forecastTitle'>Pronostico extendido para {city} </h2>

            {forecastData ?
            this.renderForecastItemDays() :
            this.renderProgress() }
        </div>
        )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;