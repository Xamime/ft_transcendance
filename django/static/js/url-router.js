const urlPageTitle = "Pong Game";

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("button[data-path]")) {
        return;
    }
    e.preventDefault();
    urlRoute(target.getAttribute("data-path"));
});


const urlRoutes = {
    "/": {
        template: "/",
        title: "Welcome | " + urlPageTitle,
    },
    "/welcome/": {
        template: "/welcome/",
        title: "Welcome | " + urlPageTitle,
    },
    "/board_player/": {
        template: "/board_player/",
        title: "Welcome | " + urlPageTitle,
    },
    "/connection/": {
        template: "/connection/",
        title: "Welcome | " + urlPageTitle,
    },
    "/end_game/": {
        template: "/end_game/",
        title: "Welcome | " + urlPageTitle,
    },
    "/error404/": {
        template: "/error404/",
        title: "Welcome | " + urlPageTitle,
    },
    "/game/": {
        template: "/game/",
        title: "Welcome | " + urlPageTitle,
    },
    "/IA/": {
        template: "/IA/",
        title: "Welcome | " + urlPageTitle,
    },
    "/local/": {
        template: "/local/",
        title: "Welcome | " + urlPageTitle,
    },
    "/register/": {
        template: "/register/",
        title: "Welcome | " + urlPageTitle,
    },
    "/settings_game/": {
        template: "/settings_game/",
        title: "Welcome | " + urlPageTitle,
    },
    "/settings_player/": {
        template: "/settings_player/",
        title: "Welcome | " + urlPageTitle,
    },
    "/2_players/": {
        template: "/2_players/",
        title: "Welcome | " + urlPageTitle,
    },
    "/online/": {
        template: "/online/",
        title: "Welcome | " + urlPageTitle,
    },
    "/tournament/": {
        template: "/tournament/",
        title: "Welcome | " + urlPageTitle,
    },
};

const urlRoute = (path) => {
    window.history.pushState({}, "", path);
    urlLocationHandler();
};

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    if (location.length === 0) {
        location = "/";
    }
    const route = urlRoutes[location];
    if (route) {
        const html = await fetch(route.template).then((response) => response.text());
        document.getElementById("content").innerHTML = html;
        document.title = route.title;
        document
            .querySelector('meta[name="description"]')
    } else {
        document.getElementById("content").innerHTML =
            "<h1>404 - Page Not Found</h1>";
        document.title = "404 | " + urlPageTitle;
    }
};

window.onpopstate = urlLocationHandler;
urlLocationHandler();

