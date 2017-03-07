import React 									from 'react'
import { render } 								from 'react-dom'
import { createStore } 							from 'redux'
import { Provider } 							from 'react-redux'
import { Router, Route, Link, browserHistory }  from 'react-router'

import usersReducers from '../reducers/users'

import RegisterPage from './register'
import MapsPage 	from './maps'
import RootPage		from './root'

const store = createStore(usersReducers);

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

