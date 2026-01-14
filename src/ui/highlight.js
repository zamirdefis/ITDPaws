

export const load = () => {
return new Promise((resolve, reject) => {
  if (window.hljs) return resolve(window.hljs);

  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js";
  script.integrity = "sha512-EBLzUL8XLl+va/zAsmXwS7Z2B1F9HUHkZwyS/VKwh3S7T/U0nF4BaU29EP/ZSf6zgiIxYAnKLu6bJ8dqpmX5uw==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";

  script.onload = () => resolve(window.hljs);
  script.onerror = () => reject(new Error("Failed to load Highlight.js"));

  document.head.appendChild(script);
})
    .then(() => {
      if (document.querySelector('#hljs-theme')) return;

      const link = document.createElement('link');
      link.id = "hljs-theme";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/ashes.min.css";
      document.head.appendChild(link);
    });
}
