import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { UniversalComponent, MenuItem } from '../common/components/web';
import reducers from './reducers';

import Feature from '../ClientConnector';

export default new Feature({
  route: [
    <Route exact path="/$module$">
      <UniversalComponent page={'$module$/containers/$Module$'} />
    </Route>
  ],
  navItem: (
    <MenuItem key="$module$">
      <NavLink to="/$module$" className="nav-link" activeClassName="active">
        $Module$
      </NavLink>
    </MenuItem>
  ),
  reducer: { $module$: reducers }
});
