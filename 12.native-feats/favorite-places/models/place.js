class Place {
    constructor(title, imageUri, address, location) {
        this.title = title
        this.imageUri = imageUri
        this.address = address
        this.location = location //{lat:43.76, lng: 87.93}
        this.id = new Date().getTime().toString() + Math.random().toString()
    }
}