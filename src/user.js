const users = [];

const addUser = ({id, username} ) => {
    username = username.trim().toLowerCase();
    if(!username){
        return {
            error: "User name is required...."
        }
    }

    const existingUser = users.find((user) => {
        return user.username == username;
    });

    if(existingUser) {
        return{
            error: "Username already existed...."
        }
    }

    // store User
    const user = {id, username};
    users.push(user);
    return user;
}

const removerUser = id => {
    const index = users.findIndex((user) => {
        user.id === id;
    })
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = id => {
    return users.find((user) => user.id===id)
}

const getUserList = () => {
    return users;
}

module.exports = {
    addUser,
    removerUser,
    getUser,
    getUserList
};