/**
 * Volunteer Model
 * 
 * This model handles database operations for volunteers.
 * 
 * @module models/volunteer
 */

const db = require('../config/database');

const Volunteer = {
  /**
   * Create a new volunteer
   * 
   * @param {string} name - The name of the volunteer
   * @param {string} email - The email of the volunteer
   * @param {string} interest - The volunteer's area of interest
   * @param {function} callback - The callback function to handle the result
   */
  create: (name, email, interest, callback) => {
    const sql = 'INSERT INTO volunteers (name, email, interest) VALUES (?, ?, ?)';
    db.query(sql, [name, email, interest], callback);
  }
};

module.exports = Volunteer;
