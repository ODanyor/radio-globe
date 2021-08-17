const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router();
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
const getFavorites = () => `${address}/favorites`;

router.get('/api/places', async function(req, res) {
  await axios.get(getPlacesUrl()).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
router.get('/api/page/:stationId', async function(req, res) {
  const { stationId } = req.params;
  await axios.get(getChannelsUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
router.get('/api/channel/:channelId', async function(req, res) {
  const { channelId } = req.params;
  await axios.get(getChannelUrl(channelId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
router.get('/api/channel/:stationId/channels', async function(req, res) {
  const { stationId } = req.params;
  await axios.get(getAllChannelsUrl(stationId)).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});
router.get('/api/listen/:channelId', async function(req, res) {
  const { channelId } = req.params;
  return res.send({data: getStreamUrl(channelId)});
});
router.post('/api/favorites', async function(req, res) {
  const favorites = req.body.favorites;
  await axios.post(getFavorites(), {favorites}).then(
    ({data}) => res.send(data),
    (error) => res.status(500).send(error)
  );
});

app.use('/', router);
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
