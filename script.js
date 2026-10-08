(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('[data-header]');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]') || document.querySelector('#mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      menu.inert = !open;
      document.body.classList.toggle('no-scroll', open);
    });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { toggle.setAttribute('aria-expanded','false'); menu.hidden = true; menu.inert = true; document.body.classList.remove('no-scroll'); }); });
  }

  var motionButtons = document.querySelectorAll('[data-motion-toggle]');
  motionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var scene = button.closest('.motion-scene');
      if (!scene) return;
      var paused = scene.classList.toggle('motion-paused');
      button.setAttribute('aria-pressed', String(paused));
      var label = button.querySelector('[data-motion-label]');
      if (label) label.textContent = paused ? 'Play motion' : 'Pause motion';
    });
  });

  var data = [
    { initials:'JR', name:'Jordan Reed', vehicle:'2023 Toyota Tacoma · Web lead', question:'Hi! Is the Tacoma still available?', reply:'Hi Jordan! It is. I can have it ready for a test drive Thursday at 4:30 or Friday at 10. What works for you?', customerReply:'Thursday at 4:30 works for me.', title:'Test drive confirmed', detail:'4:30 PM · With Marcus Wilson', avatar:'pale-green' },
    { initials:'PS', name:'Priya Shah', vehicle:'2022 Honda CR-V · Phone lead', question:'Do you accept trade-ins?', reply:'We do. I can get a quick estimate ready before your visit. What are you driving now?', customerReply:'A 2019 Subaru Forester.', title:'Trade-in estimate queued', detail:'Today · With the BDC team', avatar:'pale-violet' },
    { initials:'ML', name:'Marcus Lee', vehicle:'2021 Chevrolet Silverado · Web lead', question:'Can I stop by tomorrow?', reply:'Absolutely. I can hold a spot at 10:00 or 2:30. Which is better for you?', customerReply:'2:30 works.', title:'Visit requested', detail:'Tomorrow, 2:30 PM · With Marcus Wilson', avatar:'pale-sand' },
    { initials:'AB', name:'Ana Brooks', vehicle:'2023 Ford F-150 · Service follow-up', question:'Thanks for the update!', reply:'You are welcome, Ana. I will keep your F-150 ready for pickup and send a reminder before your appointment.', customerReply:'Perfect, see you then.', title:'Service reminder sent', detail:'Tomorrow · Northline Ford service', avatar:'pale-blue' }
  ];
  var leadButtons = document.querySelectorAll('[data-lead]');
  var fields = { initials:document.querySelector('[data-customer-initials]'), name:document.querySelector('[data-customer-name]'), vehicle:document.querySelector('[data-customer-vehicle]'), question:document.querySelector('[data-customer-question]'), reply:document.querySelector('[data-agent-reply]'), customerReply:document.querySelector('[data-customer-reply]'), title:document.querySelector('[data-appointment-title]'), detail:document.querySelector('[data-appointment-detail]') };
  function setLead(index) {
    var item = data[index]; if (!item) return;
    Object.keys(fields).forEach(function (key) { if (fields[key]) fields[key].textContent = item[key]; });
    if (fields.initials) { fields.initials.className = 'avatar ' + item.avatar; }
    leadButtons.forEach(function (button) { var active = Number(button.getAttribute('data-lead')) === index; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
    document.querySelectorAll('[data-timeline-step]').forEach(function (step, i) { step.classList.toggle('active', i <= 2); });
  }
  leadButtons.forEach(function (button) { button.addEventListener('click', function () { setLead(Number(button.getAttribute('data-lead'))); }); });
  setLead(0);

  var channels = document.querySelectorAll('[data-channel]');
  var incoming = document.querySelector('[data-channel-incoming]');
  var outgoing = document.querySelector('[data-channel-outgoing]');
  var detail = document.querySelector('[data-channel-detail]');
  var channelCopy = { sms:['Can I come by Thursday?','Absolutely. I’ll have it ready.','Delivered · One shared conversation'], email:['Subject: Your Tacoma is ready','Hi Jordan — a quick update for you.','Sent · Thread stays in context'], video:['Jordan joined the walkaround','The truck looks great from here.','Live · Video notes saved'] };
  channels.forEach(function (button) { button.addEventListener('click', function () { var key = button.getAttribute('data-channel'); var copy = channelCopy[key]; channels.forEach(function (x) { x.setAttribute('aria-pressed', String(x === button)); }); if (incoming) incoming.textContent = copy[0]; if (outgoing) outgoing.textContent = copy[1]; if (detail) detail.textContent = copy[2]; }); });

  if (reduce) document.querySelectorAll('.motion-scene').forEach(function (x) { x.classList.add('motion-paused'); });
})();
