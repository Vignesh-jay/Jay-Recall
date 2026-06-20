function loadDashboard() {

    const entries =
        getEntries();

    const recentEntries =
        entries.slice(0, 5);

    const favorites =
        entries.filter(
            e => e.favorite
        );

    const categories =
        [...new Set(
            entries.map(
                e => e.type
            )
        )];

    const lastUpdated =
        entries.length
            ? new Date(
                entries[0].createdAt
              ).toLocaleDateString()
            : "Never";

    const favoriteCommands =
        entries.filter(
            e =>
                e.type === "⚡ Command Vault" &&
                e.favorite
        );

    const recentSearches =
        JSON.parse(
            localStorage.getItem(
                "recent_searches"
            )
        ) || [];

      
    document.getElementById("content")
        .innerHTML = `

        <h1 class="page-title">

            Welcome Back 👋

        </h1>

        <p class="dashboard-subtitle">

            Search your knowledge.
            Find your solutions.
            Never learn the same thing twice.

        </p>

        <div class="stats-grid">

            <div class="stat-card" onclick="loadKnowledgeBase()">

                <h3>Entries</h3>

                <h1>${entries.length}</h1>

            </div>

            <div class="stat-card" onclick="loadFavorites()">

                <h3>Favorites</h3>

                <h1>${favorites.length}</h1>

            </div>

            <div class="stat-card">

                <h3>Types</h3>

                <h1>${categories.length}</h1>

            </div>

            <div class="stat-card">

                <h3>
                    Last Update
                </h3>

                <h1>
                    ${lastUpdated}
                </h1>

            </div>

        </div>
        <div class="recent-section">

            <h2>
                Recent Knowledge
            </h2>
            <br>

            ${
                recentEntries.map(entry => `

                    <div
                      class="recent-item"
                      onclick="viewEntry(${entry.id})">

                        <div class="recent-left">

                            <strong>
                                ${entry.title}
                            </strong>

                        </div>

                        <div class="recent-arrow">

                            →

                        </div>

                        <span>

                            ${entry.type}

                        </span>

                    </div>

                `).join("")

            }

        </div>
        <div class="favorite-commands">

            <h2>

                ⭐ Favorite Commands

            </h2>
            <br>

            ${
                favoriteCommands.length
                ?
                favoriteCommands
                    .slice(0, 5)
                    .map(command => `

                        <div
                            class="quick-command">

                            <span>

                                ${command.title}

                            </span>

                            <button
                                onclick="
                                    copyCommand(
                                        \`${command.command}\`,
                                        this
                                    )
                                ">

                                ⧉

                            </button>

                        </div>

                    `)
                    .join("")
                :
                `
                    <div
                        class="empty-state">

                        No favorite commands.

                    </div>
                `
            }

        </div>
        <div class="recent-searches">

    <h2>
        🔍 Recent Searches
    </h2>

    <div class="search-chips">

        ${
            recentSearches
                .map(search => `

                    <div
                        class="search-chip"
                        onclick="openRecentSearch('${search}')">

                        ${search}

                    </div>

                `)
                .join("")
        }

    </div>
    <br>

