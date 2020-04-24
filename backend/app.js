let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  dotenv = require("dotenv"),
  cors = require('cors'),
  bodyParser = require('body-parser');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

const todoRouter = require('../backend/routes/todo.route')
const userRouter = require('../backend/routes/user.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/misc-app')));
app.use('/', express.static(path.join(__dirname, 'dist/misc-app')));
app.use('/api', todoRouter)
app.use('/api', userRouter)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});