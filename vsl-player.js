document.querySelectorAll('video').forEach(video => {
  video.defaultPlaybackRate = 1.2;
  video.playbackRate = 1.2;

  const stage = video.closest('.vsl-stage');
  if (!stage || stage.querySelector('.vsl-play')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'vsl-play';
  btn.setAttribute('aria-label', 'Play the Local LVRG walkthrough');
  btn.innerHTML = '<span class="vsl-play-icon" aria-hidden="true"></span><span class="vsl-play-text">Watch the walkthrough</span>';
  stage.appendChild(btn);

  const hide = () => { btn.hidden = true; };
  btn.addEventListener('click', () => {
    hide();
    const p = video.play();
    if (p && p.catch) p.catch(() => { btn.hidden = false; });
  });
  video.addEventListener('play', hide);
  video.addEventListener('pause', () => { if (video.currentTime < 0.1) btn.hidden = false; });
});
