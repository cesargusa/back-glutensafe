import { Router } from 'express';
import supabase from '../../config/supabase.js';

const router = Router();
const SECRET_KEY = process.env.SUPABASE_KEY;

router.get('/', async (req, res) => {
  // Validación del token de autorización
  // const token = req.headers.authorization?.split(' ')[1];
  // if (token && token === process.env.TOKEN && (process.env.ROLE === 'ADMIN' || process.env.ROLE === 'SUPER_ADMIN')) {
    try {
      let data, error;

      // Consulta diferente según el rol del usuario
      // if (process.env.ROLE === 'SUPER_ADMIN') {
      //   ({ data, error } = await supabase.from('dbo.bond').select('*'));
      // } else if (process.env.ROLE === 'ADMIN' && process.env.USER_ID) {
      //   // Para rol ADMIN, solo consulta registros que coincidan con `userCreatedId`
      //   ({ data, error } = await supabase.from('dbo.bond').select('*').eq('userCreatedId', process.env.USER_ID));
      // } else {
        // Si USER_ID no está definido para el rol ADMIN
       ({ data, error } = await supabase.from('dbo.Company').select('*'));
      // }

      // Manejo de errores de la consulta
      if (error) {
        console.error("Error en la consulta a Supabase:", error);
        return res.status(400).json({ error: error.message });
      }

      // Respuesta exitosa
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error inesperado:", err);
      return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  // } else {
  //   // Error de autenticación
  //   return res.status(401).json({ message: "Error de token" });
  // }
});

export default router;
