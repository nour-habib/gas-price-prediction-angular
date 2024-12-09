export interface ModelResults { 
    training: Array<number>;
    training_y: Array<number>;
    testing: Array<number>;
    testing_y: Array<number>;
    errorTrain: Array<number>;
    errorTest: Array<number>;
}