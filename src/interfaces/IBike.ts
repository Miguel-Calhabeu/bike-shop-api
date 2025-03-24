// Define a interface de abstração da entidade Bike na API.
// Enquanto no contexto interno da aplicação, essa interface modela a entidade bicicleta definindo suas propriedades semânticas.

export default interface IBike {
    bikeId: string;
    brand: string;
    bikeModel: string;
    color: string;
    gears: number;
    price: number;
    stock: number;
}
