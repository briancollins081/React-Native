export class Place {
    constructor(id, title, imageUri, location) {
        this.id = id
        this.title = title
        this.imageUri = imageUri
        this.location = { lat: location.lat, lng: location.lng, address: location.address }
    }
}