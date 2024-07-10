const { ObjectId } = require("mongodb");
const mongoConnect = require("../config/mongo");

// GET
const getUsers = async (req, res) => {
  try {
    const db = await mongoConnect();
    const cursor = await db.collection("users").find({});
    const users = await cursor.toArray();
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ error: "List of users not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
    console.error("Error getting list of users -----------", error);
    throw error;
  }
};

// GET BY ID
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const db = await mongoConnect();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
    console.error("Error getting a user by id --------", error);
    throw error;
  }
};

// POST
const createUser = async (req, res) => {
  const user = req.body;
  try {
    const db = await mongoConnect();
    const data = await db.collection("users").insertOne(user);
    if (data.acknowledged) {
      const newUser = await db
        .collection("users")
        .findOne({ _id: data.insertedId });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    console.error("Error creating a user --------", error);
    throw error;
  }
};

// UPDATE
const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const db = await mongoConnect();
    const updateUser = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });
    if (updateUser.acknowledged) {
      const updatedUser = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "User updated", updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
    console.error("Error updating a user", error);
    throw error;
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const db = await mongoConnect();
    const deletedUser = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    if (deletedUser.acknowledged) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
    console.error("Error deleting a user", error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
