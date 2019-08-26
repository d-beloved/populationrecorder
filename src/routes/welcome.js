import { Router } from 'express';

const welcomeRoute = Router();

welcomeRoute.all('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to D-beloved\'s Population management API',
    availableEndpoints: {
      createLocation: 'POST /api/location',
      getLocations: 'GET /api/location',
      updateLocation: 'PUT /api/location/:locationId',
      deleteLocation: 'DELETE /api/location/:locationId',
    }
  });
});

export default welcomeRoute;
