import { Route } from 'react-router-dom';
import { ExplorePage, SearchPage, FavoritesPage } from 'pages';

function Routes() {
  return (
    <Route>
      <Route exact path="/:method/:city/:stationId" component={ExplorePage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/favorites" component={FavoritesPage} />
    </Route>
  );
}

export default Routes;
