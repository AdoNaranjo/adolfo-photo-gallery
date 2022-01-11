import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 8000;
dotenv.config({ path: path.join(__dirname, '../.env') });

const app: Application = express();

app.use(cors());

app.set('trust proxy', 1);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/index.ts'));

// Start server
app.listen(PORT, () => console.log('Server started at port', PORT));
