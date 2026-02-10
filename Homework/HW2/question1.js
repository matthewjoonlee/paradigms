function findUserById(users, id){
    // find the user whose id matches the given id
    const match = users.find((user) => user.id == id);
    // return the user's name, otherwise return null
    return match ? match.name : null;
}

function computeBMIs(users){
    // compute BMI for each user and return the list of values using map
    return users.map((user) => user.weight / (user.height * user.height));
}
