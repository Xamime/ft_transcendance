const urlPageTitle = "JS Single Page Application Router";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches(".btn btn-primary")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the url to the template, title, and description
const urlRoutes = {
	404: {
		template: "/error404/",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/home/",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/home/": {
		template: "/home/",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/about/": {
		template: "/about/",
		title: "About Us | " + urlPageTitle,
		description: "This is the about page",
	},
	"/contact/": {
		template: "/contact/",
		title: "Contact Us | " + urlPageTitle,
		description: "This is the contact page",
	},
};

const urlRoute = (event) => {
    event = event || window.event; 
    event.preventDefault();
    console.log("Navigating to:", event.target.href);
        window.history.pushState({}, "", event.target.href);
        urlLocationHandler();
};

const urlLocationHandler = async () => {
    let location = window.location.pathname; // get the url path
    console.log("Current location:", location); // Log the current path

    if (location.length == 0) {
        location = "/";
    }

    console.log("Updated location:", location);
	console.log("Defined routes:", Object.keys(urlRoutes));
 
    const route = urlRoutes[location] || urlRoutes["404"];
    console.log("Route object:", route); 

    try {
        const html = await fetch(route.template).then((response) => response.text());
        console.log("Fetched HTML:", html); // Log the fetched HTML
        document.getElementById("content").innerHTML = html;
    } catch (error) {
        console.error("Error fetching template:", error); // Log error if fetching fails
    }

    document.title = route.title;
    console.log("Document title set to:", route.title); // Log the title set
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
    console.log("Document description set to:", route.description); // Log the description set
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler();
