import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import * as fp from 'fingerpose';
import { Gestures } from '../utils/handSigns';

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [sign, setSign] = useState('');
  const [lastSign, setLastSign] = useState('');
  const [sentence, setSentence] = useState('');
  const [history, setHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(true);

  const speakWord = (word) => {
    if (!soundOn) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    speechSynthesis.cancel(); // Stop previous
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      console.log('✅ Handpose loaded');

      setInterval(() => detect(net), 1500);
    };

    const detect = async (net) => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hand = await net.estimateHands(video);
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        if (hand.length > 0) {
          drawHand(hand[0].landmarks, ctx);

          const GE = new fp.GestureEstimator(Gestures);
          const est = await GE.estimate(hand[0].landmarks, 7.5);

          if (est.gestures.length > 0) {
            const confidence = est.gestures.map(g => g.score);
            const maxIndex = confidence.indexOf(Math.max(...confidence));
            const detected = est.gestures[maxIndex].name;

            if (detected !== lastSign) {
              setSign(detected);
              setLastSign(detected);
              setSentence(prev => prev + ' ' + detected);
              setHistory(prev => [detected, ...prev.slice(0, 9)]);
              speakWord(detected);
            }
          }
        }
      }
    };

    loadModel();
  }, [lastSign, soundOn]);

  const drawHand = (landmarks, ctx) => {
    ctx.fillStyle = 'deepskyblue';
    ctx.strokeStyle = 'deepskyblue';
    ctx.lineWidth = 2;
    landmarks.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 3 * Math.PI);
      ctx.fill();
    });
  };

  const clearSentence = () => {
    setSentence('');
    setHistory([]);
    setSign('');
  };

  const downloadHistory = () => {
    const element = document.createElement('a');
    const file = new Blob([history.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'gesture_history.txt';
    document.body.appendChild(element);
    element.click();
  };

  const exportStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#0d47a1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div className="webcam-wrapper">
      <div className="webcam-box">
        <Webcam
          ref={webcamRef}
          mirrored
          className="webcam-feed"
        />
        <canvas
          ref={canvasRef}
          className="webcam-canvas"
        />
      </div>

      <div className="output">
        <h2>🧠 Detected: <span className="detected">{sign || 'None'}</span></h2>
        <textarea
          className="sentence-box"
          rows="3"
          value={sentence.trim()}
          readOnly
        />

        <div className="controls">
          <button onClick={clearSentence}>🧹 Clear</button>
          <button onClick={downloadHistory}>⬇ Download</button>
          <button onClick={() => setSoundOn(!soundOn)} style={{ backgroundColor: soundOn ? '#4caf50' : '#f44336' }}>
            🔊 Sound: {soundOn ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="history">
          <h4>🕓 History (Last 10):</h4>
          <ul>
            {history.map((word, i) => <li key={i}>{word}</li>)}
          </ul>
        </div>

        {/* 📤 Export Buttons */}
        <div className="exports">
          <h4>📤 Share to Caregiver:</h4>
          <button onClick={() => {
            const text = `Sign Message:\n${sentence}`;
            window.open(`mailto:?subject=Sign Message&body=${encodeURIComponent(text)}`);
          }} style={exportStyle}>📧 Email</button>

          <button onClick={() => {
            const text = encodeURIComponent(sentence);
            window.open(`https://wa.me/?text=${text}`);
          }} style={exportStyle}>💬 WhatsApp</button>

          <button onClick={() => {
            const text = encodeURIComponent(sentence);
            window.open(`sms:?body=${text}`);
          }} style={exportStyle}>📱 SMS</button>
        </div>
      </div>
    </div>
  );
};

export default WebcamFeed;
