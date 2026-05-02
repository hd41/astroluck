import React, { useState } from 'react';
import './App.css';

const ZODIAC_DATA = {
  Aries: { icon: '♈', title: 'Bold & Ambitious', dates: 'Mar 21 - Apr 19', summary: 'Your inner fire drives you forward. Embrace new beginnings and lead with confidence.' },
  Taurus: { icon: '♉', title: 'Steady & Sensual', dates: 'Apr 20 - May 20', summary: 'Grounded energy and persistence are your strengths. Focus on comfort, beauty, and reliable growth.' },
  Gemini: { icon: '♊', title: 'Witty & Curious', dates: 'May 21 - Jun 20', summary: 'Your mind is quick and your communication sparkles. Seek variety and meaningful conversations.' },
  Cancer: { icon: '♋', title: 'Intuitive & Caring', dates: 'Jun 21 - Jul 22', summary: 'Emotional depth and intuition guide you. Nurture your circle and honor your need for security.' },
  Leo: { icon: '♌', title: 'Radiant & Fierce', dates: 'Jul 23 - Aug 22', summary: 'You shine in the spotlight. Express your creativity and let your generous warmth flow.' },
  Virgo: { icon: '♍', title: 'Practical & Analytical', dates: 'Aug 23 - Sep 22', summary: 'Detail-oriented and reliable, you thrive through service and refined routines.' },
  Libra: { icon: '♎', title: 'Balanced & Artistic', dates: 'Sep 23 - Oct 22', summary: 'Harmony and beauty inspire you. Prioritize peace in relationships and graceful decisions.' },
  Scorpio: { icon: '♏', title: 'Intense & Mysterious', dates: 'Oct 23 - Nov 21', summary: 'Transformation and deep feeling are your hallmarks. Embrace vulnerability to powerfully evolve.' },
  Sagittarius: { icon: '♐', title: 'Adventurous & Optimistic', dates: 'Nov 22 - Dec 21', summary: 'Freedom and higher learning move you. Explore new horizons and trust your adventurous heart.' },
  Capricorn: { icon: '♑', title: 'Disciplined & Patient', dates: 'Dec 22 - Jan 19', summary: 'Persistence and structure help you build lasting success. Stay steady and honor your goals.' },
  Aquarius: { icon: '♒', title: 'Original & Visionary', dates: 'Jan 20 - Feb 18', summary: 'You are inspired by innovation and social connection. Think ahead and champion the collective.' },
  Pisces: { icon: '♓', title: 'Dreamy & Empathetic', dates: 'Feb 19 - Mar 20', summary: 'Your imagination and compassion are rich. Follow your heart and listen to your inner guidance.' },
};

const NUMEROLOGY_DATA = {
  1: { phrase: 'Leader', message: 'Your life path is built on independence, ambition, and originality.' },
  2: { phrase: 'Diplomat', message: 'You shine through cooperation, empathy, and gentle wisdom.' },
  3: { phrase: 'Creator', message: 'Your creativity and optimism attract joy and meaningful expression.' },
  4: { phrase: 'Builder', message: 'Stability, discipline, and practical effort define your journey.' },
  5: { phrase: 'Adventurer', message: 'Change, freedom, and curiosity fuel your most memorable experiences.' },
  6: { phrase: 'Caretaker', message: 'Responsibility, harmony, and service bring balance to your path.' },
  7: { phrase: 'Seeker', message: 'Introspection, truth, and spiritual growth guide your discoveries.' },
  8: { phrase: 'Achiever', message: 'Power, prosperity, and leadership are central to your purpose.' },
  9: { phrase: 'Visionary', message: 'Compassion, creativity, and global awareness uplift you and others.' },
};

