// config/supabase.js

import dotenv from 'dotenv'; // Asegúrate de importar dotenv
import { createClient } from '@supabase/supabase-js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  

const supabaseUrl = 'https://xwvurcpsoyzugrzzpqdd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // Obtiene la clave de Supabase

// Comprueba si supabaseKey está definido
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is not defined. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
