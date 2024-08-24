import express from "express";
import mysqlDb from '../mysqlDb';
import {News, NewsMutation} from '../types';
import {imagesUpload} from '../multer';
import {ResultSetHeader} from 'mysql2';

const newsRouter = express.Router();

newsRouter.get("/", async (_req, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query("SELECT id, title, image, date FROM news");
    const news: News[] = result[0] as News[];
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single(''), async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({ error: 'Title and description are required!' });
  }

  const existingResult = await mysqlDb.getConnection().query(
    'SELECT * FROM news WHERE title = ?',
    [req.body.title]
  );
  const existingNews = existingResult[0] as News[];

  if (existingNews.length > 0) {
    return res.status(400).send({ error: 'A news item with this title already exists!' });
  }

  const new_news: NewsMutation = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO news(title, description, image) VALUES (?, ?, ?)',
    [new_news.title, new_news.description, new_news.image]
  );
  const resultHeader = insertResult[0] as ResultSetHeader;
  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM news WHERE id = ?',
    [resultHeader.insertId]
  );
  const products = getNewResult[0] as News[];
  return res.send(products[0]);
});

export default newsRouter;