export function addSecond(initialTime: Date): Date {
  const newTime = new Date(initialTime.getTime() + 1000);
  return newTime;
}

export function checkTime(i: number): string {
  // eslint-disable-next-line
  return i < 10 ? '0' + i : i.toString();
}
