export type TimeUnit = "hour" | "day" | "week" | "month" | "year" | "fy";

export class Utils {
  private constructor() {}

  public static getDateRange(timeUnit: TimeUnit, n: number) {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    switch (timeUnit) {
      case "hour": // last n hours
        start = new Date(now.getTime() - n * 60 * 60 * 1000);
        break;
      case "day": // last n days
        start = new Date(now.getTime() - n * 24 * 60 * 60 * 1000);
        break;
      case "week": // last n weeks
        start = new Date(now.getTime() - n * 7 * 24 * 60 * 60 * 1000);
        break;
      case "month": // last n months
        let y = now.getFullYear() - Math.floor(n / 12);
        let m = now.getMonth() - (n % 12);
        if (m < 0) {
          y -= 1;
          m += 12;
        }
        start = new Date(y, m, 1);
        break;
      case "year": // last n years
        start = new Date(now.getFullYear() - n, 0, 1);
        break;
      case "fy": // last n fiscal years
        const currentYear = now.getFullYear();
        const fyStartYear = now.getMonth() < 3 ? currentYear - 1 : currentYear;
        start = new Date(fyStartYear - n, 3, 1); // April 1st
        break;
    }
    return { start, end };
  }
}
