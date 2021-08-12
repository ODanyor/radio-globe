import { Route } from 'react-router-dom';
import { ExplorePage, FavoritesPage, HomePage, SearchPage } from 'pages';

function Routes() {
  return (
    <Route>
      <Route exact path="/" component={HomePage} />
      <Route exact path={['/:method/:title/:id', '/:method/:title/:id/:option']} component={ExplorePage} />
      <Route exact path="/favorites" component={FavoritesPage} />
      <Route exact path="/search" component={SearchPage} />
    </Route>
  );
}

export default Routes;
