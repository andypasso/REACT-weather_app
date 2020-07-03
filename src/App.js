import React, { Component } from 'react';
import './App.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import LocationList from './components/locationList';

const cities = [
  'Buenos Aires',
  'Bahia Blanca',
  'Londres',
  'Tokyo'
]
class App extends Component{
  handleSelectedLocation = city => {
    console.log(`handleSelectedLocation ${city}`);
  } 

  render() {
    return (
      <Grid>
        <Row>
          Titulo
        </Row>
        <Row>
          <Col xs={12} md={6}>

          <LocationList cities={cities} 
          onSelectedLocation={this.handleSelectedLocation}/>
          </Col>

          <Col xs={12} md={6}>
            <div className='details'></div>
          </Col>
        </Row>
      
      </Grid>
    );
  }
}

export default App;
