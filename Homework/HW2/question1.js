function findUserById(users, id){
    const match = users.find((user) => user.id == id);
    return match ? match.name : null;
}

function computeBMIs(users){
    return users.map((user) => user.weight / (user.height * user.height));
}
