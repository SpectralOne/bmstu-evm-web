import { Request, Response, NextFunction } from "express";

import axios from "axios";

const CARS_SERVER = "http://localhost:4001/";
const INSERT_QUERY = "insert/record";
const SELECT_QUERY = "select/record";
const STORAGES_SERVER = "http://localhost:4002/";

const HOME_PAGE = "index.ejs";
const CREATE_CAR_PAGE = "create_car.ejs";
const CREATE_STORAGE_PAGE = "create_storage.ejs";
const SEARCH_CAR_PAGE = "search_car.ejs";
const SEARCH_STORAGE_PAGE = "search_storage.ejs";
const CAR_PAGE = "car.ejs";
const STORAGE_PAGE = "storage.ejs";

export const render_create_car = (_: Request, res: Response) => {
    res.render(CREATE_CAR_PAGE, { meta: {} });
}

export const create_car = (req: Request, res: Response) => {
    axios.post(CARS_SERVER + INSERT_QUERY, {
        name: req.body.name,
        price: req.body.price
    }).then(result => {
        if (result.status !== 200)
            throw Error(result.data.result);

        res.status(200).render(CREATE_CAR_PAGE, { meta: { log: "Car has been created!" } });
    }).catch(err => {
        res.status(400).render(CREATE_CAR_PAGE, { meta: { error: `Can't create a car: ${err}!` } });
    });
}

export const search_car = (_: Request, res: Response) => {
    res.render(SEARCH_CAR_PAGE);
}

export const show_car = (req: Request, res: Response) => {
    axios.get(CARS_SERVER + SELECT_QUERY, {
        params: {
            name: req.query.name
        }
    }).then(result => {
        res.status(200).render(CAR_PAGE, { car: result.data.car, error: null });
    }).catch(() => {
        res.status(400).render(CAR_PAGE, { car: {}, error: "Car wasn't found!" });
    })
}

export const render_create_storage = (_: Request, res: Response) => {
    res.render(CREATE_STORAGE_PAGE, { meta: {} });
}

export const create_storage = (req: Request, res: Response) => {
    axios.post(STORAGES_SERVER + INSERT_QUERY, {
        name: req.body.name,
        cars: req.body.cars.split(' ').filter((str: string) => str !== '')
    }).then(result => {
        console.log(`RESULT: ${result}`)
        res.status(200).render(CREATE_STORAGE_PAGE, { meta: { log: "Storage has been created!" } });
    }).catch(err => {
        res.status(400).render(CREATE_STORAGE_PAGE, { meta: { error: `Can't create a storage: ${err}` } });
    });
}

export const search_storage = (_: Request, res: Response) => {
    res.render(SEARCH_STORAGE_PAGE);
}

export const show_storage = (req: Request, res: Response) => {
    axios.get(STORAGES_SERVER + SELECT_QUERY, {
        params: {
            name: req.query.name
        }
    }).then(result => {
        console.log(result.data.storage);
        res.status(200).render(STORAGE_PAGE, { storage: result.data.storage, error: null });
    }).catch(() => {
        res.status(400).render(STORAGE_PAGE, { storage: {}, error: "Storage wasn't found" });
    })
}

export const default_controller = (_: Request, res: Response) => {
    res.render(HOME_PAGE);
}
