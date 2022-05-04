window.get = async function(url, formatType="json") {
    const res = await fetch(url);
    return await res[formatType]();
}

window.post = async function(url, data, formatType="json") {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res[formatType]();
}