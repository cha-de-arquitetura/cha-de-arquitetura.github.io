export function ReadingTime(value) {
  const minutes = Math.round(value);
  if (minutes <= 0) {
    return '~1'
  }
  return minutes;
}
