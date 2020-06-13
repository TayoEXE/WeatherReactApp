import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const TITLE = 'Weather World'

class WeatherUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    document.title = TITLE;
    // Note to self, in order to get around CORS issues, use middleware to fetch the data for you, then display here
    const apiAnywhere = "https://cors-anywhere.herokuapp.com/";
    //const dataURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=050becb7435f1174269563c178929a29";
    const dataURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=050becb7435f1174269563c178929a29&q=Las%20Vegas,US";
    fetch(apiAnywhere + dataURL, {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      // If you are not sure if you are getting a JSON, try allowing it as text and logging it
      // .then(res => res.text())
      // .then(text => console.log(text))
      .then(
        (result) => {
          console.log("Results received:");
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Weather Data...</div>;
    } else {
      return (
        <DisplayWeather items={items}/>
      );
    }
  }
}

class DisplayWeather extends React.Component {
  render() {
    return (
      <Container className="p-3">
        <div>
          <h1>Welcome to Weather World</h1>
          <h2>Showing Current Weather for <u>{this.props.items.name}, {this.props.items.sys.country}</u></h2>
          <p>
            <b>Sky:</b> <u>{this.props.items.weather[0].main}</u>
            <img src={'http://openweathermap.org/img/wn/' + this.props.items.weather[0].icon + '@2x.png'}
            alt={this.props.items.weather[0].description}
            height='50'
            width='50'/>
          </p>
          <p>
            <b>Temperature: </b> <u>{Math.round(this.props.items.main.temp)}°F | {Math.round((this.props.items.main.temp - 32) * (5/9))}°C</u>
            , <b>Feels like: </b> <u>{Math.round(this.props.items.main.feels_like)}°F | {Math.round((this.props.items.main.feels_like - 32) * (5/9))}°C</u>
          </p>
          <p>
            <b>Humidity: </b> <u>{Math.round(this.props.items.main.humidity)}%</u>
          </p>
          <p>
            <b>Wind Speed:</b> <u>{this.props.items.wind.speed} mph</u>
          </p>
        </div>
      </Container>
    )
  }
}

// ========================================

ReactDOM.render(
  <WeatherUpdate />,
  document.getElementById('root')
);








// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
//
// class WeatherUpdate extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: []
//     };
//   }
//
//   componentDidMount() {
//     // Note to self, in order to get around CORS issues, use middleware to fetch the data for you, then display here
//     const apiAnywhere = "https://cors-anywhere.herokuapp.com/";
//     //const dataURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=050becb7435f1174269563c178929a29";
//     const dataURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=050becb7435f1174269563c178929a29&q=Las%20Vegas,US";
//     fetch(apiAnywhere + dataURL, {
//       mode: "cors",
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(res => res.json())
//       // If you are not sure if you are getting a JSON, try allowing it as text and logging it
//       // .then(res => res.text())
//       // .then(text => console.log(text))
//       .then(
//         (result) => {
//           console.log("Results received:");
//           console.log(result);
//           this.setState({
//             isLoaded: true,
//             items: result.list
//           });
//         }
//       )
//   }
//
//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <DisplayWeather items={items}/>
//       );
//     }
//   }
// }
//
// class DisplayWeather extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Welcome to Weather World</h1>
//         <ul>
//           {this.props.items.map(item => (
//             <li key={item}>
//               Feels Like: {Math.round((item.main.feels_like * (9/5) - 459.67) * 10) / 10}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }
//
// // ========================================
//
// ReactDOM.render(
//   <WeatherUpdate />,
//   document.getElementById('root')
// );












// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
//
// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: []
//     };
//   }
//
//   componentDidMount() {
//     const dataURL = "/data/2.5/forecast?id=524901&APPID=050becb7435f1174269563c178929a29"
//     fetch(dataURL, {
//       mode: "cors",
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(res => res.json())
//       // .then(res => res.text())
//       // .then(text => console.log(text))
//       .then(
//         (result) => {
//           console.log("Results received:");
//           console.log(result);
//           this.setState({
//             isLoaded: true,
//             items: result.list
//           });
//         }
//       )
//   }
//
//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <li key={items.dt}>
//           <b>Temp: {items.main}</b>
//         </li>
//       );
//     }
//   }
// }
//
// // ========================================
//
// ReactDOM.render(
//   <MyComponent />,
//   document.getElementById('root')
// );







// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
//
// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: []
//     };
//   }
//
//   componentDidMount() {
//     console.log("Hi");
//     fetch("http://jsonplaceholder.typicode.com/users", {
//       mode: "cors",
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       }
//     })
//       .then(res => res.json())
//       .then(
//         (result) => {
//           console.log("Made it");
//           this.setState({
//             isLoaded: true,
//             items: result
//           });
//         }
//       )
//   }
//
//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <ul>
//           {items.map(item => (
//             <li key={item.name}>
//               {item.name} {item.username}
//             </li>
//           ))}
//         </ul>
//       );
//     }
//   }
// }
//
// // ========================================
//
// ReactDOM.render(
//   <MyComponent />,
//   document.getElementById('root')
// );
