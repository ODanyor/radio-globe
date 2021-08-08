const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 8000;

app.use(cors());

// Radio Garden API
const getPlacesUrl = () => 'http://radio.garden/api/ara/content/places';
const getChannelsUrl = (stationId) => `http://radio.garden/api/ara/content/page/${stationId}`;
const getAllChannelsUrl = (stationId) => `http://radio.garden/api/ara/content/page/B7DS4V1m/channels`;
const getChannelUrl = (stationId) => `http://radio.garden/api/ara/content/channel/${stationId}`;
const getStreamUrl = (stationId) => `http://radio.garden/api/ara/content/listen/${stationId}/channel.mp3`;

app.get('/api/places', async function(req, res) {
  await axios.get(getPlacesUrl()).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
app.get('/api/page/:stationId', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getChannelsUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
app.get('/api/channel/:stationId', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getChannelUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
app.get('/api/channel/:stationId/channels', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getAllChannelsUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
app.get('/api/listen/:stationId', async function (req, res) {
  const { stationId } = req.params;
  await axios.get(getStreamUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
