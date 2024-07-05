import user from "models/user.model.js";
import NotFoundError from "../error/NotFoundError.js";

//########## API - 1 Get All Users //##########
const getAllUsers = async (req, res, next) => {
  try {
    const users = await user.getUsers();
    res.status(200).json({ message: "Get All Users", data: users });
  } catch (error) {
    next(error);
  }
};
//########## API - 2 Get User By ID //##########
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await user.getUserById(Number(id));
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    res.status(200).json({ message: "Get User By ID", data: user });
  } catch (error) {
    next(error);
  }
};
//########## API - 3 POST LOGIN //##########