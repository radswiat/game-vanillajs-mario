export function easeInCirc(t) {
  if (t >= 1) return t;
  return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
}
