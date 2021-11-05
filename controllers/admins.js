const fs = require('fs');
const admins = JSON.parse(fs.readFileSync('./data/admins.json'));

const getAll = (req, res) => {
  res.json(admins);
};

const getById = (req, res) => {
  const admin = admins.find(admin => admin.id === parseInt(req.params.id));
  if (admin) {
    res.json(admin);
  } else {
    res.send('User not found');
  }
};

module.exports = {
  getAll: getAll,
  getById: getById
};