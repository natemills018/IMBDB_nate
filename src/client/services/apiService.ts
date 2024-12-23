async function fetcher<T = any>(url: string, method: string = "GET", rawData?: unknown): Promise<T> {
    const headers: HeadersInit = {};
    const options: RequestInit = {
        method,
        headers,
    };

    if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(rawData);
    }

    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(process.env.SERVER_URL + url, options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                console.error(data);
                if (data.message) {
                    alert(data.message);
                }
                reject(data);
            }
        } catch (error) {
            const err = error as Error;
            console.error(error);
            reject(error);
            if (err.message) {
                alert(err.message);
            }
        }
    });
}

export const GET = <T = any>(url: string) => fetcher<T>(url, "GET");
export const DELETE = <T = any>(url: string) => fetcher<T>(url, "DELETE");
export const PUT = <T = any>(url: string, data: any) => fetcher<T>(url, "PUT", data);
export const POST = <T = any>(url: string, data: any) => fetcher<T>(url, "POST", data);
