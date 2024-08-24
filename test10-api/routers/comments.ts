import express from "express";
import mysqlDb from '../mysqlDb';
import {Comments} from '../types';

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res, next) => {
  try {
    const { news_id } = req.query;

    let sql = "SELECT * FROM comments";
    const params: any[] = [];

    if (news_id) {
      sql += " WHERE news_id = ?";
      params.push(news_id);
    }

    const result = await mysqlDb.getConnection().query(sql, params);
    const comments = result[0] as Comments[];

    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

export default commentsRouter;