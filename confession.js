const formEl = document.getElementById("postform")

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    console.log(data);
    fetch('https://tpcconfessions.onrender.com/api/postConfession',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    alert("Confession has been submitted!")
});

const formGet = document.getElementById("getform")

formGet.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formGet);
    const data = Object.fromEntries(formData);
    
    document.getElementById('conlist').innerHTML = `<h2>Confessions for ${data.roll_no}...</h2>`;

    const apiUrl = 'https://tpcconfessions.onrender.com/api/getConfession';
    const queryString = new URLSearchParams({ roll_no: data.roll_no }).toString();
    const fullUrl = `${apiUrl}?${queryString}`;
    fetch(fullUrl)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);
            data.forEach(confession => {
                const conf = `<li>${confession.confession}</li>`
                document.querySelector('ul').insertAdjacentHTML('beforeend', conf);
            })
        })
        .catch(error => console.log(error));

});
