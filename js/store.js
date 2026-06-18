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

    const entry = {

        id: Date.now(),

        title:
            document.getElementById("title").value,

        category:
            document.getElementById("category").value,

        tags:
            document.getElementById("tags").value,

        content:
            document.getElementById("contentText").value,

        favorite: false,

        createdAt:
            new Date().toISOString()

    };

    addEntry(entry);

    alert("Knowledge Saved");

    loadDashboard();

}