$(".cleaner").on("click", function submit_form() {
    const feature = $(this).parent().attr("id");
    alert(`Running cleaner for ${feature}`);
    $.ajax({
        type: "POST",
        url: "/email",
        data: { id : feature }
    });
});