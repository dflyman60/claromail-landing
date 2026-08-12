(function () {
  const panel = document.querySelector('[data-demo="panel"]');
  if (!panel) return;

  const account = panel.querySelector('[data-demo="account"]');
  const toast = panel.querySelector('[data-demo="toast"]');
  const rows = Array.from(panel.querySelectorAll('[data-demo="row"]'));
  const counts = rows.map((row) => row.querySelector("[data-count]"));
  const targets = counts.map((el) => Number(el.getAttribute("data-count") || 0));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stages = [
    { id: "connect", ms: 2200, account: "Sign in with Microsoft", toast: "" },
    { id: "scan", ms: 2800, account: "you@outlook.com", toast: "Scanning Inbox…" },
    { id: "review", ms: 2400, account: "you@outlook.com", toast: "Pick a sender to clean" },
    { id: "clean", ms: 2400, account: "you@outlook.com", toast: "Moved to Deleted Items" },
    { id: "block", ms: 2600, account: "you@outlook.com", toast: "Block rule on Microsoft servers" },
  ];

  let index = 0;
  let countTimers = [];
  let stageTimer = null;

  function clearCountTimers() {
    countTimers.forEach((id) => window.clearInterval(id));
    countTimers = [];
  }

  function setCounts(values) {
    counts.forEach((el, i) => {
      el.textContent = String(values[i]);
    });
  }

  function animateCounts() {
    clearCountTimers();
    setCounts([0, 0, 0]);
    counts.forEach((el, i) => {
      const target = targets[i];
      const steps = 16;
      let step = 0;
      const timer = window.setInterval(() => {
        step += 1;
        el.textContent = String(Math.round((target * step) / steps));
        if (step >= steps) window.clearInterval(timer);
      }, 70);
      countTimers.push(timer);
    });
  }

  function applyStage(stage) {
    panel.setAttribute("data-stage", stage.id);
    if (account) {
      account.innerHTML =
        '<span class="panel-account-dot"></span>' + stage.account;
    }
    if (toast) toast.textContent = stage.toast;

    if (stage.id === "scan") {
      animateCounts();
    } else if (stage.id === "connect") {
      clearCountTimers();
      setCounts([0, 0, 0]);
    } else {
      clearCountTimers();
      setCounts(targets);
    }
  }

  function next() {
    index = (index + 1) % stages.length;
    applyStage(stages[index]);
    stageTimer = window.setTimeout(next, stages[index].ms);
  }

  function start() {
    if (reduceMotion) {
      applyStage({
        id: "review",
        account: "you@outlook.com",
        toast: "Pick a sender to clean",
      });
      setCounts(targets);
      return;
    }
    applyStage(stages[0]);
    stageTimer = window.setTimeout(next, stages[0].ms);
  }

  start();

  document.addEventListener("visibilitychange", () => {
    if (reduceMotion) return;
    if (document.hidden) {
      window.clearTimeout(stageTimer);
      clearCountTimers();
    } else {
      window.clearTimeout(stageTimer);
      stageTimer = window.setTimeout(next, stages[index].ms);
    }
  });
})();
