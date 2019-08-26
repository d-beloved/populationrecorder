import { Router } from 'express';
import LocationController from '../controllers/locationController';

const locationController = Router();

locationController.post('/location', LocationController.createLocation);
locationController.get('/location', LocationController.getLocations);

export default locationController;
