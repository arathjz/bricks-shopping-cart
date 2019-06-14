import React, { Fragment } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import MainView from './main-view';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
	<Fragment>
		<MainView />
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar
			newestOnTop={false}
			rtl={false}
			pauseOnVisibilityChange={false}
			draggable
			pauseOnHover={false}
			transition={Slide}
		/>
	</Fragment>
);

export default App;
