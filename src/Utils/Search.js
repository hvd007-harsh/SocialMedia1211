function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i]._id=== nameKey) {
            delete myArray[i];
            return myArray;
        }
    }
    
}
export default search;