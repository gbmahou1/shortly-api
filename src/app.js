import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import router from './routes/index.js';
import validateTokenMiddleware from './middlewares/validateTokenMiddleware'
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})

app.post('/urls/shorten', async (req, res) => {

  try
  {
    const { url } = req.body;

    console.log(url)

    validateTokenMiddleware(req, res, next)

    res.sendStatus(201)
  }
  catch(error)
  {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get('/urls/:shortUrl', async (req, res) => 
{
  try
  {
    const shortUrl = req.params.shortUrl;

    if (!shortUrl)
    {
      return res.sendStatus(404)
    }

    const urls = await connection.query('SELECT * FROM urls WHERE shortUrl=$1', [shortUrl]);

    res.send(urls.rows)
    res.sendStatus(200)
  }
  catch (error)
  {
    console.log(error)
    res.sendStatus(500)
  }
})

app.delete('/urls/:id', async (req, res) => {

  const id = req.params.id;

  const urls = await connection.query('SELECT * FROM urls WHERE id = $1', [id]);

  if (urls.rows.length === 0)
  {
      return res.sendStatus(401)
  }

  await connection.query(`DELETE FROM urls WHERE id = $1`, [id]);

  return res.sendStatus(204);

})

app.get('/users/:id', async (req, res) => {

  const id = req.params.id;

  const users = await connection.query('SELECT * FROM users WHERE id=$1', [id])

  if ( users.rows.length === 0 )
  {
      return res.sendStatus(404);
  }

  return res.send(users.rows)
})
