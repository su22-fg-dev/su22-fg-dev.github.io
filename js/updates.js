async function loadUpdates() {
  const container = document.getElementById("updates-container");

  try {
    const res = await fetch("updates/updates.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const entries = await res.json();

    // sort by date descending
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const entry of entries) {
      const article = document.createElement("article");
      article.className = "update-entry";

      article.innerHTML = `
        <div class="update-marker"></div>
        <div class="update-content">
          <div class="update-date mono">${entry.date}</div>
          <h4>${entry.title}</h4>
          <div class="update-tags">
            ${entry.tags.map(tag => `<span>${tag}</span>`).join("")}
          </div>
          <ul>
            ${entry.content.map(line => `<li>${line}</li>`).join("")}
          </ul>
        </div>
      `;

      container.appendChild(article);

      requestAnimationFrame(() => {
        article.classList.add("visible");
      });
    }

  } catch (err) {
    container.innerHTML = `<p class="mono updates-error">Failed to load development log.</p>`;
    console.error("Updates loading error:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadUpdates);
