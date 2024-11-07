const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const qrRoutes = require('./routes/qrRoutes');
const drinkRoutes = require('./routes/drinksRoutes');
const drinkLogsRoutes = require('./routes/drinkLogsRoutes');
const taskRoutes = require('./routes/tasksRoutes'); 

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(session({
  secret: 'replay',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

app.use('/api/auth', authRoutes);
app.use('/api/qrcodes', qrRoutes);

app.use('/api/drinks', drinkRoutes); 
app.use('/api/drink-logs', drinkLogsRoutes); 
app.use('/api/tasks', taskRoutes); 

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
