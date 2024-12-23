import { data } from "../data/factoryData/data";

export class DataFactory {

    private static instance: DataFactory;

    private constructor() { }

    // Get the Singleton instance
    public static getInstance(): DataFactory {
        if (!DataFactory.instance) {
            DataFactory.instance = new DataFactory();
        }
        return DataFactory.instance;
    }

    public getData() {
        return data;
    }
}