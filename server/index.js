import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 3030;

// JSON 요청 본문을 파싱하기 위한 미들웨어 추가
app.use(express.json());

// CORS 에러 방지를 위한 미들웨어 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// post multi-upload api로 접근하면 multi upload 되도록 만들어 줘
// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 업로드된 파일이 저장될 디렉토리
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// 다중 파일 업로드를 위한 API 엔드포인트
app.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('파일이 업로드되지 않았습니다.');
  }

  const fileInfos = req.files.map(file => ({
    originalname: file.originalname,
    filename: file.filename,
    path: file.path
  }));

  res.status(200).json({
    message: '파일이 성공적으로 업로드되었습니다.',
    files: fileInfos
  });
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


app.get('/', (req, res) => {
  res.send('Hello from the server!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});