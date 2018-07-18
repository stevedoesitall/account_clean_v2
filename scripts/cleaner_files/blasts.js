//Initialize
const clean_blasts = () => {

    console.log("Blast clean running.");

    //Sailthru variables
    const api_key = process.env.api_key;
    const api_secret = process.env.api_secret;
    const sailthru = require("sailthru-client").createSailthruClient(api_key, api_secret);

    //Vars for blast check
    const blast_drafts = [];
    const blast_drafts_final = [];
    let draft_count;
    let response_blasts;

    //GET call to return number of all draft campaigns
    sailthru.apiGet("blast", { }, function(err, response) {
        if (response) {
            draft_count = response.unscheduled_count;
            console.log(`There are ${draft_count} drafts`);
        }
    });

    //Find all unscheduled, non-final segments
    setTimeout(function() {
        sailthru.apiGet("blast", { 
            status: "unscheduled",
            limit: draft_count
        }, function(err, response) {
            if (response) {
                response_blasts = response.blasts;
                response_blasts.forEach(blast => {
                    if (!blast.abtest_segment || blast.abtest_segment != "Final") {
                        blast_drafts.push(blast.blast_id);
                    }
                });
            }
        });
    }, 500);

    //Delete all unscheduled, non-final segments
    setTimeout(function() {
        blast_drafts.forEach(blast_id => {
            sailthru.apiDelete("blast", { 
                blast_id: blast_id
            }, function(err, response) {
                if (response) {
                    console.log(`${blast_id} deleted.`);
                }
                else {
                    console.log(`Error deleting blast ${blast_id}`, err);
                }
            });   
        });
    }, 10000);

    //Find all unscheduled, final segments
    setTimeout(function() {
        sailthru.apiGet("blast", { 
            status: "unscheduled",
            limit: draft_count
        }, function(err, response) {
            if (response) {
                response_blasts = response.blasts;
                response_blasts.forEach(blast => {
                    if (blast.abtest_segment == "Final") {
                        blast_drafts_final.push(blast.blast_id);
                    }
                });
            }
        });
    }, 20000);

    //Delete all unscheduled, final segments
    setTimeout(function() {
        blast_drafts_final.forEach(blast_id => {
            sailthru.apiDelete("blast", { 
                blast_id: blast_id
            }, function(err, response) {
                if (response) {
                    console.log(`${blast_id} deleted.`);
                }
                else {
                    console.log(`Error deleting blast ${blast_id}`, err);
                }
            });   
        });
    }, 30000);
}

module.exports = {
	clean_blasts
};