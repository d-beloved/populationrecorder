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

  /**
   * @description Get location method
   * @param  {object} req body of the request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static getLocations(req, res, next) {
    Location.findAll()
      .then((locations) => {
        if (locations.length >= 1) {
          return res.status(200).json({
            message: 'See the locations I found',
            status: 'success',
            locations
          });
        }
        return res.status(200).json({
          message: 'You don\'t have any location information yet',
          status: 'success'
        });
      })
      .catch(next);
  }


  /**
   * @description Update location method
   * @param  {object} req body of the request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static updateLocation(req, res, next) {
    const {
      name, malePopulation, femalePopulation, locality
    } = req.body;

    const locationId = parseInt(req.params.locationId, 10);
    if (isNaN(locationId)) {
      return res.status(400).json({
        error: { message: 'please enter a valid location Id' },
        status: 'error'
      });
    }

    if (isNaN(malePopulation) || isNaN(femalePopulation)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid number for the male and female population in this location'
      });
    }

    Location.findOne({
      where: {
        id: locationId
      }
    })
      .then((location) => {
        if (!location) {
          return res.status(404).json({
            error: { message: 'location not found' },
            status: 'error'
          });
        }

        return location.update({
          name: trimInput(sentenceCase(name)) || location.name,
          malePopulation: trimInput(malePopulation) || location.malePopulation,
          femalePopulation: trimInput(femalePopulation) || location.femalePopulation,
          locality: trimInput(sentenceCase(locality)) || location.locality,
        })
          .then((updatedLocation) => {
            res.status(200).json({
              message: 'Location information updated successfully',
              status: 'success',
              location: updatedLocation
            });
          }).catch(next);
      })
      .catch(next);
  }
}

export default LocationController;
