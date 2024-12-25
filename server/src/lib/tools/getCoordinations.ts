// Function to get latitude and longitude from an address
export async function getCoordinates(address: string, city: string) {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    try {
        console.log("${address}, ${city}, Україна", `${address}, ${city}, Україна`)
        const url = new URL(baseUrl);
        url.searchParams.append('q', `${address}, ${city}, Україна`);
        url.searchParams.append('format', 'json');
        url.searchParams.append('addressdetails', '1');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            console.log('No results found for the given address.');
            return null;
        }

        const { lat: latitude, lon: longitude } = data[0];
        return { latitude: +latitude, longitude: +longitude };
    } catch (error) {
        console.error('Error fetching coordinates:', (error as Error).message);
    }
}
