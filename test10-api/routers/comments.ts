import express from "express";
import mysqlDb from '../mysqlDb';
import {Comments, CommentsMutation, News,} from '../types';
import {ResultSetHeader} from 'mysql2';

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

commentsRouter.post('/', async (req, res) => {
  if (!req.body.news_id|| !req.body.description) {
    return res.status(400).send({ error: 'News_id and description are required!' });
  }

  const existingResult = await mysqlDb.getConnection().query(
    'SELECT * FROM news WHERE title = ?',
    [req.body.title]
  );
  const existingNews = existingResult[0] as News[];

  if (existingNews.length > 0) {
    return res.status(400).send({ error: 'A news item with this title already exists!' });
  }

  const comment: CommentsMutation = {
    news_id: req.body.news_id,
    author: req.body.author,
    description: req.body.description,

  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO comments(news_id, author, description) VALUES (?, ?, ?)',
    [comment.news_id, comment.author, comment.description]
  );
  const resultHeader = insertResult[0] as ResultSetHeader;
  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM comments WHERE id = ?',
    [resultHeader.insertId]
  );
  const products = getNewResult[0] as News[];
  return res.send(products[0]);
});

export default commentsRouter;