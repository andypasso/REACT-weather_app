import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import ForecastItem from './ForecastItem';
import forecastExtended from '../services/transformForecast'
import transformForecast from '../services/transformForecast';


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
        this.updateCity(this.props.city)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.city !== this.props.city) {
            this.setState({ forecastData:null })
            this.updateCity(nextProps.city)
        }
    }

    updateCity = (city) => {

        const url_forecast = `${api.base}${city}&appid=${api.key}`

        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData)
                this.setState( { forecastData } )
            }
        )
    
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map( forecast => (
            <ForecastItem 
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay}
                hour={forecast.hour}
                data={forecast.data}>
            </ForecastItem>))
    }

    renderProgress() {
        return <h3>cargando pronostico extendido...</h3>
    }


    render() {
        const { city } = this.props;
        const { forecastData } = this.state;

        return (
        <div>
            <h2 className='forecastTitle'>Pronóstico extendido para {city} </h2>

            {forecastData ?
            this.renderForecastItemDays(forecastData) :
            this.renderProgress() }
        </div>
        )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;