const STORAGE_KEY = "jay_recall_entries";

function getEntries() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

function saveEntries(entries) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(entries)
    );

}

function addEntry(entry) {

    const entries = getEntries();

    entries.unshift(entry);

    saveEntries(entries);

}

function deleteEntry(id) {

    const entries = getEntries()
        .filter(
            entry => entry.id !== id
        );

    saveEntries(entries);

}

function toggleFavorite(id) {

    const entries = getEntries();

    const entry = entries.find(
        e => e.id === id
    );

    if (entry) {

        entry.favorite =
            !entry.favorite;

        saveEntries(entries);

    }

}

function saveEntry() {

    const type =
        document.getElementById(
            "entryType"
        ).value;

    let entry = {

        id: Date.now(),

        type: type,

        favorite: false,

        createdAt:
            new Date().toISOString()

    };

    if (
        type === "📝 Knowledge Note"
        ||
        type === "📚 Documentation"
        ||
        type === "☁️ Infrastructure"
        ||
        type === "🔐 Security"
        ||
        type === "📋 Checklist"
    ) {

        entry.title =
            document.getElementById(
                "title"
            ).value;

        entry.tags =
            document.getElementById(
                "tags"
            ).value;

        entry.content =
            document.getElementById(
                "contentText"
            ).value;
    }

    if (type === "⚡ Command Vault") 
    {

        entry.title =
            document.getElementById(
                "title"
            ).value;

        entry.tags =
            document.getElementById(
                "tags"
            ).value;

        entry.command =
            document.getElementById(
                "command"
            ).value;

        entry.description =
            document.getElementById(
                "description"
            ).value;
    }

    if (type === "🛠 Troubleshooting") {

        entry.title =
            document.getElementById(
                "title"
            ).value;

        entry.problem =
            document.getElementById(
                "problem"
            ).value;

        entry.solution =
            document.getElementById(
                "solution"
            ).value;

        entry.outcome =
            document.getElementById(
                "outcome"
            ).value;
    }

    addEntry(entry);

    alert(
        "Knowledge Saved"
    );

    loadDashboard();
}
