export async function fetchGames(searchQuery = "") {
    const API_KEY = "e784bf5f8e30437686ea67247443042d"; // Your API key
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

    if (searchQuery) {
        url += `&search=${searchQuery}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch game data");
        }
        const data = await response.json();
        return data.results || []; // RAWG stores games in `results`
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}