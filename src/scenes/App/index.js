import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import Home from '../Home/index';
import Word from '../Word/index';
import AddWord from '../Word/scenes/Add/index';
import './styles.css';

class App extends React.Component{
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={Home} />
					<Route path="/:id" component={Word}/>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;
