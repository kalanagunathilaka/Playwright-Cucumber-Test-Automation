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

    public setData(key: string, value: any) {
        const keys = key.split(".");
        let data: any = this.getData();

        for (let i = 0; i < keys.length - 1; i++) {
            if (data.hasOwnProperty(keys[i])) {
                data = data[keys[i]];
            } else {
                return;
            }
        }

        if (data.hasOwnProperty(keys[keys.length - 1])) {
            data[keys[keys.length - 1]] = value;
        }
    }

}