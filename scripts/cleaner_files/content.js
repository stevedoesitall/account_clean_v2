//Initialize
const clean_content = () => { 

    console.log("Content clean running.");

    //Sailthru variables
    const api_key = process.env.api_key;
    const api_secret = process.env.api_secret;
    const sailthru = require("sailthru-client").createSailthruClient(api_key, api_secret);
    const tag = "workshop";
    let all_content;

    sailthru.apiGet("content", {
        items: 20000
    }, 
        function(err,response) {
            if (err) {
                console.log(err);
            }
            else if (response) {
                all_content = response.content;
                all_content.forEach(content => {
                    if (!content.tags || content.tags.indexOf(tag) == -1) {
                        sailthru.apiDelete("content", {
                            url : content.url
                        }, 
                            function(err, response) {
                                if (err) {
                                    console.log(err);
                                }
                                else if (response) {
                                    console.log(`${content.url} has been deleted.`);
                                }
                            }
                        )
                    }
                });
            }
        }
    );
}

module.exports = {
    clean_content
};