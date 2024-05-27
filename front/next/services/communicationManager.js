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
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 401) {
                    reject('Error al iniciar sessió: Usuari o contrasenya incorrectes');
                } else {
                    reject('Error al iniciar sessió: ' + response.status)
                }
            })
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
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    reject('Error al registrar usuario: ' + response.status)
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function logout(token) {
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

export function updateUser(userData, token) {
    console.log("userData", userData);
    console.log("token updateUser", token);
    return new Promise((resolve, reject) => {
        fetch(`${url}users/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: userData
        })
            .then(response => {
                if (!response.ok) {
                    reject(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getUsers(token, userID) {
    console.log("token", token);
    console.log("userID", userID);
    if (!userID) {
        console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${url}users?userID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
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

export function createMap(formData, token) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    reject(`Error: ${response.status}`);
                }
                return response.json();
            })
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

export function getReportedMaps(token, userID) {
    console.log("token getReportedMaps", token);
    console.log("userID getReportedMaps", userID);
    return new Promise((resolve, reject) => {
        fetch(`${url}reportedMaps?userID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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

export function updateMap(mapData, user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/${mapData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mapData.token}`
            },
            body: JSON.stringify({ mapData: mapData, user: user })
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

export function destroyMap(mapID, userID, token) {
    console.log("mapID", mapID);
    console.log("userID", userID);
    console.log("token", token);
    if (!userID) {
        console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${url}maps/${mapID}?userID=${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function downloadFile(mapId, mapName, userID, token) {
    console.log("map name", mapName);
    console.log("map info", mapId);
    if (!userID) {
        console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${url}download/${mapId}?userID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const randomNumber = Math.floor(Math.random() * 900000) + 100000;
                let filename = mapName + '_' + randomNumber;
                console.log('Updated filename:', filename); // Add this line

                return response.blob().then(blob => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                console.log("filename ", filename);
                document.body.appendChild(a);
                a.click();
                a.remove();
                resolve(blob);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function destroyReport(mapId, userID, token) {
    if (!userID) {
        console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${url}reportedMaps/${mapId}?userID=${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

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

export function getMapByDifficulty(difficulty) {
    return new Promise((resolve, reject) => {
        fetch(`${url}mapsByDifficulty/${difficulty}`, {
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