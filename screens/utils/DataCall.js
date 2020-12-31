import { baseUrl } from "../shared/baseUrl";

export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(query) {
        console.log("aegaeg");
        var responseHusky = await fetch('https://www.digitalbrand.me/getallrequests?sSearch=');
        if (query !== -1) {
            console.log('https://www.digitalbrand.me/getallrequests?sSearch=' + query)
            responseHusky = await fetch('https://www.digitalbrand.me/getallrequests?sSearch=' + query);
        }
        const responseJsonHusky = await responseHusky.json();
        console.log("_heree");
        console.log(responseJsonHusky)
        return responseJsonHusky;
    }
}
