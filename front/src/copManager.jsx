fetch('http://localhost:1337/auth/local')
    .then(response => response.json())
    .then(data => {
        // Handle the data from the API response
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error(error);
    });
