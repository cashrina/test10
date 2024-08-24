import express from "express";
import mysqlDb from '../mysqlDb';
import {News, NewsMutation} from '../types';
import {imagesUpload} from '../multer';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const newsRouter = express.Router();

newsRouter.get("/", async (_req, res, next) => {
  const connection = mysqlDb.getConnection();
  try {
    const result = await connection.query("SELECT id, title, image, date FROM news");
    const news: News[] = result[0] as News[];
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single(''), async (req, res) => {
  const connection = mysqlDb.getConnection();
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({ error: 'Title and description are required!' });
  }

  const existingResult = await connection.query(
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

  const insertResult = await connection.query(
    'INSERT INTO news(title, description, image) VALUES (?, ?, ?)',
    [new_news.title, new_news.description, new_news.image]
  );
  const resultHeader = insertResult[0] as ResultSetHeader;
  const getNewResult = await connection.query(
    'SELECT * FROM news WHERE id = ?',
    [resultHeader.insertId]
  );
  const products = getNewResult[0] as News[];
  return res.send(products[0]);
});

newsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send({ error: 'Invalid category ID' });
  }

  try {
    const connection = mysqlDb.getConnection();

    const getResult = await connection.query<RowDataPacket[]>(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    const new_news = getResult[0] as News[];

    if (new_news.length === 0) {
      return res.status(404).send({ error: 'News not found!' });
    }

    return res.send(new_news[0]);
  } catch (error) {
    console.error('Error operation:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});


newsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const connection = mysqlDb.getConnection();

  if (isNaN(id)) {
    return res.status(400).send({ error: 'Invalid news ID' });
  }

  try {
    await connection.query<ResultSetHeader>(
      'DELETE FROM comments WHERE news_id = ?',
      [id]
    );

    const [deleteNewsResult] = await connection.query<ResultSetHeader>(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    if (deleteNewsResult.affectedRows === 0) {
      return res.status(404).send({ error: 'News not found!' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error operation:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});


export default newsRouter;