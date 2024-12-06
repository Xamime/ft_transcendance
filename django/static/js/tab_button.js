document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('tab-button')) {
            const button = event.target;

            document.querySelectorAll(".tab-button").forEach(btn => {
                btn.classList.remove("active");
            });

            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.remove("active");
            });

            button.classList.add("active");

            const targetPaneId = button.getAttribute("data-tab");
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
                targetPane.classList.add("active");
            }
        }
    });
});

