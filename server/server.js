import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './routes/authRoutes.js';
import DB_connection from './DBConfig.js';
import modelRouter from './routes/modelRoutes.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json())
app.use(cookieParser());

console.log(process.env.BASE_URL, process.env.BASE_URL2);
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: [process.env.BASE_URL, process.env.BASE_URL2, "https://digital-sell.vercel.app", process.env.PORTFOLiO_URL],
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PATCH"]
}))

app.get('/', (req, res) => {

    res.send('Hello World!')
})
/* -------------------------------S3---------------------------------- */

app.use('/api/auth', authRouter)
app.use('/api/models',modelRouter )

await DB_connection().then(() => {
    console.log('✅ Connected to userDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to databases:', err);
    process.exit(1); // Stop the app if DB connections fail
  });