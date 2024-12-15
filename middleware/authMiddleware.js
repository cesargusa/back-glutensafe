// middlegares/authMiddleware.js

import supabase from '../config/supabase.js';

const authMiddleware = async (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization?.split(' ')[1]; // Se espera que el token esté en el formato "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Usar supabase.auth.getUser para verificar el token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    // Si el usuario es válido, puedes agregarlo a la solicitud para usarlo en otras rutas
    req.user = data.user;
    next(); // Llama a next() para pasar al siguiente middleware o ruta
};

// Exportación por defecto
export default authMiddleware;
