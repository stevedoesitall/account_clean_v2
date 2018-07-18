# account_clean
<h1>Academy Days Account Clean README</h1>

<h3>Intro</h3>
<p>This app is used to delete unnecessary Lists, Templates, Campaign drafts, and Content from the Academy Days Test account in the Sailthru Customer UI.</p>

<h3>Clean Blast Drafts</h3>
<p>This will find and delete all blasts in "Draft" mode. If the blast is not a "Final" segment (i.e. not the "Winner" version of an AB Winner or Auto Winner campaign), it'll be immediately deleted. The script will then automatically re-run to find all "Final" segments and delete those, as "Final" segments can only be deleted if there are no test segment associated.</p>

<h3>Clean Lists</h3>
<p>This will find and delete all lists that do not have the list var of "status" with the value of "active" (these are our "demo" lists) or any list that doesn't have the naming convention of "Master List ", which are the client test lists.</p>

<h3>Clean Templates</h3>
<p>This will find and delete all templates that do not have the label of "active" as these are our demo templates and client test templates.</p>

<h3>Clean Content</h3>
<p>This will find and delete all pieces of content that do not have a tag called "workshop", which is used in our demos and client testing.</p>
