import React, { useState } from 'react';
import './App.css';

const ZODIAC_DATA = {
  "Aries": { icon: "♈", trait: "Bold & Ambitious", dates: "Mar 21 - Apr 19" },
  "Taurus": { icon: "♉", trait: "Steady & Sensual", dates: "Apr 20 - May 20" },
  "Gemini": { icon: "♊", trait: "Witty & Curious", dates: "May 21 - Jun 20" },
  "Cancer": { icon: "♋", trait: "Intuitive & Caring", dates: "Jun 21 - Jul 22" },
  "Leo": { icon: "♌", trait: "Radiant & Fierce", dates: "Jul 23 - Aug 22" },
  "Virgo": { icon: "♍", trait: "Practical & Analytical", dates: "Aug 23 - Sep 22" },
  "Libra": { icon: "♎", trait: "Balanced & Artistic", dates: "Sep 23 - Oct 22" },
  "Scorpio": { icon: "♏", trait: "Intense & Mysterious", dates: "Oct 23 - Nov 21" },
  "Sagittarius": { icon: "♐", trait: "Adventurous & Optimistic", dates: "Nov 22 - Dec 21" },
  "Capricorn": { icon: "♑", trait: "Disciplined & Patient", dates: "Dec 22 - Jan 19" },
  "Aquarius": { icon: "♒", trait: "Original & Visionary", dates: "Jan 20 - Feb 18" },
  "Pisces": { icon: "♓", trait: "Dreamy & Empathetic", dates: "Feb 19 - Mar 20" },
};

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [sign, setSign] = useState(null);

  const getZodiacSign = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1; // Offset for UTC

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!birthDate) return;
    const detectedSign = getZodiacSign(birthDate);
    setSign(ZODIAC_DATA[detectedSign]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✨ Cosmic Insights(By Rahul Kaushik) ✨</h1>
        <form onSubmit={handleCalculate}>
          <label>Enter your Birth Date:</label>
          <input type="date" onChange={(e) => setBirthDate(e.target.value)} />
          <button type="submit">Reveal My Sign</button>
        </form>

        {sign && (
          <div className="result-card">
            <span className="zodiac-icon">{sign.icon}</span>
            <h2>{sign.trait}</h2>
            <p>Your sign falls within {sign.dates}</p>
            <p className="horoscope">The stars suggest today is a great day for new beginnings!</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;