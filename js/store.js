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

    if (type === "note") {

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

        entry.category =
            "Knowledge";
    }

    if (type === "command") {

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

        entry.category =
            "Command Vault";
    }

    if (type === "troubleshooting") {

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

        entry.category =
            "Troubleshooting";
    }

    addEntry(entry);

    alert(
        "Knowledge Saved"
    );

    loadDashboard();
}
