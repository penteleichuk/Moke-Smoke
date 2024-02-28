export class DifferenceDate {
  date1: any = null;
  date2: any = null;
  sum: number = 0;

  constructor(date1: any, date2: any = new Date()) {
    this.date1 = date1;
    this.date2 = date2;
  }

  getDifferenceInDays() {
    const diffInMs = Math.abs(this.date2 - this.date1);
    this.sum = diffInMs / (1000 * 60 * 60 * 24);
    return this;
  }

  getDifferenceInHours() {
    const diffInMs = Math.abs(this.date2 - this.date1);
    this.sum = diffInMs / (1000 * 60 * 60);
    return this;
  }

  getDifferenceInMinutes() {
    const diffInMs = Math.abs(this.date2 - this.date1);
    this.sum = diffInMs / (1000 * 60);
    return this;
  }

  getDifferenceInSeconds() {
    const diffInMs = Math.abs(this.date2 - this.date1);
    this.sum = diffInMs / 1000;
    return this;
  }

  result() {
    return this.sum;
  }

  diff(limit: number) {
    return this.sum < limit;
  }
}
