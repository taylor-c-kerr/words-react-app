import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import Home from '../Home/index';
import Word from '../Word/index';
import './styles.css';

class App extends React.Component{
	render() {
		const router = <Router>
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/:id" component={Word}/>
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
