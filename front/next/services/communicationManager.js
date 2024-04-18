
const url = 'http://localhost:8000/api/'; 

export function login() {
    return new Promise((resolve, reject) => {
        fetch(`${url}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
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

export function register() {
    return new Promise((resolve, reject) => {
        fetch(`${url}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
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