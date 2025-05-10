import app from '../src/index.js';
import serverless from 'serverless-http';


app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export const handler = serverless(app);
