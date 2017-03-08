import React 									from 'react'
import { render } 								from 'react-dom'
import { createStore, combineReducers } 		from 'redux'
import { Provider } 							from 'react-redux'
import { Router, Route, Link, browserHistory }  from 'react-router'

import usersReducers from '../reducers/users'
import mapsReducers from '../reducers/maps'

import RegisterPage from './register'
import MapsPage 	from './maps'
import RootPage		from './root'

const store = createStore(combineReducers({
  user : usersReducers,
  maps : mapsReducers
}));

render((
	<Provider store={store}>
	  <Router history={browserHistory}>
	    <Route path="/" component={RootPage}>
	      <Route path="/maps" component={MapsPage}/>	
	      <Route path="*" component={RegisterPage}/>
	    </Route>
	  </Router>
  	</Provider>
), document.getElementById('root'))