</div>

    `;
}

function loadSearch() {

    document.getElementById("content")
        .innerHTML = `

        <div class="search-page">

            <div class="search-hero">

                <h1>
                    What are you trying to remember?
                </h1>

                <p>
                    Search your knowledge base instantly
                </p>

                <input
                    id="searchInput"
                    class="search-input"
                    type="text"
                    placeholder="Docker, Cloudflare, VPN, Linux..."
                    oninput="performSearch()"
                >

            </div>

            <div id="searchResults">

            </div>

        </div>

    `;
}

function loadAddEntry() {

    document.getElementById("content")
        .innerHTML = `

        <h1 class="page-title">

            Capture Knowledge

        </h1>

        <div class="form-card">

            <label>
                Entry Type
            </label>
            <br><br>
            <select
                id="entryType"
                onchange="renderTemplate()">

                <option>📝 Knowledge Note</option>

                <option>⚡ Command Vault</option>

                <option>🛠 Troubleshooting</option>

                <option>📚 Documentation</option>

                <option>☁️ Infrastructure</option>

                <option>🔐 Security</option>

                <option>📋 Checklist</option>

            </select>

            <div id="templateContainer">

            </div>

            <button
                class="primary-btn"
                onclick="saveEntry()">

                Save Entry

            </button>

        </div>

    `;

    renderTemplate();
}

function loadFavorites() {

    const favorites =
        getEntries().filter(
            entry => entry.favorite
        );

    document.getElementById("content")
        .innerHTML = `

        <div class="page-header">

            <h1>
                Favorites
            </h1>

            <p>
                Your most important knowledge
            </p>

        </div>
        <br><br>

        <div class="knowledge-grid">

            ${
                favorites
                    .map(renderEntryCard)
                    .join("")
            }

        </div>
        <br>

    `;

}

function loadSettings() {

    document.getElementById("content")
        .innerHTML = `

        <h1 class="page-title">

            Settings

        </h1>

        <div class="settings-section">

            <h3>
                Backup & Restore
            </h3>

            <div class="settings-actions">

                <button
                    class="primary-btn"
                    onclick="loadStarterPack()">

                    📚 Load Starter Pack

                </button>

                <button
                    class="primary-btn"
                    onclick="exportBackup()">

                    📤 Export Backup

                </button>

                <button
                    class="primary-btn"
                    onclick="
                        document
                        .getElementById(
                            'importFile'
                        )
                        .click()
                    ">

                    📥 Import Backup

                </button>

                <input
                    hidden
                    type="file"
                    id="importFile"
                    accept=".json"
                    onchange="importBackup(event)"
                >

            </div>

        </div>

        <div class="settings-section">

            <h3>
                Danger Zone
            </h3>

            <button
                class="danger-btn"
                onclick="resetAllData()">

                🗑 Reset All Data

            </button>

        </div>
        <div class="settings-section">

            <h3>
                About
            </h3>

            <p>
                Jay Recall v1.0
                <br><br>
                Never Google The Same Thing Twice
                <br><br>
                Built by Mr. JAY
            </p>

        </div>

    `;
}

function loadKnowledgeBase() {

    const entries = getEntries();

    document.getElementById("content")
        .innerHTML = `

        <div class="page-header">

            <h1>Knowledge Base</h1>

            <p>
                Searchable knowledge entries
            </p>

        </div>
        <br><br>

        <div class="knowledge-grid">

            ${entries.map(renderEntryCard).join("")}

        </div>
        <br>

    `;
}

function getTypeClass(type) {

    switch(type) {

        case "⚡ Command Vault":

            return "badge-command";

        case "🛠 Troubleshooting":

            return "badge-troubleshoot";

        case "📚 Documentation":

            return "badge-docs";

        case "☁️ Infrastructure":

            return "badge-infra";

        case "🔐 Security":

            return "badge-security";

        case "📋 Checklist":

            return "badge-checklist";

        default:

            return "badge-note";
    }

}

function renderEntryCard(entry) {

    return `

        <div class="knowledge-card">

            <div class="card-top">

                <h3>
                    ${entry.title}
                </h3>

                <span
                    class="
                        type-badge
                        ${getTypeClass(entry.type)}
                    ">

                    ${entry.type}

                </span>

            </div>

            <div class="tag-container">

                ${
                    (entry.tags || "")
                        .split(",")
                        .map(
                            tag => `
                            <span class="tag-chip">
                                ${tag.trim()}
                            </span>
                        `
                        )
                        .join("")
                }

            </div>

            <div class="card-actions">

                <button
                    onclick="viewEntry(${entry.id})">

                    👁
                </button>

                <button
                    onclick="editEntry(${entry.id})">

                    ✏
                </button>

                <button
                    onclick="toggleFavoriteEntry(${entry.id})">

                    ${
                        entry.favorite
                            ? "⭐"
                            : "☆"
                    }

                </button>

                <button
                    onclick="deleteEntryRecord(${entry.id})">

                    🗑
                </button>

            </div>

        </div>

    `;
}

function viewEntry(id) {

    const entry =
        getEntries().find(
            e => e.id === id
        );

    if (!entry) return;

    switch(entry.type) 
    {

        case "⚡ Command Vault":

            renderCommandView(entry);

            break;

        case "🛠 Troubleshooting":

            renderTroubleshootingView(entry);

            break;

        default:

            renderNoteView(entry);

            break;
    }
}

function editEntry(id) {

    const entry =
        getEntries().find(
            e => e.id === id
        );

    document.getElementById("content")
        .innerHTML = `

        <h1 class="page-title">

            Edit Entry

        </h1>

        <div class="form-card">

            <input
                id="editTitle"
                value="${entry.title}"
            >

            <select id="editType">

              <option ${
                  entry.type === "📝 Knowledge Note"
                      ? "selected"
                      : ""
              }>
                  📝 Knowledge Note
              </option>

              <option ${
                  entry.type === "⚡ Command Vault"
                      ? "selected"
                      : ""
              }>
                  ⚡ Command Vault
              </option>

              <option ${
                  entry.type === "🛠 Troubleshooting"
                      ? "selected"
                      : ""
              }>
                  🛠 Troubleshooting
              </option>

              <option ${
                  entry.type === "📚 Documentation"
                      ? "selected"
                      : ""
              }>
                  📚 Documentation
              </option>

              <option ${
                  entry.type === "☁️ Infrastructure"
                      ? "selected"
                      : ""
              }>
                  ☁️ Infrastructure
              </option>

              <option ${
                  entry.type === "🔐 Security"
                      ? "selected"
                      : ""
              }>
                  🔐 Security
              </option>

              <option ${
                  entry.type === "📋 Checklist"
                      ? "selected"
                      : ""
              }>
                  📋 Checklist
              </option>

            </select>

            <input
                id="editTags"
                value="${entry.tags}"
            >

            <textarea
                id="editContent"
                rows="10"
            >${entry.content}</textarea>

            <button
                class="primary-btn"
                onclick="updateEntry(${entry.id})">

                Save Changes

            </button>

        </div>

    `;
}

function toggleFavoriteEntry(id) {

    toggleFavorite(id);

    if (
        document
            .getElementById(
                "searchInput"
            )
    ) {

        performSearch();

    } else {

        loadKnowledgeBase();

    }

}

function deleteEntryRecord(id) {

    if (
        !confirm(
            "Delete this entry?"
        )
    ) return;

    deleteEntry(id);

    loadKnowledgeBase();

}

function performSearch() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const entries =
        getEntries();

    if (!query) {

        document
            .getElementById("searchResults")
            .innerHTML = "";

        return;
    }

    const results =
        entries.filter(entry => {

            return (

                (entry.title || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.type || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.tags || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.content || "")
                    .toLowerCase()
                    .includes(query)

            );

        });

    renderSearchResults(results);
}

function renderSearchResults(results) {

    const container =
        document.getElementById(
            "searchResults"
        );

    if (results.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                No memories found.

            </div>

        `;

        return;
    }

    container.innerHTML = `

        <div class="knowledge-grid">

            ${results
                .map(renderEntryCard)
                .join("")}

        </div>

    `;
}

