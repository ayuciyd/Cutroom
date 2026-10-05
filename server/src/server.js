import app from './app.js';
import { connectDB } from './config/db.js';
import { initFirebase } from './config/firebase.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Initialize Database
  await connectDB();

  // Initialize Firebase Admin
  initFirebase();

  app.listen(PORT, () => {
    console.log(`[Cutroom Server] Running on http://localhost:${PORT}`);
  });
};

startServer();
