type Car = {
    car_id: string;
    car_name: string;
    car_make: string;
    car_model: string;
    car_trim: string;
    car_type: { name: string };
    car_year: number;
    price: number;
    ext_color: string;
    km: number;
    horse_power: number | null;
    car_url: string;
    available: boolean;
    _geoloc: { lat: number; lng: number };
};
