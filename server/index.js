const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 8000;

app.use(cors());

// Radio Garden API
const getPlacesUrl = () => 'http://radio.garden/api/ara/content/places';
const getChannelsUrl = (stationId) => `http://radio.garden/api/ara/content/page/${stationId}`;
const getAllChannelsUrl = (stationId) => `http://radio.garden/api/ara/content/page/${stationId}/channels`;
const getChannelUrl = (channelId) => `http://radio.garden/api/ara/content/channel/${channelId}`;
const getStreamUrl = (channelId) => `http://radio.garden/api/ara/content/listen/${channelId}/channel.mp3`;

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
