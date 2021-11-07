const express = require('express');
const app = express();
const port = 3000;
const clientsController = require('./controllers/clients');
const candidatesController = require('./controllers/candidates');
const adminsController = require('./controllers/admins');
const positionsController = require('./controllers/positions.js');
const sessionsController = require('./controllers/sessions.js');
const profilesController = require('./controllers/profiles.js');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//CLIENTS//LIST
app.get('/clients', clientsController.getAll);
app.get('/clients/byId/:id', clientsController.getById);
app.get('/clients/byName/:name', clientsController.getByName);
app.get('/clients/byPhoneNumber/:phoneNumber', clientsController.getByPhoneNumber);
app.get('/clients/byCuit/:cuit', clientsController.getByCuit);
app.get('/clients/byAddress/:address', clientsController.getByAddress);
app.get('/clients/byActivity/:activity', clientsController.getByActivity);
//CLIENTS//UPDATE



//CANDIDATES
app.get('/candidates', candidatesController.getAll);
app.get('/candidates/byId/:id', candidatesController.getById);
app.get('/candidates/byName/:name', candidatesController.getByName);
app.get('/candidates/create', candidatesController.create);

//ADMIN
app.get('/admins', adminsController.getAll);
app.get('/admins/byId/:id', adminsController.getById);
app.get('/admins/byName/:name', adminsController.getByName);

// POSITIONS
app.get('/positions', positionsController.getAll);
app.get('/positions/byId/:id', positionsController.getById);
app.get('/positions/byName/:name', positionsController.getByName);
app.get('/positions/create', positionsController.create);
app.get('/positions/update/:id', positionsController.update);

//SESSIONS
app.get('/sessions/create', sessionsController.create);
app.get('/sessions/update/:id', sessionsController.update);

// PROFILES
app.get('/profiles', profilesController.getAll);
app.get('/profiles/create', profilesController.create);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});
