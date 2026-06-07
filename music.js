/**
 * Nithya's Universe - Music Corner Scripts
 * Implements a fully functional chiptune synthesizer player using the Web Audio API.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Synthesizer Track Data
    const tracks = [
        {
            name: "Dreamy Pink Skies ☁️",
            notes: [
                { f: 523.25, d: 0.4 }, // C5
                { f: 587.33, d: 0.4 }, // D5
                { f: 659.25, d: 0.4 }, // E5
                { f: 783.99, d: 0.4 }, // G5
                { f: 880.00, d: 0.4 }, // A5
                { f: 987.77, d: 0.4 }, // B5
                { f: 1046.50, d: 0.8 }, // C6
                { f: 0, d: 0.4 }       // Rest
            ]
        },
        {
            name: "Cherry Blossom Beats 🌸",
            notes: [
                { f: 440.00, d: 0.5 }, // A4
                { f: 523.25, d: 0.5 }, // C5
                { f: 659.25, d: 0.5 }, // E5
                { f: 587.33, d: 0.5 }, // D5
                { f: 523.25, d: 0.5 }, // C5
                { f: 493.88, d: 0.5 }, // B4
                { f: 440.00, d: 1.0 }, // A4
                { f: 0, d: 0.5 }
            ]
        },
        {
            name: "Starry Night Lullaby ✨",
            notes: [
                { f: 698.46, d: 0.3 }, // F5
                { f: 880.00, d: 0.3 }, // A5
                { f: 1046.50, d: 0.3 }, // C6
                { f: 880.00, d: 0.3 }, // A5
                { f: 783.99, d: 0.3 }, // G5
                { f: 659.25, d: 0.3 }, // E5
                { f: 587.33, d: 0.6 }, // D5
                { f: 523.25, d: 0.6 }  // C5
            ]
        }
    ];
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    // Web Audio Variables
    let audioCtx = null;
    let mainGainNode = null;
    let synthTimeout = null;
    let noteIndex = 0;
    // Elements
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackNameLabel = document.getElementById('current-track-name');
    const volumeControl = document.getElementById('volume-control');
    const tempoControl = document.getElementById('tempo-control');
    const emitContainer = document.getElementById('emit-container');
    
    const cassetteTape = document.getElementById('cassette-tape');
    const spoolL = document.getElementById('spool-l');
    const spoolR = document.getElementById('spool-r');
    const vinylDisc = document.getElementById('vinyl-disc');
    const toneArm = document.getElementById('tone-arm');
    // 2. Initialize Web Audio Context
    function initAudio() {
        if (audioCtx) return;
        
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        mainGainNode = audioCtx.createGain();
        mainGainNode.gain.setValueAtTime(volumeControl.value, audioCtx.currentTime);
        mainGainNode.connect(audioCtx.destination);
    }
    // 3. Synth note scheduler
    function playNextNote() {
        if (!isPlaying) return;
        const track = tracks[currentTrackIndex];
        const notes = track.notes;
        const currentNote = notes[noteIndex];
        // Read dynamic controls
        const tempo = parseInt(tempoControl.value);
        // Base note duration factor
        const beatDuration = (60 / tempo) * currentNote.d * 2;
        if (currentNote.f > 0) {
            // Create Oscillator
            const osc = audioCtx.createOscillator();
            const noteGain = audioCtx.createGain();
            
            // Cute soft triangle wave
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(currentNote.f, audioCtx.currentTime);
            // Envelope to prevent clicks and sound girly/plucky
            noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05); // Attack
            noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + beatDuration - 0.05); // Decay/Sustain
            osc.connect(noteGain);
            noteGain.connect(mainGainNode);
            
            osc.start();
            osc.stop(audioCtx.currentTime + beatDuration);
            // Emit note symbol floating into view
            emitFloatingNote();
        }
        // Increment note index
        noteIndex = (noteIndex + 1) % notes.length;
        // Schedule next note
        synthTimeout = setTimeout(playNextNote, beatDuration * 1000);
    }
    // 4. Play and Pause controls
    function startPlaying() {
        initAudio();
        
        // Resume context if suspended (browser security)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isPlaying = true;
        playBtn.textContent = '⏸';
        
        // Spin animations
        spoolL.classList.add('spool-spinning');
        spoolR.classList.add('spool-spinning');
        vinylDisc.classList.add('vinyl-spinning');
        toneArm.classList.add('tonearm-active');
        // Start sequencer
        noteIndex = 0;
        playNextNote();
    }
    function stopPlaying() {
        isPlaying = false;
        playBtn.textContent = '▶';
        
        // Stop animations
        spoolL.classList.remove('spool-spinning');
        spoolR.classList.remove('spool-spinning');
        vinylDisc.classList.remove('vinyl-spinning');
        toneArm.classList.remove('tonearm-active');
        // Clear timeout
        if (synthTimeout) clearTimeout(synthTimeout);
    }
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopPlaying();
        } else {
            startPlaying();
        }
    });
    // 5. Volume and Tempo changes
    volumeControl.addEventListener('input', () => {
        if (mainGainNode) {
            mainGainNode.gain.setValueAtTime(volumeControl.value, audioCtx.currentTime);
        }
    });
    // 6. Next & Previous Tracks
    function switchTrack(direction) {
        const wasPlaying = isPlaying;
        if (wasPlaying) stopPlaying();
        currentTrackIndex = (currentTrackIndex + direction + tracks.length) % tracks.length;
        trackNameLabel.textContent = `Track: ${tracks[currentTrackIndex].name}`;
        if (wasPlaying) {
            setTimeout(startPlaying, 200);
        }
    }
    prevBtn.addEventListener('click', () => switchTrack(-1));
    nextBtn.addEventListener('click', () => switchTrack(1));
    // 7. Emit Floating Notes
    function emitFloatingNote() {
        const notesSymbols = ['♪', '♫', '♬', '♩', '♩', '✨', '💖'];
        const note = document.createElement('div');
        note.className = 'floating-note';
        note.innerText = notesSymbols[Math.floor(Math.random() * notesSymbols.length)];
        
        // Position relative to the deck
        const rect = vinylDisc.getBoundingClientRect();
        const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 50;
        const startY = rect.top + rect.height / 2;
        note.style.left = `${startX}px`;
        note.style.top = `${startY}px`;
        note.style.position = 'fixed'; // Float relative to window
        document.body.appendChild(note);
        // Cleanup
        setTimeout(() => {
            note.remove();
        }, 2000);
    }
});
