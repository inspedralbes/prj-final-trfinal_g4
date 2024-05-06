const url = 'http://localhost:8000/api/';

export function login(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

}

export function register(user) {
    return new Promise((resolve, reject) => {
        console.log(user);
        fetch(`${url}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function logout(token) {
    console.log('su puta madre');
    return new Promise((resolve, reject) => {
        fetch(`${url}logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// fetch eliminar usuario
export function destroyUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}users/${user}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function updateUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}users/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getUsers() {
    return new Promise((resolve, reject) => {

        fetch(`${url}allUsers/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}users/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function createUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function createMap(mapData) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mapData.token}`
            },
            body: JSON.stringify(mapData)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


export function getMaps() {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function updateMap(mapData) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/${mapData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mapData.token}`
            },
            body: JSON.stringify(mapData)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function destroyMap(mapData) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/${mapData.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mapData.token}`
            },
            body: JSON.stringify(mapData)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}





