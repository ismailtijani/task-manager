const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../src/models/task");
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "sot",
  email: "sot@example.com",
  password: "adeb123!",
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userOneId,
        },
        process.env.JWT_SECRET
      ),
    },
  ],
};

const userTwo = {
  _id: userTwoId,
  name: "Akanbi",
  email: "Akanbi@example.com",
  password: "adeb123!",
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userTwoId,
        },
        process.env.JWT_SECRET
      ),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  setupDatabase,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
};
