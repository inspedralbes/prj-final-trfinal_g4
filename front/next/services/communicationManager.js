
const url = 'http://localhost:8000/api/'; 

export function login(user) {
    return new Promise((resolve, reject) => {
        console.log("me cago en mis muertos");
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