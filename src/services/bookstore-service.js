export default class BookstoreService {

    data = [
        {
            id: 1,
            title: 'Production Reacdy Microservices',
            author: 'Susan J. Flower',
            price: 32,
            coverImage: 'https://cdn1.ozone.ru/multimedia/c1200/1021367273.jpg'
        },
        {
            id: 2,
            title: 'Realease It!',
            author: 'Michael T. Nygard',
            price: 45,
            coverImage: 'https://cdn1.ozone.ru/multimedia/c1200/1021367273.jpg'
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
            }, 700)
        });
    }
}