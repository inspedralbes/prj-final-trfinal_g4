const URL = 'https://chromaticbond.cat:8000/api/';

//Login
export function login(user) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}login`, {
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

//Register
export function register(user) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}register`, {
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

//Logout
export function logout(token) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}logout`, {
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
        fetch(`${URL}users/${user}`, {
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

// fetch actualizar usuario
export function updateUser(userData, token) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}users/`, {
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
    if (!userID) {
        //console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${URL}users?userID=${userID}`, {
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

// fetch obtener usuario
export function getUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}users/${user}`, {
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

// fetch crear usuario
export function createUser(user) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}users/`, {
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

// fetch crear mapa
export function createMap(formData, token) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}maps/`, {
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

// fetch obtener mapas
export function getMaps() {
    return new Promise((resolve, reject) => {
        fetch(`${URL}maps/`, {
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
    return new Promise((resolve, reject) => {
        fetch(`${URL}reportedMaps?userID=${userID}`, {
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
        fetch(`${URL}maps/${mapData.id}`, {
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
    if (!userID) {
        //console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${URL}maps/${mapID}?userID=${userID}`, {
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
    if (!userID) {
        //console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${URL}download/${mapId}?userID=${userID}`, {
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

                return response.blob().then(blob => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const URL = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = URL;
                a.download = filename;
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
        //console.error('userID is undefined');
    }

    return new Promise((resolve, reject) => {
        fetch(`${URL}reportedMaps/${mapId}?userID=${userID}`, {
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


// fetch obtener mapa por dificultad
export function getMapByDifficulty(difficulty) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}mapsByDifficulty/${difficulty}`, {
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

// Obtener todos los mapas para mostrar en comunidad
export function getMapsForCommunity() {
    return new Promise((resolve, reject) => {
        fetch(`${URL}mapsCommunity/`, {
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

// Obtener todos los mapas para mostrar en comunidad filtrados por Nivel
export function getMapsForCommunityByLevel(level) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}mapsCommunity/${level}`, {
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

// Dar like a un mapa
export function likeMap(mapId) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}mapsCommunity/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapId)
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

// Dar dislike a un mapa
export function dislikeMap(mapId) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}mapsCommunity/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapId)
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

// Reportar un mapa (map_id, reason)
export function reportMap(map) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}reportedMaps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(map)
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

// Buscar mapas por nombre o descripción
export function searchMaps(fraseCerca) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}searchMapsCommunity/${fraseCerca}`, {
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