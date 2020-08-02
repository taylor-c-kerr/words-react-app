import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Home from '../Home/Home.tsx';
import Word from '../Word/Word';
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
