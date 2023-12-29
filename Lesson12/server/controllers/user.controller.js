const {
  createUserService,
  findAllService,
  getTotalAgeService,
  findOneService,
  findOneByID,
} = require("../services/user.service");

const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError("username and password are required", 400);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.HASHED_ROUND
    );

    const newUser = await createUserService(username, hashedPassword);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError("username and password are required", 400);
    }

    const user = await findOneService(username);

    if (!user) {
      throw new AppError(`${username} not found`, 404);
    }

    const exacted = await bcrypt.compare(password, user.password);

    if (!exacted) {
      throw new AppError(`Password is not correct`, 400);
    }


    res.json("OK");
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await findAllService();

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  const ID = req.params.id;

  try {
    const user = await findOneByID(ID);
    if (!user) {
      throw new AppError(`ID ${ID} not found`, 404);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getTotalAge = async (req, res, next) => {
  try {
    const result = await getTotalAgeService();
    res.json(result);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createUser,
  findAll,
  getTotalAge,
  logIn,
  findOne,
};