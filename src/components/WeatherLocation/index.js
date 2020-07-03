import React, { Component } from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import getUrlByCity from '../../services/getUrlByCity'
import transformWeather from '../../services/transformWeather';


class WeatherLocation extends Component {

    constructor(props) {
        super(props);
        const { city } = props;

        this.state = {
            city,
            data: null
        };
    };

    componentDidMount() {
        this.handleUpdateclick()
    }

    componentDidUpdate(prevProps, prevState) {
    }

    
    

    handleUpdateclick = () =>
    {
        const url = getUrlByCity(this.state.city);
        fetch(url)
        .then((weather) => {
            return weather.json();
        })
        .then((data) => {
            const newWeather = transformWeather(data);
            this.setState({
                data:newWeather
            })
        });
    }

    render() {
        const { onWeatherLocationClick } = this.props
        const { city, data } = this.state
        return (
        <div className='weatherLocationCont' onClick={onWeatherLocationClick}>
            <Location city={city} ></Location>
            {data ? 
                <WeatherData data = {data} ></WeatherData>:
                <CircularProgress size={50}/>
            }
        </div>)
    };
    
};

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}


export default WeatherLocation