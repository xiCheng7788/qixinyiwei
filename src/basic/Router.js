import React,{Component} from 'react'
import {Router,Route,IndexRoute,browserHistory} from 'react-router'

import {TopNav} from '../TopNav/Index'
import {Home as Index} from '../page/home/Index'
import {About} from '../page/about/Index'
import {New} from '../page/new/Index'
import {NewDetail} from '../page/newdetail/Index'
import LoginTop from '../page/login/logintop/logintop'
import {WrappedNormalLoginForm} from '../page/login/Index'
import {WrappedNormalRegisterForm} from '../page/login/Index'

import {Provider} from 'react-redux'
import store from './store'
import './reset.scss'
import './basic.scss'

class App extends Component{
	render(){
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={TopNav}>
						<IndexRoute  component={Index}></IndexRoute>
						<Route path="/home" component={Index}/>
						<Route path="/about" component={About}/>
						<Route path="/new" component={New}/>
						<Route path="/newdetail/:id" component={NewDetail}/>
					</Route>
					<Route path="/login" component={LoginTop}>
						<IndexRoute  component={WrappedNormalLoginForm}></IndexRoute>
						<Route path="/login/register" component={WrappedNormalRegisterForm}/>
					</Route>
				</Router>
			</Provider>

		)
	}
}
export default App