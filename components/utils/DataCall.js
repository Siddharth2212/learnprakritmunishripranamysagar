export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(query, type) {
        var responseHusky = await fetch('https://arhamyoga.herokuapp.com/getplaylists?type='+type);
        const responseJsonHusky = await responseHusky.json();
        return responseJsonHusky;
    }

    static async getvideos(playlistid) {
        var responseHusky = await fetch('https://arhamyoga.herokuapp.com/getvideos?playlistid='+playlistid);
        const responseJsonHusky = await responseHusky.json();
        return responseJsonHusky;
    }
}
