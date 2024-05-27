import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3055;

// JSON 요청 본문을 파싱하기 위한 미들웨어 추가
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// JWT token 시작
const secretKey = 'your_secret_key_here';

app.post('/token', (req, res) => {
  console.log(req.body);

  if(req.body) {
    const payload = {
      username: req.body.username,
      time: Date.now()
    };
  
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  
    res.json({ token });
  }

});
