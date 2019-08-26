import isEmpty from './is_empty';

/**
 *
 * @description controller class with for users input validation
 *  @class ContactValidation
 */
class Validation {
  /**
   *  @description method for validation of create contact input
   *  @param {object} data body of the user's request
   *  @returns {object} The body of  the response message
   */
  static validateCreateLocation(data) {
    const error = {};
    data.name = data.name ? data.name : '';
    data.malePopulation = data.malePopulation ? data.malePopulation : '';
    data.femalePopulation = data.femalePopulation ? data.femalePopulation : '';
    data.locality = data.locality ? data.locality : '';
    if (!(data.name)) {
      error.name = 'Please enter a valid location name';
    }
    if (!(data.malePopulation)) {
      error.malePopulation = 'Please enter the number of male population in this locality';
    }
    if (!(data.femalePopulation)) {
      error.femalePopulation = 'Please enter the number of female population in this locality';
    }
    if (!(data.locality)) {
      error.locality = 'Please enter the locality this location is in';
    }
    return {
      error,
      isValid: isEmpty(error),
      status: 'error'
    };
  }
}

export default Validation;
