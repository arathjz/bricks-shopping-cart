import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models';
import api from './api/index';

const app = express();
app.use(bodyParser.json(), cors());

api(app, db);

app.listen(8080, () =>
	console.log('🚀 Welcome, App listening on port 8080! 🚀')
);
