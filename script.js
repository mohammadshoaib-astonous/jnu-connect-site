// Mobile sidebar toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function closeNav() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
  }

  toggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('show');
  });
  overlay?.addEventListener('click', closeNav);
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', closeNav));

  // ---------- LinkedIn post generator (connect.html only) ----------
  const postBox = document.getElementById('postBox');
  if (postBox) {
    const chips = document.querySelectorAll('.chip[data-topic]');
    const nameInput = document.getElementById('nameInput');
    const copyBtn = document.getElementById('copyBtn');
    const openBtn = document.getElementById('openLinkedIn');
    const feedback = document.getElementById('copyFeedback');

    const defaultTopics = ['Objects & Fields', 'Automation with Flow', 'Approval Processes'];
    const selected = new Set(defaultTopics);

    function syncChips() {
      chips.forEach(c => {
        c.classList.toggle('selected', selected.has(c.dataset.topic));
      });
    }

    function buildPost() {
      const name = (nameInput?.value || '').trim();
      const intro = name ? `${name} here 👋 —` : "Excited to share —";
      const topicsArr = Array.from(selected);
      let topicsLine;
      if (topicsArr.length === 0) {
        topicsLine = "core Salesforce concepts";
      } else if (topicsArr.length === 1) {
        topicsLine = topicsArr[0];
      } else {
        topicsLine = topicsArr.slice(0, -1).join(', ') + ' and ' + topicsArr[topicsArr.length - 1];
      }

      const text = `🚀 ${intro} today I attended the Salesforce workshop at Jaipur National University and built "JNU Connect" — a real working app, click by click, no code!

We covered ${topicsLine}, and even test-drove an Agentforce AI agent built right on top of our own data model.

Huge thanks to Mohammad Shoaib for a genuinely hands-on session that made Salesforce click (pun intended) 😄

#Salesforce #JNUConnect #Trailblazer #LowCode #Agentforce #JaipurNationalUniversity #SalesforceWorkshop`;

      postBox.value = text;
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const t = chip.dataset.topic;
        if (selected.has(t)) selected.delete(t); else selected.add(t);
        syncChips();
        buildPost();
      });
    });

    nameInput?.addEventListener('input', buildPost);

    copyBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(postBox.value);
        feedback.textContent = 'Copied!';
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 1800);
      } catch (e) {
        postBox.select();
        document.execCommand('copy');
        feedback.textContent = 'Copied!';
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 1800);
      }
    });

    openBtn?.addEventListener('click', () => {
      window.open('https://www.linkedin.com/feed/', '_blank', 'noopener');
    });

    syncChips();
    buildPost();
  }
});
