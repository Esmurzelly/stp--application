import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
    createMarker,
    getAllMarkers,
    removeMarker
} from '../controllers/marker.js';

const router = new Router();

// create marker
// http://localhost:3001/api/markers
// router.post('/', checkAuth, createMarker);
router.post('/', createMarker);

// get markers
// http://localhost:3001/api/markers
router.get('/', getAllMarkers);

// get marker by id
// http://localhost:3001/api/markers/:id
// router.get('/:id', getMyMarker);

// remove marker
// http://localhost:3001/api/markers/:id
// router.delete('/:id', checkAuth, removeMarker);
router.delete('/:id', removeMarker);

export default router;