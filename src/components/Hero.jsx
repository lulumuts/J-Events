import { useCallback, useEffect, useRef, useState } from 'react';
import { assetUrl } from '../utils/assetUrl';
import HeroTypedContent from './HeroTypedContent';

const HERO_MP4 = assetUrl('hero/hero.mp4');
const HERO_WEBM = assetUrl('hero/hero.webm');
const INTRO_MS = 6000;
const VIDEO_READY_TIMEOUT_MS = 15000;

const supportsBackdropFilter = () => {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
  return CSS.supports('backdrop-filter', 'blur(1px)')
    || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
};

export default function Hero({ children }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const introStartedRef = useRef(false);
  const introDoneTimerRef = useRef(0);
  const [loadVideo, setLoadVideo] = useState(false);
  const [glassActive, setGlassActive] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [videoPlaybackReady, setVideoPlaybackReady] = useState(false);
  const [videoIntroActive, setVideoIntroActive] = useState(false);
  const [noBackdrop, setNoBackdrop] = useState(false);

  const finishIntro = useCallback(() => {
    heroRef.current?.classList.add('bm-hero-stage--intro-done');
  }, []);

  const startVideoIntro = useCallback((skipAnimation = false) => {
    if (introStartedRef.current) return;
    introStartedRef.current = true;

    if (skipAnimation) {
      heroRef.current?.classList.add('bm-hero-stage--intro-done');
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVideoIntroActive(true);
        introDoneTimerRef.current = window.setTimeout(finishIntro, INTRO_MS);
      });
    });
  }, [finishIntro]);

  const tryStartVideoIntro = useCallback(() => {
    if (!glassActive || !typingComplete || !videoPlaybackReady || introStartedRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    startVideoIntro(prefersReducedMotion);
  }, [glassActive, typingComplete, videoPlaybackReady, startVideoIntro]);

  const handleTypingComplete = useCallback(() => {
    setTypingComplete(true);
  }, []);

  useEffect(() => {
    setNoBackdrop(!supportsBackdropFilter());
    setLoadVideo(true);

    let outerFrame = 0;
    let innerFrame = 0;
    outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        setGlassActive(true);
        setContentVisible(true);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
      if (introDoneTimerRef.current) {
        window.clearTimeout(introDoneTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    tryStartVideoIntro();
  }, [tryStartVideoIntro]);

  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video) return undefined;

    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const markPlaybackReady = () => {
      setVideoPlaybackReady(true);
    };

    const beginPlayback = () => {
      if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        markPlaybackReady();
        return;
      }

      video.play().catch(() => {
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          markPlaybackReady();
        }
      });
    };

    const onCanPlay = () => beginPlayback();

    video.addEventListener('playing', markPlaybackReady, { once: true });
    video.addEventListener('canplay', onCanPlay, { once: true });

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      beginPlayback();
    }

    const readyTimeout = window.setTimeout(() => {
      markPlaybackReady();
    }, VIDEO_READY_TIMEOUT_MS);

    return () => {
      video.removeEventListener('playing', markPlaybackReady);
      video.removeEventListener('canplay', onCanPlay);
      window.clearTimeout(readyTimeout);
    };
  }, [loadVideo]);

  const stageClass = [
    'bm-hero-stage',
    glassActive ? 'bm-hero-stage--glass-active' : '',
    contentVisible ? 'bm-hero-stage--content-visible' : '',
    videoPlaybackReady ? 'bm-hero-stage--video-ready' : '',
    videoIntroActive ? 'bm-hero-stage--animate' : '',
    noBackdrop ? 'bm-hero-stage--no-backdrop' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={stageClass}
      ref={heroRef}
    >
      <div className="bm-hero-glass-card">
        <div className="bm-hero-bg" aria-hidden="true">
          <video
            ref={videoRef}
            className="bm-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload={loadVideo ? 'auto' : 'none'}
          >
            {loadVideo ? (
              <>
                <source src={HERO_MP4} type="video/mp4" />
                <source src={HERO_WEBM} type="video/webm" />
              </>
            ) : null}
          </video>
          <div className="bm-hero-video-overlay" />
        </div>

        <div className="bm-hero-glass-card__frost" aria-hidden="true" />

        <div className="bm-hero-glass-card__content">
          {children}
          <div className="bm-hero">
            <div className="bm-hero-inner">
              <div className="bm-hero-main">
                <div className="bm-hero-copy">
                  <HeroTypedContent
                    start={glassActive}
                    onTypingComplete={handleTypingComplete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
