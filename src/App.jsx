import React, { useState, useEffect, useRef } from 'react';

const gridItems = [
  { id: 1, name: 'Mummy', num: '01', coverImg: '/2423070c-8225-4045-a40e-54f477326435 2.jpg', messageImg: '/mummy wish.png' },
  { id: 2, name: 'Papa', num: '02', coverImg: '/papa.png', video: '/papa wish.mp4' },
  { id: 3, name: 'Tia', num: '03', coverImg: '/tia.png', messageImg: '/tia wish.png' },
  { id: 4, name: 'Dadu Dadi', num: '04', coverImg: '/dadu dadi.png', audio: '/dadu dadi wish.mp3' },
  { id: 5, name: 'Nani', num: '05', coverImg: '/nani.png', audio: '/nanifin.mp3' },
  { id: 6, name: 'Choti Nani', num: '06', coverImg: '/chotinani.jpg', messageImg: '/chotinani wish.png' },
  { id: 7, name: 'Mami', num: '07', coverImg: '/mami wish.jpg', messageImg: '/mami.png' },
  { id: 8, name: 'Khyati', num: '08', coverImg: '/khyati.png', video: '/khyati wish.mp4' },
  { id: 9, name: 'Abhishree', num: '09', coverImg: '/abhishree.jpg', messageImg: '/abhishreewish.png' },
  { id: 10, name: 'Aanchal', num: '10', coverImg: '/aanchal.png', video: '/aanchalwish.mp4' },
  { id: 11, name: 'Fatima', num: '11', coverImg: '/fatima.png', messageImg: '/fatima wish.png' },
  { id: 12, name: 'Haya', num: '12', coverImg: '/haya.jpg', messageImg: '/haya wish.png' },
  { id: 13, name: 'Tuhin', num: '13', coverImg: '/tuhin.png', messageImg: '/tuhin wish.png' },
  { id: 14, name: 'Reet', num: '14', coverImg: '/reet.png', video: '/reet wish.mp4' },
  { id: 15, name: 'Shreya', num: '15', coverImg: '/shreya.png', video: '/shreya wish.mp4' },
  { id: 16, name: 'Neeti, Bua, Dev Bhaiya', num: '16', coverImg: '/neeeti.png', video: '/neetiwish.mp4' },
];

// SVG Stars for the background patterns
const starSvgBlue = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="#4A709E" d="M10 0l3.09 6.26L20 7.27l-5 4.87 1.18 6.88L10 15.77l-6.18 3.25L5 12.14 0 7.27l6.91-1.01L10 0z"/></svg>`);
const starSvgRed = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="#B23A3A" d="M10 0l3.09 6.26L20 7.27l-5 4.87 1.18 6.88L10 15.77l-6.18 3.25L5 12.14 0 7.27l6.91-1.01L10 0z"/></svg>`);

const paperPatterns = [
  { backgroundColor: '#fff', backgroundImage: 'linear-gradient(90deg, rgba(135, 172, 219, 0.4) 50%, transparent 50%), linear-gradient(rgba(135, 172, 219, 0.4) 50%, transparent 50%)', backgroundSize: '20px 20px' },
  { backgroundColor: '#fff', backgroundImage: 'linear-gradient(90deg, rgba(200, 50, 50, 0.35) 50%, transparent 50%), linear-gradient(rgba(200, 50, 50, 0.35) 50%, transparent 50%)', backgroundSize: '16px 16px' },
  { backgroundColor: '#FDFBF7', backgroundImage: `url("data:image/svg+xml,${starSvgBlue}")`, backgroundSize: '40px 40px', backgroundPosition: '10px 10px' },
  { backgroundColor: '#FDFBF7', backgroundImage: `url("data:image/svg+xml,${starSvgRed}")`, backgroundSize: '35px 35px', backgroundPosition: '0px 0px' }
];

const tapeColors = ['rgba(255, 182, 193, 0.8)', 'rgba(173, 216, 230, 0.8)', 'rgba(255, 239, 150, 0.8)', 'rgba(152, 251, 152, 0.8)'];
const rotations1 = ['-6deg', '4deg', '-3deg', '7deg', '-5deg', '3deg', '-4deg', '5deg'];
const rotations2 = ['3deg', '-5deg', '4deg', '-2deg', '6deg', '-4deg', '2deg', '-6deg'];

