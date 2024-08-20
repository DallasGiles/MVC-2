const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const { sessionConfig } = require('./config/auth');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const { User, Post, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 3002;

app.engine('handlebars', exphbs.create({ defaultLayout: 'main' }).engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionConfig));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// Sync models in a specific order and then start the server
sequelize.sync({ force: true })  // This is the key line for number three
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });