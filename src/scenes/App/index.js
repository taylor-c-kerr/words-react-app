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
		const router = <Router>
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/word/:id" component={Word}/>
				<Route path="/add" component={AddWord}/>
			</div>
		</Router>;

		return (
			<div className="App">
				<Header />
				{router}
				<Footer />
			</div>
		)
	}
}

export default App;
