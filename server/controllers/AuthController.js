import User from "../models/user.js";
import Role from "../models/role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import  config  from "../config.js";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, config.secret,{expiresIn: "24h"})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({ message:"Ошибка при регистрации ", errors })
      }
      const { name, email, password } = req.body
      console.log(req.body)
      const candidate = await User.findOne({email})
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким Email-ом уже существует" })
      }
      const hashPassword = bcrypt.hashSync(password,7)
      const userRole = await Role.findOne({ value:"USER" })
      const testsData = []
      const user = new User({ name,email,password:hashPassword,roles:[userRole.value],testsData })
      await user.save()
      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Registration Error"});
    } 
  }
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({message:`Пользователь ${email} не найден `})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Введен неверный пароль'})
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.roles[0],
        testsData:user.testsData,
        token})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Login Error"});
    }
  }

}

export default new AuthController();