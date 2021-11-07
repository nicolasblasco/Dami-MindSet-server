const fs = require('fs');
let candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-04: update candidates

const update = (req, res) => {
  const candidate = candidates.find(candidate => candidate.id === req.params.id);
  const index = candidates.findIndex(candidate => candidate.id === req.params.id);
  if (candidate) {
      candidate.name = req.query.name ? req.query.name : candidate.name,
      candidate.email = req.query.email ? req.query.email : candidate.email,
      candidate.gender = req.query.gender ? req.query.gender : candidate.gender,
      candidate.address = req.query.address ? req.query.address : candidate.address,
      candidate.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : candidate.phoneNumber,
      candidate.dni = req.query.dni ? req.query.dni : candidate.dni,
      candidate.dateOfBirth  = req.query.dateOfBirth ? req.query.dateOfBirth : candidate.dateOfBirth,
      candidate.city = req.query.city ? req.query.city : candidate.city,
      candidate.state = req.query.state ? req.query.state : candidate.state,
      candidate.country = req.query.country ? req.query.country : candidate.country,
      candidate.timeRange = req.query.timeRange ? req.query.timeRange : candidate.timeRange,
      candidate.status = req.query.status ? req.query.status : candidate.status,
      candidate.username = req.query.username ? req.query.username : candidate.username,
      candidate.password = req.query.password ? req.query.password : candidate.password
    candidates[index] = candidate;
    res.json(candidate);
  } else {
    res.send('User not updated');
  }
};

module.exports = {
  update: update
}