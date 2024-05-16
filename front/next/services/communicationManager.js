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

export function getUsers(token, userID) {
    console.log("token", token);
    console.log("userID", userID);
    if (!userID) {
        console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${url}users/${userID}`, {
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

export function getReportedMaps(user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}reportedMaps/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

export function destroyMap(mapData, user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}maps/${mapData}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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

export function downloadFile(mapId, mapName, user) {
    console.log("map name", mapName);
    console.log("map info", mapId);
    return new Promise((resolve, reject) => {
        fetch(`${url}download/${mapId}`, {
            method: 'GET',
            body: JSON.stringify({ mapId: mapId, mapName: mapName, user: user })
        })
            .then(response => {
                const contentDisposition = response.headers.get('Content-Disposition');
                const randomNumber = Math.floor(Math.random() * 900000) + 100000;
                let filename = mapName + '_' + randomNumber;
                console.log(" contentDisposition", contentDisposition);
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename=([^ ]*)/i);
                    if (filenameMatch) {
                        filename = filenameMatch[1];
                        console.log("filenameMatch", filenameMatch);
                    }


                }

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

export function destroyReport(mapId, user) {
    return new Promise((resolve, reject) => {
        fetch(`${url}reportedMaps/${mapId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mapId: mapId, user: user })
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





