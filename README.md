[![Build Status](https://travis-ci.com/d-beloved/populationrecorder.svg?branch=develop)](https://travis-ci.com/d-beloved/populationrecorder)
# Population Recorder
A population management system for managing location populations

The app is hosted on heroku [here](https://populationmgt.herokuapp.com/)
The API is documented [here](https://documenter.getpostman.com/view/5092825/SVfNuUSF?version=latest)

## Made With
    * Nodejs for server-side logic
    * Babel for transpiling
    * Express for api routes implementation
    * Heroku for hosting services
    * PostgresSql for the App's database

## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/d-beloved/populationrecorder.git ```
  * Run ```npm install``` to install the required dependencies
  * Navigate to http://localhost:3000

## Available APIs
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/location</td>
      <td>Creates a new location</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/location</td>
      <td>Get information about all created location</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/location/:locationId</td>
      <td>Updates a location information</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/location/:locationId</td>
      <td>Deletes a location record</td>
  </tr>
</table>

## License and Copyright
&copy; Moronkeji Ayodeji David

Licensed under the [MIT License](LICENSE).