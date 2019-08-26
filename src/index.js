import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import log from 'fancy-log';
import router from './routes';

// Create global app object
const app = express();

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
// set view engine as pug
app.set('view engine', 'pug');

app.use(router);

// console.log('environment', process.env.DATABASE_URL);
const server = app.listen(process.env.PORT || 3000, () => {
  log(`Listening on port ${server.address().port}`);
});

export default app;
