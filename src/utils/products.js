import {faker} from '@faker-js/faker'

function generateRandomProduct(amount) {
    let data = Array.from({length: amount}).map(() => {
        return {
            image: faker.image.abstract(150, 150, true),
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            discountPercent: faker.number.int({min: 1, max: 50}),
            description: faker.lorem.sentence(),
            categories: ['electronics', 'phone']
        }
    })
    return data
}

export { generateRandomProduct }

