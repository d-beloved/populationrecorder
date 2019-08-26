import { Router } from 'express';
import LocationController from '../controllers/locationController';

const locationController = Router();

locationController.post('/location', LocationController.createLocation);
locationController.get('/location', LocationController.getLocations);
locationController.put('/location/:locationId', LocationController.updateLocation);

export default locationController;
