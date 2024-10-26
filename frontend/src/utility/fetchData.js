import pops from "pop-message";

export const fetchData = async (url, method = "GET", body = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        // Check response type before parsing
        const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
        const data = isJson ? await response.json() : {};

        if (!response.ok) {
            // Handle specific status codes
            if (response.status === 401) {
                pops.simplePop(
                    "error",
                    data.message || "Unauthorized. Please log in."
                );
            } else {
                pops.simplePop("error", data.message || "Network error");
            }
            return Promise.reject(data);
        }
        return data;
    } catch (error) {
        pops.simplePop("error", `Error: ${error.message || error}`);
        throw error;
    }
};
