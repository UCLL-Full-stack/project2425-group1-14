async function makeAGR(url: string) { // authenticated get request
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });

    return await response.json();
}

async function makeAPR(url: string, body: Object) { // authenticated post request
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
		body: JSON.stringify(body)
    });

    return await response.json();
}

export {
    makeAGR,
    makeAPR,
}