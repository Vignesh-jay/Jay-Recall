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
                e => e.category
            )
        )];

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

            <div class="stat-card">

                <h3>Entries</h3>

                <h1>${entries.length}</h1>

            </div>

            <div class="stat-card">

                <h3>Favorites</h3>

                <h1>${favorites.length}</h1>

            </div>

            <div class="stat-card">

                <h3>Categories</h3>

                <h1>${categories.length}</h1>

            </div>

        </div>
        <div class="recent-section">

                <h2>
                    Recent Knowledge
                </h2>

                ${
                    recentEntries.map(entry => `

                        <div class="recent-item">

                            <strong>

                                ${entry.title}

                            </strong>

                            <span>

                                ${entry.category}

                            </span>

                        </div>

                    `).join("")

                }

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

            Add Knowledge Entry

        </h1>

        <div class="form-card">

            <input
                id="title"
                placeholder="Title"
            >

            <select id="category">

                <option>
                    Infrastructure
                </option>

                <option>
                    Development
                </option>

                <option>
                    Security
                </option>

                <option>
                    Networking
                </option>

                <option>
                    Commands
                </option>

                <option>
                    Troubleshooting
                </option>

                <option>
                    Personal
                </option>

            </select>

            <input
                id="tags"
                placeholder="docker, cloudflare"
            >

            <textarea
                id="contentText"
                rows="10"
                placeholder="Enter knowledge..."
            ></textarea>

            <button
                class="primary-btn"
                onclick="saveEntry()"
            >

                Save Entry

            </button>

        </div>

    `;
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

        <div class="knowledge-grid">

            ${
                favorites
                    .map(renderEntryCard)
                    .join("")
            }

        </div>

    `;

}

function loadSettings() {

    document.getElementById("content")
        .innerHTML = `

        <h1>
            Settings
        </h1>

        <div class="settings-card">

            <button
                class="primary-btn"
                onclick="exportBackup()">

                Export Backup

            </button>

            <button
                class="danger-btn"
                onclick="resetAllData()">

                Reset All Data

            </button>

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

        <div class="knowledge-grid">

            ${entries.map(renderEntryCard).join("")}

        </div>

    `;
}

function renderEntryCard(entry) {

    return `

        <div class="knowledge-card">

            <div class="card-top">

                <h3>
                    ${entry.title}
                </h3>

                <span class="category-badge">

                    ${entry.category}

                </span>

            </div>

            <div class="tags">

                ${entry.tags}

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

    document.getElementById("content")
        .innerHTML = `

        <div class="entry-view">

            <h1>

                ${entry.title}

            </h1>

            <div class="entry-meta">

                <span>

                    ${entry.category}

                </span>

            </div>

            <div class="tags">

                ${entry.tags}

            </div>

            <hr>

            <pre>

${entry.content}

            </pre>

            <button
                class="primary-btn"
                onclick="editEntry(${entry.id})">

                Edit Entry

            </button>

        </div>

    `;
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

            <input
                id="editCategory"
                value="${entry.category}"
            >

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

                entry.title
                    .toLowerCase()
                    .includes(query)

                ||

                entry.category
                    .toLowerCase()
                    .includes(query)

                ||

                entry.tags
                    .toLowerCase()
                    .includes(query)

                ||

                entry.content
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

    entry.category =
        document
            .getElementById(
                "editCategory"
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

loadDashboard();