const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 8000;
const address = 'http://radio.garden/api/ara/content';

app.use(cors());


// Radio Garden API
const getPlacesUrl = () => `${address}/places`;
const getChannelsUrl = (stationId) => `${address}/page/${stationId}`;
const getAllChannelsUrl = (stationId) => `${address}/page/${stationId}/channels`;
const getChannelUrl = (channelId) => `${address}/channel/${channelId}`;
const getStreamUrl = (channelId) => `${address}/listen/${channelId}/channel.mp3`;

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
app.get('/api/channel/:channelId', async function (req, res) {
  const { channelId } = req.params;
  await axios.get(getChannelUrl(channelId)).then(
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
app.get('/api/listen/:channelId', async function (req, res) {
  const { channelId } = req.params;
  return res.send({data: getStreamUrl(channelId)});
  // await axios.get(getStreamUrl(channelId)).then(
  //   ({data}) => res.send(data),
  //   (error) => res.status(500).send(error)
  // );
});

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
