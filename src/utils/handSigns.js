import * as fp from 'fingerpose';

// ✋ Hello (Open palm)
const helloGesture = new fp.GestureDescription('Hello');
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  helloGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
});
helloGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

// 👋 Bye (Open palm with thumb curled)
const byeGesture = new fp.GestureDescription('Bye');
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  byeGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
});
byeGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);

// 🤟 Love (I Love You sign)
const loveGesture = new fp.GestureDescription('Love');
loveGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
loveGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
loveGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
loveGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
loveGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);

// 👍 Yes (Thumbs up)
const yesGesture = new fp.GestureDescription('Yes');
yesGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  yesGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// 👎 No (Thumbs down — inverted)
const noGesture = new fp.GestureDescription('No');
noGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  noGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// ✋ Stop (All fingers extended, similar to Hello)
const stopGesture = new fp.GestureDescription('Stop');
[fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  stopGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
});

// 🆘 Help (Fist)
const helpGesture = new fp.GestureDescription('Help');
[fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
  helpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// 👉 Point
const pointGesture = new fp.GestureDescription('Point');
pointGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
[fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb].forEach(finger => {
  pointGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

export const Gestures = [
  helloGesture,
  byeGesture,
  loveGesture,
  yesGesture,
  noGesture,
  stopGesture,
  helpGesture,
  pointGesture,
];
