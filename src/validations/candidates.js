/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
const info = require("../controllers/candidates");
const validations = require("./validations");

const requiredPersonalInfo = (req, res, next) => {
  const data = req.body;
  if (
    !data.name
    || !data.email
    || !data.username
    || !data.password
    || !data.address
    || !data.phoneNumber
    || !data.dateOfBirth
    || !data.zipCode
    || !data.city
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  next();
};

const requiredEducation = (req, res, next) => {
  const data = req.body;
  if (
    !data.institution
    || !data.startDate
    || !data.level
    || !data.title
    || data.inProgress === undefined
    || (!data.inProgress && !data.finishDate)
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  if (data.inProgress && data.finishDate) {
    return res
      .status(400)
      .json({ msg: "Current education can't have a finish date" });
  }
  next();
};

const requiredWorkExperience = (req, res, next) => {
  const data = req.body;
  if (
    !data.company
    || !data.role
    || !data.startDate
    || !data.description
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const data = req.body;
  let result;
  const fields = [
    ...info.allInfo,
    ...info.educationInfo,
    ...info.workExperienceInfo,
  ];
  for (let i = 0; i < fields.length; i++) {
    if (data[fields[i]]) {
      result = validations[fields[i]](data[fields[i]]);
      if (result.error) break;
    }
  }
  if (result.error) {
    return res.status(400).json({ msg: result.errorMsg });
  }
  next();
};

module.exports = {
  requiredPersonalInfo,
  requiredEducation,
  requiredWorkExperience,
  validate,
};
