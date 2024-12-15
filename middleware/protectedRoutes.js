// api/routes/protectedRoutes.js

import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = Router();

// Ruta protegida
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido', user: req.user });
});

export default router;