function exportBackup() {

    const data =
        JSON.stringify(
            getEntries(),
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "jay-recall-backup.json";

    a.click();

}

function resetAllData() {

    if (
        !confirm(
            "Delete all knowledge entries?"
        )
    ) return;

    localStorage.removeItem(
        "jay_recall_entries"
    );

    loadDashboard();

}

function updateEntry(id) {

    const entries =
        getEntries();

    const entry =
        entries.find(
            e => e.id === id
        );

    if (!entry) return;

    entry.title =
        document
            .getElementById(
                "editTitle"
            ).value;

    entry.type =
        document
            .getElementById(
                "editType"
            ).value;

    entry.tags =
        document
            .getElementById(
                "editTags"
            ).value;

    entry.content =
        document
            .getElementById(
                "editContent"
            ).value;

    entry.updatedAt =
        new Date()
            .toISOString();

    saveEntries(entries);

    alert(
        "Entry Updated"
    );

    loadKnowledgeBase();
}

function importBackup(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(e) {

        try {

            const entries =
                JSON.parse(
                    e.target.result
                );

            saveEntries(entries);

            alert(
                "Backup Imported"
            );

            loadDashboard();

        } catch {

            alert(
                "Invalid Backup File"
            );

        }

    };

    reader.readAsText(file);

}

function renderTemplate() {

    const type =
        document.getElementById(
            "entryType"
        ).value;

    const container =
        document.getElementById(
            "templateContainer"
        );

    switch(type) {

    case "📝 Knowledge Note":

    case "📚 Documentation":

    case "☁️ Infrastructure":

    case "🔐 Security":

    case "📋 Checklist":

        container.innerHTML =
            noteTemplate();

        break;

    case "⚡ Command Vault":

        container.innerHTML =
            commandTemplate();

        break;

    case "🛠 Troubleshooting":

        container.innerHTML =
            troubleshootingTemplate();

        break;
}
}

function noteTemplate() {

    return `

        <input
            id="title"
            placeholder="Title"
        >

        <input
            id="tags"
            placeholder="Tags"
        >

        <textarea
            id="contentText"
            rows="8"
            placeholder="Knowledge..."
        ></textarea>

    `;
}

function commandTemplate() {

    return `

        <input
            id="title"
            placeholder="Command Title"
        >

        <input
            id="tags"
            placeholder="docker,linux"
        >

        <textarea
            id="command"
            rows="4"
            placeholder="docker compose up -d"
        ></textarea>

        <textarea
            id="description"
            rows="4"
            placeholder="What does this command do?"
        ></textarea>

    `;
}

function troubleshootingTemplate() {

    return `

        <input
            id="title"
            placeholder="Issue Title"
        >

        <textarea
            id="problem"
            rows="4"
            placeholder="Problem"
        ></textarea>

        <textarea
            id="solution"
            rows="5"
            placeholder="Solution"
        ></textarea>

        <textarea
            id="outcome"
            rows="3"
            placeholder="Outcome"
        ></textarea>

    `;
}

function renderNoteView(entry) {

    document.getElementById("content")
        .innerHTML = `

        <div class="entry-view">

            <div class="entry-type">

                📝 Knowledge Note

            </div>

            <h1>

                ${entry.title}

            </h1>

            <div class="tag-container">

                ${renderTags(entry.tags)}

            </div>

            <div class="entry-content">

                ${entry.content || ""}

            </div>

            <div class="entry-footer">

                Created:
                ${new Date(
                    entry.createdAt
                ).toLocaleString()}

            </div>

        </div>

    `;
}

function renderCommandView(entry) {

    document.getElementById("content")
        .innerHTML = `

        <div class="entry-view">

            <div class="entry-type">

                ⚡ Command Vault

            </div>

            <h1>

                ${entry.title}

            </h1>
            <br>
            <p>

                ${entry.description || ""}

            </p>

            <br>
            <div class="tag-container">

                ${renderTags(entry.tags)}

            </div>

            <div class="command-block">

                <code class="command-text">

                    ${entry.command || ""}

                </code>

                <button
                    class="copy-icon-btn"
                    onclick="copyCommand(
                        \`${entry.command}\`,
                        this
                    )"
                    title="Copy Command">

                    ⧉

                </button>

            </div>

        </div>

    `;
}

function renderTroubleshootingView(entry) {

    document.getElementById("content")
        .innerHTML = `

        <div class="entry-view">

            <div class="entry-type">

                🛠 Troubleshooting

            </div>

            <h1>

                ${entry.title}

            </h1>

            <h3>
                Problem
            </h3>

            <div class="info-box">

                ${entry.problem || ""}

            </div>

            <h3>
                Solution
            </h3>

            <div class="info-box">

                ${entry.solution || ""}

            </div>

            <h3>
                Outcome
            </h3>

            <div class="info-box">

                ${entry.outcome || ""}

            </div>

        </div>

    `;
}

function copyCommand(command, button = null) {

    navigator.clipboard.writeText(
        command
    );

    showToast(
        "✓ Command Copied"
    );

    if (button) {

        const original =
            button.innerHTML;

        button.innerHTML =
            "✓";

        setTimeout(() => {

            button.innerHTML =
                original;

        }, 1500);

    }

}

function renderTags(tags) {

    if (!tags)
        return "";

    return tags
        .split(",")
        .map(tag => `

            <span class="tag-chip">

                ${tag.trim()}

            </span>

        `)
        .join("");
}

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.className =
        "toast";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 10);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}

