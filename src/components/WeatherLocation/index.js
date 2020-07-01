import React, { Component } from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress'
import transformWeather from '../../services/transformWeather';
import api from '../../constants/api_url'
import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,

} from '../../constants/weathers';

const location = 'Buenos Aires,ar'


class WeatherLocation extends Component {

    constructor() {
        super();
        this.state = {
            city: 'Buenos Aires',
            data: null
        };
        console.log('constructor')
    };

    componentDidMount() {
        this.handleUpdateclick()
        console.log('componentDidMount')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
    }

    
    

    handleUpdateclick = () =>
    {
        fetch(`${api.base}${location}&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then((data) => {
            const newWeather = transformWeather(data);
            console.log(newWeather)
            this.setState({
                data:newWeather
            })
        });
    }

    render() {
        console.log('render')
        const { city, data } = this.state
        return (
        <div className='weatherLocationCont'>
            <Location city={city}></Location>
            {data ? 
                <WeatherData data = {data} ></WeatherData>:
                <CircularProgress size={50}/>
            }
        </div>)
    };
    
};

export default WeatherLocation