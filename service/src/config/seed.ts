import { faker } from '@faker-js/faker';
import Product, { Methodology } from '../models/product.model';
import crypto from "crypto";

export function createRandomProductArray(): Array<Product> {
  let generatedProducts = [];

  for (let i=1; i<=40; i++) {
    const numOfDevs = faker.datatype.number({ min: 1, max: 5 });
    const developerNames = [];
    for (let j = 0; j < numOfDevs; j++) {
      developerNames.push(faker.name.fullName());
    }
    let productName = faker.company.bsBuzz() + " " + faker.datatype.number({ min: 1, max: 1000 });
    productName = productName.charAt(0).toUpperCase() + productName.slice(1);

    generatedProducts.push({
      productId: crypto.randomUUID(),
      name: productName,
      owner: faker.name.fullName(),
      scrumMaster: faker.name.fullName(),
      developerNames,
      methodology: faker.helpers.arrayElement(["Agile", "Waterfall"]) as Methodology,
      startDate: faker.date.past(),
    });
  }
  return generatedProducts;
}
