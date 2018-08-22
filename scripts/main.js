import { string, cl, headers } from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("cleaner")) {
        const feature = this.id;
        fetch("/server", {
            method: "post",
            headers: headers,
            body: string({id : feature})
        })
        .then(
        function(response) {
            if (response.status != 200) {
                cl("Error: " + response.status);
                return;
            }
            else {
                alert("Refreshing feed.");
            }
        })
    }
}, false);

