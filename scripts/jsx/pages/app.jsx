import React 										  		  from 'react'
import { render } 											  from 'react-dom'
import { createStore, combineReducers } 					  from 'redux'
import { Provider } 										  from 'react-redux'
import { Router, Route, DefaultRoute, Link, browserHistory }  from 'react-router'

import usersReducers from '../reducers/users'
import mapsReducers from '../reducers/maps'

import RegisterPage from './register'
import LandingPage  from './landing'
import MapsPage 	from './maps'
import MapPage 		from './map'
import RootPage		from './root'

const store = createStore(combineReducers({
  user : usersReducers,
  maps : mapsReducers
}));

render((
	<Provider store={store}>
	  <Router history={browserHistory} onUpdate={function() {
	        if(typeof ga !== "undefined" && location && location.pathname){
	        	ga('send', 'pageview', location.pathname);
	        }
	    }}>
	    <Route component={RootPage}>
	    	<Route path="/" component={LandingPage}/>
	    	<Route path="/landing" component={LandingPage}/>
			<Route path="/maps" component={MapsPage}/>
			<Route path="/map/:mid" component={MapPage}/>
			<Route path="*" component={RegisterPage}/>
	    </Route>
	  </Router>
  	</Provider>
), document.getElementById('root'))

