export interface Data {
    _id: string;
    country: string;
    modelType: string;
    consumerPriceIndex: Array<number>;
    crudeOilPrice: Array<number>;
    oilProduction: Array<number>;
    gasPrice: Array<number>;
    correlationMatrix: Array<number>;
    modelResultsTraining: Array<number>;
    modelResultsTesting: Array<number>;
    errorResults: Array<number>;

}