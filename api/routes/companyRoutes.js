import { Router } from 'express';
import supabase from '../../config/supabase.js';

const router = Router();
const SECRET_KEY = process.env.SUPABASE_KEY;

router.get('/', async (req, res) => {
  try {
    const { name, city } = req.query; 
    let query = supabase.from('dbo.Company').select('*');

    if (name) {
      query = query.ilike('name', `%${name}%`); 
    }

    if (city) {
      query = query.ilike('city', `%${city}%`); 
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error en la consulta a Supabase:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error inesperado:", err);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});


router.get('/cities', async (req, res) => {
  try {
    // Consulta a Supabase
    const { data, error } = await supabase
      .from('dbo.Company')
      .select('city') // Seleccionamos únicamente la columna 'city'
      .neq('city', null); // Excluimos los valores nulos en 'city'

    if (error) {
      console.error("Error en la consulta a Supabase:", error);
      return res.status(400).json({ error: error.message });
    }

    // Filtrar ciudades únicas y convertirlas a mayúsculas
    const uniqueCities = [...new Set(data.map(item => item.city?.toUpperCase().trim()))].filter(Boolean);

    return res.status(200).json(uniqueCities);
  } catch (err) {
    console.error("Error inesperado:", err);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});
export default router;
