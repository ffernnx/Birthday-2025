// --- CONFIGURATION ---
const THEMES = {
    'My Mother': {
        gradient: 'linear-gradient(135deg, #ffffffff 0%, #eac6daff 100%)',
        primary: '#d76576',
        textColor: '#1e293b',
        glassBg: 'rgba(255, 255, 255, 0.35)',
        glassBorder: 'rgba(255, 255, 255, 0.6)',
        message: "สุขสันต์วันเกิดนะคะคุณแม่ วันเกิดปีนี้ขอให้คุณแม่มีความสุขมากๆ สุขภาพร่างกายแข็งแรง ไม่เจ็บไข้ได้ป่วย เฮงๆรวยๆเงินไหลมาเทมาเยอะๆ ยิ้มสวยๆเหมือนนางงามแบบนี้ตลอดไปนะคะ และขอบคุณตุณแม่มากๆนะคะ ที่คอยดูแลเอาใจใส่ ทำอาหารอร่อยๆให้กิน และคอยบ่นคอยสอนด้วยความหวังดีเสมอมา บางทีหนูอาจจะดื้อไปบ้างต้องขอโทษด้วยนะคะ และขอให้ทุกๆวันของคุณแม่เต็มไปด้วยรอยยิ้มที่แสนอบอุ่นจากครอบครัวนะคะ ใบเฟิร์นรักคุณแม่ที่สุดในโลกเลยค่ะ",
        confettiColors: ['#ff0000', '#ffa500', '#ffc0cb'],
        musicSrc: 'music/HBD_song.mp3',
        photos: [
            'picture/Mom/mom-1.jpg', 
            'picture/Mom/mom-2.jpg',
            'picture/Mom/mom-3.jpg',  
            'picture/Mom/mom-4.jpg', 
            'picture/Mom/mom-5.jpg', 
            'picture/Mom/mom-6.jpg', 
            'picture/Mom/mom-7.jpg', 
            'picture/Mom/mom-8.jpg'
        ]
    },
    'My Father': {
        gradient: 'linear-gradient(to bottom, #63a9ff, #93fffa)',
        primary: '#3c2982',
        textColor: '#1e293b',
        glassBg: 'rgba(255, 255, 255, 0.35)',
        glassBorder: 'rgba(255, 255, 255, 0.6)',
        message: "สุขสันต์วันเกิดนะคะป๊า วันเกิดปีนี้หนูอาจจะไม่ได้มีของขวัญราคาแพงอะไรมอบให้ แต่หนูอยากบอกป๊าว่า ขอบคุณที่คอยเป็นแบบอย่าง เป็นที่ปรึกษา และให้ความรักกับลูกเสมอมา ปีนี้หนูอยากเห็นป๊าพักผ่อนเยอะๆ วางเรื่องเครียดๆ ลงบ้าง หาเวลาทำสิ่งที่ป๊าชอบ และดูแลสุขภาพตัวเองให้แข็งแรงอยู่เสมอ หนูสัญญาว่าหนูจะตั้งใจเรียน ทำหน้าที่ของตัวเองให้ดีที่สุดนะคะ ใบเฟิร์นรักป๊านะคะ",
        confettiColors: ['#ffd700', '#008080', '#ffffff'],
        musicSrc: 'music/HBD_song.mp3',
        photos: [
            'picture/Dad/dad-1.jpg', 
            'picture/Dad/dad-2.jpg',
            'picture/Dad/dad-3.jpg',  
            'picture/Dad/dad-4.jpg', 
            'picture/Dad/dad-5.jpg', 
            'picture/Dad/dad-6.jpg', 
            'picture/Dad/dad-7.jpg', 
            'picture/Dad/dad-8.jpg'
        ]
    }
};

// --- DOM ELEMENTS ---
const homeView = document.getElementById('home-view');
const greetingView = document.getElementById('greeting-view');
const musicPlayer = document.getElementById('bg-music');
const root = document.documentElement;
let currentThemeObj = null;

// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// --- CORE FUNCTIONS ---

function selectProfile(person) {
    const theme = THEMES[person];
    currentThemeObj = theme;

    root.style.setProperty('--bg-gradient', theme.gradient);
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--glass-bg', theme.glassBg);
    root.style.setProperty('--glass-border', theme.glassBorder);

    document.getElementById('name-placeholder').textContent = person;
    document.getElementById('message-placeholder').textContent = theme.message;

    const photoElements = document.querySelectorAll('.polaroid-img'); 
    if (theme.photos && theme.photos.length > 0) {
        photoElements.forEach((img, index) => {
            if (theme.photos[index]) {
                img.src = theme.photos[index];
            }
        });
    }

    homeView.classList.remove('active');
    greetingView.classList.add('active');
    greetingView.scrollTop = 0; 

    triggerConfetti(theme.confettiColors);
    
    document.getElementById('flame-el').classList.remove('lit');
    document.getElementById('cake-text').textContent = "Tap to light the candle";

    if (theme.musicSrc) {
        musicPlayer.src = theme.musicSrc;
        musicPlayer.volume = 0.5;
        musicPlayer.play().catch(e => console.log("Audio play failed:", e));
    }
}

function goHome() {
    greetingView.classList.remove('active');
    homeView.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
    
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
}

function lightCandle(event) {
    const flame = document.getElementById('flame-el');
    const text = document.getElementById('cake-text');
    const element = event.currentTarget; 
    
    if (!flame.classList.contains('lit')) {
        flame.classList.add('lit');
        text.textContent = "Make a wish! ✨";
        
        const rect = element.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x: x, y: y },
            colors: currentThemeObj.confettiColors,
            scalar: 0.8
        });

        setTimeout(() => {
            flame.classList.remove('lit');
            text.textContent = "Tap to light the candle";
        }, 5000);
    }
}

function triggerConfetti(colors) {
    const end = Date.now() + 1000;
    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
