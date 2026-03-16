(function bootstrapDashboardLegacyShim() {
  const start = () => {
    if (typeof window !== "undefined" && typeof window.bootstrapDashboard === "function") {
      window.bootstrapDashboard();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
