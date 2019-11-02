import kmeans from 'ml-kmeans';

export function createModel(data) {
    // Create the data 2D-array (vectors) describing the data
    let vectors = [];
    for (let i = 0 ; i < data.length ; i++) {
        vectors[i] = [ data[i]['size'] , data[i]['long'], data[i]['lat']];
    }
    
    let ans = kmeans(data, data.length);
    return ans
}