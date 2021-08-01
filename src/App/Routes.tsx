import { Route } from 'react-router-dom';
import { ExplorePage, SearchPage, FavoritesPage } from 'pages';

function Routes() {
  return (
    <Route>
      <Route exact path="/:method/:title/:id" component={ExplorePage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/favorites" component={FavoritesPage} />
    </Route>
  );
}

export default Routes;
