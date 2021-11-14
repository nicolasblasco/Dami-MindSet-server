const required = (req, res, next) => {
  if (
    !req.body.idClient ||
    !req.body.idProfile ||
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body.address ||
    !req.body.city ||
    !req.body.postalCode
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const idClient = req.body.idClient;
  const idProfile = req.body.idProfile;
  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status;
  const address = req.body.address;
  const city = req.body.city;
  const postalCode = req.body.postalCode;
  if (idClient) {
    if (idClient.length !== 24)
      return res.status(400).json("idClient must be 24 characters");
    if (idClient.search(/[a-z]/) < 0)
      return res.status(400).json("idClient must have at least 1 letter");
    if (idClient.search(/[0-9]/) < 0)
      return res.status(400).json("idClient must have at least 1 number");
  }
  if (idProfile) {
    if (idProfile.length !== 24)
      return res.status(400).json("idProfile must be 24 characters");
    if (idProfile.search(/[a-z]/) < 0)
      return res.status(400).json("idProfile must have at least 1 letter");
    if (idProfile.search(/[0-9]/) < 0)
      return res.status(400).json("idProfile must have at least 1 number");
  }
  if (name) {
    if (name.length > 50)
      return res
        .status(400)
        .json("Name must have equal or less than 50 characters");
    if (name.search(/[0-9]/) !== -1)
      return res.status(400).json("Name must not have numbers");
  }
  if (description) {
    if (description.length > 50)
      return res
        .status(400)
        .json("Description must have equal or less than 5000 characters");
  }
  if (status !== "DONE" && status !== "PENDING") {
    return res.status(400).json("Status must be DONE or PENDING");
  }
  if (address) {
    if (address.length < 5)
      return res.status(400).json("Address must be at least 5 characters");
    if (
      address.search(/[a-z]/i) < 0 ||
      address.search(/[0-9]/) < 0 ||
      address.indexOf(" ") === -1
    )
      return res
        .status(400)
        .json("The Address must have letters, numbers and at least 1 space");
    if (address.length > 50)
      return res
        .status(400)
        .json("Address must be equal or less than 50 characters");
  }
  if (city) {
    if (city.length < 3)
      return res.status(400).json("City must be at least 3 characters");
    if (city.length > 50)
      return res
        .status(400)
        .json("City must be equal or less than 50 characters");
  }
  if (postalCode) {
    if (postalCode.length < 4)
      return res.status(400).json("Postal Code must be at least 4 characters");
    if (postalCode.length > 8)
      return res
        .status(400)
        .json("Postal Code must be equal or less than 8 characters");
  }
  next();
};

module.exports = {
  required,
  validate,
};
