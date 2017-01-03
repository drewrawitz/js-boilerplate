// inferno module
import Inferno from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './components/MyApp';
import VersionComponent from './components/VersionComponent';
import AboutComponent from './components/AboutComponent';

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ MyApp }>
			<Route path="/" component={ VersionComponent } />
			<Route path="about" component={ AboutComponent } />
		</Route>
	</Router>
);

Inferno.render(routes, document.getElementById('app'));