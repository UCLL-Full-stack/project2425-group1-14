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

function tablefy(json: JSON & Array<Object>): string {
    let tablemap: Map<string, Array<String>> = new Map()
    var tablebody = "";
    for (const ob of json) {
        tablebody += "<tr>"
        for (var [key, value] of Object.entries(ob)) {
            if (tablemap.has(key)) {
                const vals = tablemap.get(key);
                if (!vals) { throw new Error("TYPESCRIPT BS")}
                vals.push(value);
                tablemap.set(key, vals);
            } else {
                tablemap.set(key, [`${value}`])
            }
            if (value instanceof Object) {
                var valstring = "";
                if (Object.hasOwn(value, "id")) {
                    valstring += `${value.id}`;
                }
                if (Object.hasOwn(value, "name")) {
                    valstring += `  ${value.name}`;
                }
                if (valstring == "") {
                    value = JSON.stringify(value);
                } else { value = valstring; }
            }
            tablebody += `<td>${value}</td>`
        }
        tablebody += "</tr>";
    }
    var tablestring = "<thead>";
    for (const key of tablemap.keys()) {
        tablestring += `<th>${key}</th>`;
    }
    return tablestring + "</thead><tbody>" + tablebody + "</tbody>";
}

export {
    makeAGR,
    makeAPR,
    tablefy,
}