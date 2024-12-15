import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
// import userRegisterRoutes from './api/routes/userRegisterRoutes.js';
// import userLoginRoutes from './api/routes/userLoginRoutes.js';
import companyRoutes from './api/routes/companyRoutes.js';

import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config(); // Solo cargar dotenv en desarrollo
}

const supabaseUrl = 'https://xwvurcpsoyzugrzzpqdd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

// Configura las rutas
// app.use('/users/users', userRegisterRoutes);
// app.use('/users/usersLogin', userLoginRoutes);
app.use('/companies', companyRoutes);

// Configura el puerto (si estás en local puedes usar un puerto como 3000)
const PORT = process.env.PORT || 3000;  // Usa el puerto definido en .env o 3000 por defecto

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exporta una función que actúe como handler para Vercel (si es necesario)
export default (req, res) => app(req, res);
