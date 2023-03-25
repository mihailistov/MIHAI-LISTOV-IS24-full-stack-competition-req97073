export enum Methodology {
  Agile = "Agile",
  Waterfall = "Waterfall",
}

export default class Product {
  id: number;
  name: string;
  scrumMaster: string;
  owner: string;
  developerNames: string[];
  startDate: Date;
  methodology: Methodology;
}
