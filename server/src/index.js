import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoute from './routes/user.route.js'
import blogPostRoute from './routes/blog.route.js'
import categoryRoute from './routes/category.route.js'
import productRoute from './routes/product.route.js'
import adminRoute from './routes/admin.route.js'
import cartRoute from  './routes/cart.route.js'
import orderRoute from './routes/order.route.js'
import contactRoute from './routes/contact.route.js'
import blogComment from './routes/blogComment.route.js'

connectDB();
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [
  'https://aim-for-more.vercel.app',
  'https://aim-for-more-498j.vercel.app', // your frontend domain
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.options('*', cors(corsOptions)); // Handle preflight
app.use(cors(corsOptions)); // This enables CORS on all routes


// app.use(cors({
//   credentials: true,
//   origin: 'https://aim-for-more-498j.vercel.app/',
//   methods: 'PUT, POST, GET, DELETE, PATCH, HEAD'
// }));


app.use('/api/users', userRoute)
app.use('/api/blog', blogPostRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/admin', adminRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/contact', contactRoute)
app.use('/api/blog-comment', blogComment)


export default app;

// app.listen(process.env.PORT, ()=>{
//   console.log(`App is listening on port ${process.env.PORT}`)
// })
