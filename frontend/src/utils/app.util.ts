/**
 * @file app.utils.ts
 * @fileoverview This file contains the app utils
 */

/**
 * @class AppUtils
 * @classdesc This class contains the app utils
 */
export class AppUtils {
  /**
   * Converts a Date object to a local datetime string in the format "YYYY-MM-DDTHH:MM".
   * @param {Date} date - The Date object to be converted.
   * @returns {string} - The local datetime string.
   */
  static toLocalDateTimeString(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes())
    );
  }
}
