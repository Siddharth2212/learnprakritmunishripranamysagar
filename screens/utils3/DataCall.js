export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(query) {
        // var responseHusky = await fetch('https://www.digitalbrand.me/getallrequestlogs?sSearch=');
        // if (query !== -1) {
        //     console.log('https://www.digitalbrand.me/getallrequestlogs?sSearch=' + query)
        //     responseHusky = await fetch('https://www.digitalbrand.me/getallrequestlogs?sSearch=' + query);
        // }
        var responseHusky = await fetch('https://www.digitalbrand.me/getallrequestlogs');
        const responseJsonHusky = await responseHusky.json();
        // console.log("____aegheree");
        // console.log(responseJsonHusky)
        return responseJsonHusky;
    }
}
