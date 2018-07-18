//Initialize
const clean_lists = () => {

    console.log("List clean running.");

    //Sailthru variables
    const api_key = process.env.api_key;
    const api_secret = process.env.api_secret;
    const sailthru = require("sailthru-client").createSailthruClient(api_key, api_secret);

    //Vars for list check
    const bad_lists = [];
    const var_name = "status";
    const var_val = "active";
    const list_conv = "Master List";

    //Find all lists in Sailthru; retrieve vars. If list_var != list_val, push to the bad_lists array
    sailthru.apiGet("list", { 
        fields: {
            vars: 1
        }
    }, function(err, response) {
        if (response) {
            response_lists = response.lists;
            response_lists.forEach(list => {
                if ((!list.vars || list.vars[var_name] != var_val) && list.name.indexOf(list_conv) == -1) {
                    bad_lists.push(list.name);
                }
            });
        }
    });

    //Wait ten seconds then delete all lists in the bad_lists array
    setTimeout(function() {
        bad_lists.forEach(list => {
            sailthru.apiDelete("list", { 
                list: list
            }, function(err, response) {
                if (response) {
                    console.log(`${list} deleted.`);
                }
                else {
                    console.log(`Please try again.`);
                }
            });   
        });
    }, 10000);
    
}

module.exports = {
	clean_lists
};