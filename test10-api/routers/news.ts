import express from "express";
import mysqlDb from '../mysqlDb';
import {News} from '../types';

const newsRouter = express.Router();

newsRouter .get("/", async (req, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query("SELECT id, title, image, date FROM news");
    const news: News[] = result[0] as News[];
    return res.send(news);
  } catch (e) {
    next(e);
  }
})

export default newsRouter;