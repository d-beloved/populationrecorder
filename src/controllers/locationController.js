/* eslint-disable no-restricted-globals */

import sentenceCase from 'sentence-case';

import { Location } from '../models';
import Validation from '../utils/validation';
import trimInput from '../utils/trimInput';

/**
 * @description controller class with methods for location endpoints
 * @class LocationController
 */
class LocationController {
  /**
   * @description Create location method
   * @param  {object} req body of the request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static createLocation(req, res, next) {
    const {
      name, malePopulation, femalePopulation, locality
    } = req.body;

    const newLocation = {
      name: trimInput(sentenceCase(name)),
      malePopulation: trimInput(malePopulation),
      femalePopulation: trimInput(femalePopulation),
      locality: trimInput(sentenceCase(locality))
    };

    const { error, isValid } = Validation.validateCreateLocation(newLocation);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    if (isNaN(malePopulation) || isNaN(femalePopulation)) {
      return res.status(400).json({
        status: error,
        error: 'Please enter a valid number for the male and female population in this location'
      });
    }

    Location.findOrCreate({
      where: {
        name
      },
      defaults: {
        name,
        malePopulation,
        femalePopulation,
        locality
      }
    }).then(([location, created]) => {
      if (created) {
        return res.status(201).json({
          message: 'Location created successfully',
          status: 'success',
          location
        });
      }
      return res.status(409).json({
        message: 'You have previously created this location, would you like to update it?'
      });
    }).catch(next);
  }
}

export default LocationController;
