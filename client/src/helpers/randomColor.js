export default function randomRGB() {

  const o = Math.round;
  const r = Math.random;
  const s = 255;

  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
