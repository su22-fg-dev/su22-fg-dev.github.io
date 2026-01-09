async function loadUpdates() {
    const container = document.getElementById("updates-container");

    try {
        const indexResponse = await fetch("updates/index.json");
        if (!indexResponse.ok) throw new Error(`HTTP ${indexResponse.status}`);
        const files = await indexResponse.json();

        for (const file of files) {
            const res = await fetch(`updates/${file}`);
            if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
            const entry = await res.json();

            const article = document.createElement("article");
            article.className = "update-entry";

            article.innerHTML = `
                <div class="update-date mono">${entry.date}</div>
                <div class="update-body">
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
        }

    } catch (err) {
        container.innerHTML = "<p class='mono'>Failed to load development log.</p>";
        console.error("Updates loading error:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadUpdates);