function quickSearch() {

    const query =
        document
            .getElementById(
                "globalSearch"
            )
            .value
            .toLowerCase()
            .trim();

    const container =
        document.getElementById(
            "quickSearchResults"
        );

    if (!query) {

        container.innerHTML = "";

        return;
    }

    const results =
        getEntries()

        .filter(entry => {

            return (

                (entry.title || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.tags || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.content || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.command || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.problem || "")
                    .toLowerCase()
                    .includes(query)

                ||

                (entry.solution || "")
                    .toLowerCase()
                    .includes(query)

            );

        })

        .slice(0, 5);

    renderQuickSearch(
        results
    );
}

function renderQuickSearch(
    results
) {

    const container =
        document.getElementById(
            "quickSearchResults"
        );

    if (!results.length) {

        container.innerHTML = "";

        return;
    }

    container.innerHTML =
    results.map(entry => `

        <div
            class="search-result-item"
            onclick="openSearchResult(${entry.id})">

            <div
                class="search-result-title">

                ${getTypeIcon(
                    entry.type
                )}

                ${entry.title}

            </div>

            <div
                class="search-result-subtitle">

                ${
                    entry.command
                    ||
                    entry.description
                    ||
                    entry.problem
                    ||
                    entry.content
                    ||
                    ""
                }

            </div>

        </div>

    `)
    .join("");
}

