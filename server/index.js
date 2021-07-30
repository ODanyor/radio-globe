const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 8000;

app.use(cors());

// Radio Garden API
const getPlacesUrl = () => 'http://radio.garden/api/ara/content/places';
const getStationsUrl = (cityId) => `http://radio.garden/api/ara/content/page/${cityId}`;
const getStationUrl = (stationId) => `http://radio.garden/api/ara/content/channel/${stationId}`;
const getStreamUrl = (stationId) => `http://radio.garden/api/ara/content/listen/${stationId}/channel.mp3`;

app.get('/api/places', async function(req, res) {
  await axios.get(getPlacesUrl()).then(({data}) => res.send(data));
});
app.get('/api/page/:cityId', async function (req, res) {
  const { cityId } = req.params;
  await axios.get(getStationsUrl(cityId)).then(({data}) => res.send(data));
});
app.get('/api/channel/:stationId', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getStationUrl(stationId)).then(({data}) => res.send(data));
});
app.get('/api/listen/:stationId', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getStreamUrl(stationId)).then(({data}) => res.send(data));
});

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
