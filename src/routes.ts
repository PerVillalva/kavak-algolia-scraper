import { Dataset, createCheerioRouter } from "crawlee";
import algoliasearch from "algoliasearch";

export const router = createCheerioRouter();

router.addHandler("ALGOLIA", async ({ $ }) => {
    const countries = $(".country-container div.country a")
        .toArray()
        .slice(0, -2)
        .map((el) => {
            const id = $(el).attr("href")!.split("/").pop();
            const countryName = $(el).text().trim();

            return { id, countryName };
        });

    await Dataset.pushData(countries);

    const promises = countries.map(({ id }) => {
        return (async () => {
            const client = algoliasearch(
                "6OX5BJEPKZ",
                "575b632d66ad0d9d2877b8e409a4d26d"
            );
            const index = client.initIndex(`olimpo-${id}_price_asc`);
            const { hits } = await index.search<Car>("bmw", {
                hitsPerPage: 1000,
            });

            return hits;
        })();
    });

    const cars = (await Promise.all(promises)).flat();
    console.log(cars);

    const results = cars.map((car) => ({
        id: car.car_id,
        name: car.car_name,
        make: car.car_make,
        model: car.car_model,
        trim: car.car_trim,
        type: car.car_type.name,
        year: car.car_year,
        color: car.ext_color,
        price: car.price,
        km: car.km,
        horsePower: car.horse_power,
        isAvailable: car.available,
        location: {
            longitude: car._geoloc.lng,
            latitude: car._geoloc.lat,
        },
    }));

    await Dataset.pushData(results);
});
