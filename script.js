/* ============================================
   بخش ویدیو معرفی
   ============================================ */
const introOverlay = document.getElementById('introOverlay');
const introVideo = document.getElementById('introVideo');
const introStart = document.getElementById('introStart');
const mainContent = document.getElementById('mainContent');

let introPlayed = false;

/* کلیک روی دکمه شروع → پخش ویدیو */
introStart.addEventListener('click', () => {
    if (introPlayed) return;
    introPlayed = true;

    introStart.classList.add('hide');
    introVideo.play();

    /* تلاش برای نمایش تمام‌صفحه (اختیاری — روی موبایل ممکنه کار نکنه) */
    if (introVideo.requestFullscreen) {
        // introVideo.requestFullscreen().catch(() => {});
    }
});

/* وقتی ویدیو تموم شد → محو و حذف */
introVideo.addEventListener('ended', () => {
    endIntro();
});

/* اگه کاربر خواست زودتر رد کنه، با کلیک روی ویدیو در حال پخش */
introVideo.addEventListener('click', () => {
    if (!introVideo.paused) {
        endIntro();
    }
});

/* اگه ویدیو خطا داد یا لود نشد → مستقیم برو سراغ محتوا */
introVideo.addEventListener('error', () => {
    console.warn('ویدیو لود نشد، مستقیم می‌ریم سراغ محتوا');
    endIntro();
});

function endIntro() {
    introVideo.pause();
    introOverlay.classList.add('hide');
    mainContent.classList.add('show');

    /* بعد از انیمیشن محو شدن، از DOM حذفش کن */
    setTimeout(() => {
        introOverlay.remove();
    }, 1200);
}

/* ============================================
   کدهای قبلی اسکرول (بدون تغییر)
   ============================================ */
const container = document.querySelector('.scroll-container');
const slides = document.querySelectorAll('.slide');
const scrollHint = document.getElementById('scrollHint');

/* ====== تشخیص اسلاید فعال ====== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = [...slides].indexOf(entry.target);

        if (entry.isIntersecting) {
            /* انیمیشن محتوای اسلاید فعال رو دوباره اجرا کن */
            const content = entry.target.querySelector('.content');
            if (content) {
                content.style.animation = 'none';
                void content.offsetWidth;   // trigger reflow
                content.style.animation = 'fadeIn 1.2s ease';
            }

            /* راهنمای اسکرول فقط توی صفحه اول دیده بشه */
            if (index > 0) scrollHint.classList.add('hide');
            else scrollHint.classList.remove('hide');
        }
    });
}, {
    root: container,
    threshold: 0.6
});

slides.forEach(slide => observer.observe(slide));

/* ====== مخفی کردن راهنما بعد از اولین اسکرول ====== */
container.addEventListener('scroll', () => {
    if (container.scrollTop > 50) {
        scrollHint.classList.add('hide');
    }
}, { passive: true });
