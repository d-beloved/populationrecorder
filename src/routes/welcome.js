import { Router } from 'express';

const welcomeRoute = Router();

welcomeRoute.all('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to D-beloved\'s Population management API',
    availableEndpoints: {
      createLocation: 'POST /api/location',
    }
  });
});

export default welcomeRoute;
