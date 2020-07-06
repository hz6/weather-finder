import React from 'react';
import './App.css';
import Titles from "./components/Titles";
import Form from './components/Form';
import Weather from './components/Weather';
import keys from './config/keys';


class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={};
  // }
  // Deprecated in React 16

  state = {
    temperature:undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined
  }

  getWeather = async (event) => {
    event.preventDefault()// prevent default action like auto-refresh...
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    // API: 一个URL + 特定用途的function
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${keys.API_KEY}&units=metrics`);
    const data = await api_call.json();

    if(city && country){
      console.log(data)
      if (data.cod==='404'){
        return;
      }
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    } else {
      this.setState({
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:'please enter the values'
      })
    } 
  }

  clearWeatherInfo(){
    this.setState({
      temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:''
    })
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                  clearWeatherInfo={this.clearWeatherInfo}
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default App;
