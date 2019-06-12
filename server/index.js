import express from 'express';
import bodyParser from 'body-parser';
import db from './models';
import api from './api/index';

const app = express();
app.use(bodyParser.json());
api(app, db);
console.log('🔥 Connecting with database 🔥');
db.sequelize
	.then(() => {
		app.listen(8080, () => console.log('🚀 App listening on port 8080! 🚀'));
	})
	.catch(err => {
		console.log('Something went wrong :(');
		console.log(err);
	});
