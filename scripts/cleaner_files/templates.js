//Initialize
const clean_templates = () => {

    console.log("Template clean running.");

    //Sailthru variables
    const api_key = process.env.api_key;
    const api_secret = process.env.api_secret;
    const sailthru = require("sailthru-client").createSailthruClient(api_key, api_secret);

    //Vars for template check
    const bad_templates = [];
    const label = "active";

    sailthru.apiGet("template", { }, function(err, response) {
        if (response) {
            response_templates = response.templates;
            response_templates.forEach(template => {
                const template_labels = template.labels;
                if (!template_labels || !template_labels.includes(label)) {
                    bad_templates.push(template.name);
                }
            });
        }
        else {
            console.log(`Error getting templates`, err);
        }
    });

    setTimeout(function() {
        bad_templates.forEach(template => {
            sailthru.apiDelete("template", { 
                template: template
            }, function(err, response) {
                if (response) {
                    console.log(`${template} deleted.`);
                }
                else {
                    console.log(`Error deleting template ${template}`, err);
                }
            });   
        });
    }, 3000);

}

module.exports = {
	clean_templates
};