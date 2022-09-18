import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase("places.db")

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
            )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    });

    return promise;
}

export const insertPlace = (place) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.lat,
                    place.location.lng
                ],
                (_, result) => {
                    console.log(result);
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise;
}

export const fetchPlaces = async () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = []
                    for (const dbPlace of result.rows._array) {
                        places.push(
                            new Place(dbPlace.id, dbPlace.title, dbPlace.imageUri, { address: dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng })
                        )
                    }
                    resolve(places)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise
}

export const fetchPlaceDetails = (id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result) => {
                    const dbPlace = result.rows._array[0];
                    const place = new Place(dbPlace.id, dbPlace.title, dbPlace.imageUri, { address: dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng })
                    console.log(place);
                    resolve(place)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise
}