function getZodiacSign(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

function calculateLifePathNumber(dateString) {
  if (!dateString) return null;
  const digits = dateString.replace(/[^0-9]/g, '');
  const reduce = (value) => {
    const sum = value
      .toString()
      .split('')
      .reduce((acc, char) => acc + Number(char), 0);
    return sum > 9 ? reduce(sum) : sum;
  };
  return reduce(digits);
}

function App() {
  const [page, setPage] = useState('home');
  const [birthDate, setBirthDate] = useState('');
  const [zodiacResult, setZodiacResult] = useState(null);
  const [numerologyDate, setNumerologyDate] = useState('');
  const [lifePath, setLifePath] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  const handleZodiacSubmit = (event) => {
    event.preventDefault();
    if (!birthDate) return;
    const sign = getZodiacSign(birthDate);
    setZodiacResult(ZODIAC_DATA[sign]);
  };

  const handleNumerologySubmit = (event) => {
    event.preventDefault();
    if (!numerologyDate) return;
    const lifePathValue = calculateLifePathNumber(numerologyDate);
    setLifePath(NUMEROLOGY_DATA[lifePathValue]);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus('Please complete all fields before sending.');
      return;
    }
    setContactStatus(`Thanks, ${contactForm.name}! Your message has been received.`);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="App">
      <nav className="site-nav">
        <div className="brand">AstroLuck</div>
        <div className="nav-links">
          <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>Home</button>
          <button onClick={() => setPage('contact')} className={page === 'contact' ? 'active' : ''}>Contact</button>
          <button onClick={() => setPage('about')} className={page === 'about' ? 'active' : ''}>About</button>
        </div>
      </nav>

      <main className="page-container">
        {page === 'home' && (
          <section className="home-page">
            <div className="hero-card">
              <h1>Welcome to AstroLuck</h1>
              <p>Discover astrology and numerology guidance for your personal journey.</p>
              <div className="hero-actions">
                <button onClick={() => setPage('contact')}>Contact an Expert</button>
                <button onClick={() => setPage('about')}>Learn More</button>
              </div>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <h2>Astrology Insights</h2>
                <p>Find your zodiac sign and unlock traits, daily guidance, and cosmic support.</p>
              </article>
              <article className="feature-card">
                <h2>Numerology Support</h2>
                <p>Calculate your life path number and reveal your soul's mission.</p>
              </article>
              <article className="feature-card">
                <h2>Personal Guidance</h2>
                <p>Reach out for tailored readings, compatibility insights, and energetic balance.</p>
              </article>
            </div>

            <div className="dual-columns">
              <div className="calc-card">
                <h3>Astrology Calculator</h3>
                <form onSubmit={handleZodiacSubmit} className="small-form">
                  <label>Birth Date</label>
                  <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                  <button type="submit">Reveal Zodiac Sign</button>
                </form>
                {zodiacResult && (
                  <div className="result-card">
                    <span className="zodiac-icon">{zodiacResult.icon}</span>
                    <h4>{zodiacResult.title}</h4>
                    <p>{zodiacResult.dates}</p>
                    <p>{zodiacResult.summary}</p>
                  </div>
                )}
              </div>

              <div className="calc-card">
                <h3>Numerology Calculator</h3>
                <form onSubmit={handleNumerologySubmit} className="small-form">
                  <label>Birth Date</label>
                  <input type="date" value={numerologyDate} onChange={(e) => setNumerologyDate(e.target.value)} />
                  <button type="submit">Reveal Life Path</button>
                </form>
                {lifePath && (
                  <div className="result-card">
                    <h4>{`Life Path ${Object.keys(NUMEROLOGY_DATA).find((key) => NUMEROLOGY_DATA[key].phrase === lifePath.phrase)}`}</h4>
                    <p className="numerology-keyword">{lifePath.phrase}</p>
                    <p>{lifePath.message}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {page === 'contact' && (
          <section className="contact-page">
            <h2>Contact AstroLuck</h2>
            <p>Send us your questions, request a reading, or book a consultation.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>Name</label>
              <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
              <label>Email</label>
              <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
              <label>Message</label>
              <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows="6" />
              <button type="submit">Send Message</button>
              {contactStatus && <p className="contact-status">{contactStatus}</p>}
            </form>
            <div className="contact-highlights">
              <div>
                <h4>Consultation Options</h4>
                <p>Astrology readings, compatibility checks, numerology guidance, and spiritual support.</p>
              </div>
              <div>
                <h4>Fast Response</h4>
                <p>We aim to reply within 24 hours and help you align with your highest purpose.</p>
              </div>
            </div>
          </section>
        )}

        {page === 'about' && (
          <section className="about-page">
            <h2>About AstroLuck</h2>
            <p>AstroLuck blends astrology, numerology, and practical guidance to help you make meaningful choices for your life.</p>
            <div className="about-grid">
              <article>
                <h3>Astrology</h3>
                <p>Explore the power of the zodiac and understand how your birth chart shapes personality, love, and career energy.</p>
              </article>
              <article>
                <h3>Numerology</h3>
                <p>Discover your core life path and the energetic numbers that influence destiny, strengths, and challenges.</p>
              </article>
              <article>
                <h3>Support</h3>
                <p>Whether you are curious or seeking deeper clarity, AstroLuck guides you with compassionate, easy-to-use readings.</p>
              </article>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
