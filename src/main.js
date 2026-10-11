function qualTab(i){
    document.querySelectorAll('#qual-tabs .pill-tab').forEach((b,n) => b.classList.toggle('active', n===i));
    document.querySelectorAll('.qual-panel').forEach((p,n) => p.classList.toggle('active', n===i));
  }

  const caseViews = ['case-01','case-02','case-03','case-04','case-05','case-06','case-07'];

  function flipBuildCard(showForm){
    const card = document.getElementById('build-flip-card');
    card.classList.toggle('flipped', showForm);
  }

  function sendBuildForm(e){
    e.preventDefault();
    const name = document.getElementById('bf-name').value;
    const email = document.getElementById('bf-email').value;
    const message = document.getElementById('bf-message').value;
    const subject = encodeURIComponent('Portfolio enquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:tshepodataboy@gmail.com?subject=' + subject + '&body=' + body;
    return false;
  }

  function toggleMobileNav(){
    document.getElementById('nav-mobile-panel').classList.toggle('open');
  }

  function pmapToggle(i){
    const panel = document.getElementById('pmap-panel-' + i);
    const card = document.querySelectorAll('#pmap-row .pmap-card')[i];
    const isOpen = panel.classList.contains('open');
    document.querySelectorAll('.pmap-panel').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('#pmap-row .pmap-card').forEach(c => c.classList.remove('open'));
    if(!isOpen){ panel.classList.add('open'); card.classList.add('open'); }
  }

  function go(target){
    const backdrop = document.getElementById('qual-modal-backdrop');
    if(backdrop && backdrop.classList.contains('open')) closeQualModal();
    location.hash = target;
  }

  (function(){
    var navEl = document.querySelector('.nav');
    if(!navEl) return;
    var lastY = window.scrollY || 0;
    var navHeight = navEl.offsetHeight || 88;
    window.addEventListener('scroll', function(){
      var y = window.scrollY || 0;
      if(y <= navHeight){
        navEl.classList.remove('nav-hidden');
      } else if(y > lastY){
        navEl.classList.add('nav-hidden');
      } else if(y < lastY){
        navEl.classList.remove('nav-hidden');
      }
      lastY = y;
    }, { passive: true });
  })();

  function openQualModal(id, titleText){
    const panel = document.getElementById(id);
    if(!panel) return;
    document.getElementById('qual-modal-title').textContent = titleText || '';
    document.getElementById('qual-modal-body').innerHTML = panel.innerHTML;
    document.getElementById('qual-modal-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQualModal(){
    document.getElementById('qual-modal-backdrop').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeQualModal();
  });

  /* ---- Currently Leading spotlight carousel ---- */
  (function(){
    const track = document.getElementById('spotlight-track');
    const dots = document.querySelectorAll('.sdot');
    const spotlight = document.getElementById('spotlight');
    if(!track) return;

    const total = track.children.length;
    let index = 0;
    let autoTimer = null;
    const AUTO_MS = 5000;

    function render(){
      Array.from(track.children).forEach((slide,i) => slide.classList.toggle('active', i === index));
      dots.forEach((d,i) => d.classList.toggle('active', i === index));
    }

    window.spotlightGo = function(i){
      index = ((i % total) + total) % total;
      render();
      restartAuto();
    };

    function next(){
      index = (index + 1) % total;
      render();
    }

    function startAuto(){
      autoTimer = setInterval(next, AUTO_MS);
    }
    function restartAuto(){
      clearInterval(autoTimer);
      startAuto();
    }

    // swipe support
    let startX = 0, deltaX = 0, dragging = false;

    spotlight.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX; dragging = true; deltaX = 0;
      clearInterval(autoTimer);
    }, {passive:true});
    spotlight.addEventListener('touchmove', e => {
      if(!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, {passive:true});
    spotlight.addEventListener('touchend', () => {
      if(!dragging) return;
      dragging = false;
      if(deltaX > 40) window.spotlightGo(index - 1);
      else if(deltaX < -40) window.spotlightGo(index + 1);
      else restartAuto();
    });

    // mouse drag support (desktop)
    let mouseDown = false, mouseStartX = 0, mouseDeltaX = 0;
    spotlight.addEventListener('mousedown', e => {
      mouseDown = true; mouseStartX = e.clientX; mouseDeltaX = 0;
      clearInterval(autoTimer);
    });
    window.addEventListener('mousemove', e => {
      if(!mouseDown) return;
      mouseDeltaX = e.clientX - mouseStartX;
    });
    window.addEventListener('mouseup', () => {
      if(!mouseDown) return;
      mouseDown = false;
      if(mouseDeltaX > 40) window.spotlightGo(index - 1);
      else if(mouseDeltaX < -40) window.spotlightGo(index + 1);
      else restartAuto();
    });

    render();
    startAuto();
  })();

  function route(){
    const hash = (location.hash || '#home').slice(1);
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    const certMatch = hash.match(/^(case-0[125])-cert$/);
    if(certMatch){
      const baseView = certMatch[1];
      document.getElementById('view-' + baseView).classList.add('active');
      const el = document.getElementById(hash);
      if(el){ setTimeout(() => el.scrollIntoView({behavior:'smooth', block:'start'}), 30); }
      else { window.scrollTo(0,0); }
    } else if(caseViews.includes(hash)){
      document.getElementById('view-' + hash).classList.add('active');
      window.scrollTo(0,0);
    } else {
      document.getElementById('view-home').classList.add('active');
      if(hash && hash !== 'home'){
        const el = document.getElementById(hash);
        if(el){ setTimeout(() => el.scrollIntoView({behavior:'smooth', block:'start'}), 30); }
        else { window.scrollTo(0,0); }
      } else {
        window.scrollTo(0,0);
      }
    }
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('DOMContentLoaded', route);