export default function App() {
  const [appStage, setAppStage] = useState('WELCOME'); 
  const [activeIndex, setActiveIndex] = useState(null); 
  const bgMusicRef = useRef(null);

  const startExperience = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    setAppStage('PLAYING_VIDEO');
  };

  const handleVideoEnd = () => {
    setAppStage('FADING');
    setTimeout(() => {
      setAppStage('DONE');
    }, 1500); 
  };

  // Manage background music pausing/resuming based on whether a video or audio wish is active
  useEffect(() => {
    if (!bgMusicRef.current || appStage !== 'DONE') return;

    const activeItem = activeIndex !== null ? gridItems[activeIndex] : null;
    const isMediaWish = activeItem && (activeItem.video || activeItem.audio);

    if (isMediaWish) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play().catch(e => console.log("Audio resume error:", e));
    }
  }, [activeIndex, appStage]);

  const handleNext = () => {
    setActiveIndex(prev => (prev === gridItems.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? gridItems.length - 1 : prev - 1));
  };

  const activeItem = activeIndex !== null ? gridItems[activeIndex] : null;

  return (
    <div style={styles.appWrapper}>
      
      {/* Background MP3 Audio */}
      <audio ref={bgMusicRef} src="/rosemary.mp3" loop />

      {/* 1. WELCOME SCREEN */}
      {appStage === 'WELCOME' && (
        <div style={styles.welcomeOverlay}>
          <div style={styles.welcomeCard}>
            <h1 style={styles.welcomeTitle}>Sixteen Candles for you &lt;3</h1>
            <p style={styles.welcomeSubtitle}>A little scrapbook made with all our love.</p>
            <button onClick={startExperience} style={styles.cutieButton}>
              Start the Magic
            </button>
          </div>
        </div>
      )}

      {/* 2. PRELOADER VIDEO */}
      {(appStage === 'PLAYING_VIDEO' || appStage === 'FADING') && (
        <div style={{ ...styles.videoOverlay, opacity: appStage === 'FADING' ? 0 : 1 }}>
          <video 
            src="/copy_E3EBE355-9EB4-484B-8F5C-BEDB9885A1E4.mov" 
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideoEnd} 
            style={styles.preloaderVideo} 
          />
        </div>
      )}

      {/* 3. MAIN SCRAPBOOK GRID */}
      <div style={{ ...styles.gridContainer, opacity: appStage === 'DONE' ? 1 : 0, transition: 'opacity 1.5s ease', pointerEvents: appStage === 'DONE' ? 'auto' : 'none' }}>
        <h2 style={styles.gridHeader}>
          Sixteen Candles for you &lt;3
        </h2>
        
        <div style={styles.scrapbookStrip}>
          {gridItems.map((item, index) => {
            const paperRotation = rotations1[index % rotations1.length];
            const polaroidRotation = rotations2[index % rotations2.length];
            const tapeColor = tapeColors[index % tapeColors.length];
            const tapeRotation = index % 2 === 0 ? '-2deg' : '2deg';
            const pattern = paperPatterns[index % paperPatterns.length];

            return (
              <div key={item.id} style={styles.layeredItemContainer} onClick={() => setActiveIndex(index)}>
                <div style={{ ...styles.patternPaper, ...pattern, transform: `rotate(${paperRotation}) translate(5px, 5px)` }}></div>
                <div style={{ ...styles.polaroidFrame, transform: `rotate(${polaroidRotation})` }}>
                  <div style={{ ...styles.washiTape, backgroundColor: tapeColor, transform: `rotate(${tapeRotation}) translate(-50%, -10px)` }}></div>
                  <div style={styles.imagePlaceholder}>
                    <span style={styles.frameNumber}>{item.num}</span>
                    <img 
                      src={item.coverImg} 
                      alt={`Cover for ${item.name}`}
                      style={styles.coverImage}
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    {(item.video || item.audio) && (
                      <div style={styles.playBadge}>{item.video ? '▶' : '🎵'}</div>
                    )}
                  </div>
                  <div style={styles.polaroidText}>{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE WISH MODAL */}
      {activeIndex !== null && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setActiveIndex(null)} style={styles.closeButton}>Close</button>
            <div style={styles.modalImageContainer}>
              {activeItem.video ? (
                <video 
                  src={activeItem.video} 
                  controls 
                  autoPlay 
                  playsInline
                  style={styles.messageVideo} 
                />
              ) : activeItem.audio ? (
                <div style={styles.audioContainer}>
                  <p style={styles.audioTitle}>Audio Wish from {activeItem.name} </p>
                  <audio 
                    src={activeItem.audio} 
                    controls 
                    autoPlay 
                    style={{ width: '100%', maxWidth: '400px' }} 
                  />
                </div>
              ) : (
                <img 
                  src={activeItem.messageImg} 
                  alt={`${activeItem.name}'s message`} 
                  style={styles.messageImage}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/111/fff?text=Add+Message+Image+Here'; }}
                />
              )}
            </div>
            <div style={styles.navigationRow}>
              <button onClick={handlePrev} style={styles.navButton}>&larr; Go Back</button>
              <span style={styles.wishCounter}>{activeIndex + 1} / 16</span>
              <button onClick={handleNext} style={styles.navButton}>Next Wish &rarr;</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap');
        body { 
          margin: 0; 
          padding: 0; 
          overflow-x: hidden; 
          background-color: #E6E0F8; 
          background-image: radial-gradient(#CDB4DB 1.5px, transparent 1.5px); 
          background-size: 24px 24px; 
        }
      `}</style>
    </div>
  );
}

const styles = {
  appWrapper: { minHeight: '100vh', position: 'relative', overflow: 'hidden' },
  welcomeOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#E6E0F8', backgroundImage: 'radial-gradient(#CDB4DB 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  welcomeCard: { textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', maxWidth: '400px', width: '90%', border: '2px dashed #D3C4E3' },
  welcomeTitle: { fontFamily: "'Caveat', cursive", fontSize: '42px', color: '#D84B53', margin: '0 0 10px 0' },
  welcomeSubtitle: { fontFamily: "'Caveat', cursive", fontSize: '24px', color: '#666', margin: '0 0 30px 0' },
  cutieButton: { fontFamily: "system-ui, -apple-system, sans-serif", fontSize: '18px', fontWeight: '600', backgroundColor: '#D84B53', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(216, 75, 83, 0.3)', transition: 'transform 0.2s', letterSpacing: '0.5px' },
  videoOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#E6E0F8', backgroundImage: 'radial-gradient(#CDB4DB 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', zIndex: 50, transition: 'opacity 1.5s ease-in-out', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  preloaderVideo: { width: '100%', height: '100%', objectFit: 'contain' },
  gridContainer: { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' },
  gridHeader: { color: '#D84B53', textAlign: 'center', fontFamily: "'Caveat', cursive", fontSize: '42px', marginBottom: '70px', padding: '0 20px', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' },
  scrapbookStrip: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', columnGap: '40px', rowGap: '60px', justifyItems: 'center' },
  layeredItemContainer: { position: 'relative', width: '200px', height: '240px', cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  patternPaper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '4px', boxShadow: '2px 4px 10px rgba(0,0,0,0.1)', zIndex: 1 },
  polaroidFrame: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', padding: '12px 12px 45px 12px', boxSizing: 'border-box', borderRadius: '2px', boxShadow: '1px 3px 12px rgba(0,0,0,0.15)', zIndex: 2, display: 'flex', flexDirection: 'column' },
  washiTape: { position: 'absolute', top: '-8px', left: '50%', width: '80px', height: '25px', zIndex: 3, opacity: 0.85, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  imagePlaceholder: { width: '100%', height: '150px', backgroundColor: '#e9e5de', position: 'relative', border: '1px solid #d3ccc0', overflow: 'hidden' },
  coverImage: { width: '100%', height: '100%', objectFit: 'cover' },
  playBadge: { position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(216, 75, 83, 0.85)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 6 },
  frameNumber: { color: '#fff', fontSize: '16px', position: 'absolute', top: '8px', left: '8px', fontFamily: "'Caveat', cursive", fontWeight: 'bold', zIndex: 5, textShadow: '1px 1px 3px rgba(0,0,0,0.8)' },
  polaroidText: { color: '#333', fontSize: '26px', fontFamily: "'Caveat', cursive", fontWeight: 'bold', textAlign: 'center', position: 'absolute', bottom: '6px', width: '100%', left: 0 },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backdropFilter: 'blur(8px)' },
  modalContent: { width: '90%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  closeButton: { alignSelf: 'flex-end', marginBottom: '15px', padding: '8px 24px', backgroundColor: '#fff', color: '#D84B53', border: 'none', cursor: 'pointer', borderRadius: '30px', fontFamily: "'Caveat', cursive", fontSize: '22px', fontWeight: 'bold' },
  modalImageContainer: { width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px' },
  messageImage: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  messageVideo: { maxWidth: '100%', maxHeight: '100%', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', outline: 'none' },
  audioContainer: { background: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  audioTitle: { fontFamily: "'Caveat', cursive", fontSize: '28px', color: '#D84B53', marginBottom: '20px', marginTop: 0 },
  navigationRow: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 20px', boxSizing: 'border-box' },
  navButton: { fontFamily: "'Caveat', cursive", fontSize: '24px', backgroundColor: '#fff', color: '#333', border: 'none', padding: '10px 30px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'transform 0.2s' },
  wishCounter: { color: '#fff', fontFamily: "'Caveat', cursive", fontSize: '28px', fontWeight: 'bold', letterSpacing: '2px' }
};