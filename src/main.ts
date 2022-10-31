import { CheerioCrawler } from "crawlee";
import { router } from "./routes.js";

const startUrls = [
    {
        url: "https://www.kavak.com/",
        label: "ALGOLIA",
    },
];

// const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    // proxyConfiguration,
    requestHandler: router,
});

await crawler.run(startUrls);