function getTypeIcon(type) {

    switch(type) {

        case "⚡ Command Vault":
            return "⚡";

        case "🛠 Troubleshooting":
            return "🛠";

        case "📚 Documentation":
            return "📚";

        case "☁️ Infrastructure":
            return "☁️";

        case "🔐 Security":
            return "🔐";

        case "📋 Checklist":
            return "📋";

        default:
            return "📝";

    }
}

function clearQuickSearch() {

    document
        .getElementById(
            "globalSearch"
        )
        .value = "";

    document
        .getElementById(
            "quickSearchResults"
        )
        .innerHTML = "";
}

function saveRecentSearch(query) {

    let searches =
        JSON.parse(
            localStorage.getItem(
                "recent_searches"
            )
        ) || [];

    searches =
        searches.filter(
            s => s !== query
        );

    searches.unshift(query);

    searches =
        searches.slice(0, 5);

    localStorage.setItem(
        "recent_searches",
        JSON.stringify(searches)
    );
}

function openRecentSearch(title) {

    const entry =
        getEntries().find(
            e => e.title === title
        );

    if (!entry) return;

    viewEntry(entry.id);

    clearQuickSearch();
}

function checkStarterPack() {

    const entries =
        getEntries();

    if (
        entries.length === 0
    ) {

        showStarterPackModal();

    }

}

function showStarterPackModal() {

    const modal =
        document.createElement("div");

    modal.className =
        "starter-modal";

    modal.innerHTML = `

    <div class="starter-card">

        <h2>🧠 Welcome to Jay Recall</h2>

        <p>
            Load the built-in knowledge pack?
        </p>

        <div class="starter-features">

        ⚡ 50+ Linux Commands<br>
        🐳 Docker Cheat Sheet<br>
        ☁️ Cloudflare & Networking<br>
        🔐 Security Notes<br>
        🛠 Troubleshooting Guides<br>
        📋 IT Checklists

        </div>

        <div class="starter-actions">

            <button
                class="primary-btn"
                onclick="loadStarterPack()">

                ⚡ Load Starter Pack

            </button>

            <button
                class="secondary-btn"
                onclick="closeStarterModal()">

                Skip For Now

            </button>

        </div>

    </div>

    `;

    document.body.appendChild(
        modal
    );
}

function loadStarterPack() {

    if (
        !Array.isArray(
            STARTER_DATA
        )
    ) {

        alert(
            "Starter data missing"
        );

        return;
    }

    saveEntries(
        STARTER_DATA
    );

    showToast(
        "Starter Pack Loaded"
    );

    setTimeout(
        () => {

            location.reload();

        },
        1000
    );

}

function closeStarterModal() {

    document
        .querySelector(".starter-modal")
        ?.remove();

}

loadDashboard();
checkStarterPack();

document
    .getElementById(
        "globalSearch"
    )
    .addEventListener(
        "input",
        quickSearch
    );

document.addEventListener(
    "click",
    function(event) {

        const search =
            document.querySelector(
                ".global-search-wrapper"
            );

        if (
            !search.contains(
                event.target
            )
        ) {

            clearQuickSearch();

        }

    }
);

document.addEventListener(
    "keydown",
    function(e) {

        if (
            (e.ctrlKey || e.metaKey)
            &&
            e.key === "k"
        ) {

            e.preventDefault();

            document
                .getElementById(
                    "globalSearch"
                )
                .focus();

        }

    }
);