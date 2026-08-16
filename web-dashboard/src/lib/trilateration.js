/**
 * 2D trilateration: given three mesh nodes' positions and their
 * distance (or signal-radius estimate) to a transmitting device,
 * estimate the device's (x, y).
 *
 * Standard linearized solve — subtract circle 1 from circle 2, and
 * circle 2 from circle 3, to get two linear equations in x, y, then
 * solve with Cramer's rule:
 *   A·x + B·y = C
 *   D·x + E·y = F
 *
 * @param {{x:number,y:number,r:number}} n1
 * @param {{x:number,y:number,r:number}} n2
 * @param {{x:number,y:number,r:number}} n3
 * @returns {{x:number,y:number}|null} null if the three nodes are
 *   collinear (or otherwise degenerate) and have no unique solution.
 */
export function calculateTrilateration(n1, n2, n3) {
  const A = 2 * n2.x - 2 * n1.x;
  const B = 2 * n2.y - 2 * n1.y;
  const C = n1.r ** 2 - n2.r ** 2 - n1.x ** 2 + n2.x ** 2 - n1.y ** 2 + n2.y ** 2;
  const D = 2 * n3.x - 2 * n2.x;
  const E = 2 * n3.y - 2 * n2.y;
  const F = n2.r ** 2 - n3.r ** 2 - n2.x ** 2 + n3.x ** 2 - n2.y ** 2 + n3.y ** 2;

  const denominator = A * E - D * B;
  if (Math.abs(denominator) < 1e-9) return null; // collinear nodes — no unique fix

  const targetX = (C * E - F * B) / denominator;
  // NOTE: the previous version of this formula used Math.sign(D) * C
  // instead of D * C, which silently collapsed D to -1/0/1 and threw
  // the Y estimate off by orders of magnitude whenever |D| wasn't 1.
  const targetY = (A * F - D * C) / denominator;

  return { x: parseFloat(targetX.toFixed(5)), y: parseFloat(targetY.toFixed(5)) };
}
