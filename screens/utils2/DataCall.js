export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(ticketid) {
        var baseUrl = "https://www.digitalbrand.me/"
        console.log(baseUrl + 'getrequestlogs?ticketid=' + ticketid);
        const responseHusky = await fetch(baseUrl + 'getrequestlogs?ticketid=' + ticketid);

        const responseJsonHusky = await responseHusky.json();

        return responseJsonHusky;
    }

    static async getRequestDetails(ticketid) {
        var baseUrl = "https://www.digitalbrand.me/"
        console.log(baseUrl + 'getrequestdetails?ticketid=' + ticketid);
        const responseHusky = await fetch(baseUrl + 'getrequestdetails?ticketid=' + ticketid);

        const responseJsonHusky = await responseHusky.json();

        return responseJsonHusky;
    }
}
