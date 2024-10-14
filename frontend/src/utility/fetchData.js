import pops from "pop-message"; 

export const fetchData = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            pops.simplePop("error", data.message || "Network error");
            return Promise.reject(data);
        }

        return data;
    } catch (error) {
        pops.simplePop("error", `Error: ${error.message || error}`);
        throw error;
    }
};
