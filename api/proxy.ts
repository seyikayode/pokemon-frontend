export default async function handler(req: any, res: any): Promise<Response> {
    const backendUrl = "http://ec2-3-238-88-224.compute-1.amazonaws.com";

    const targetUrl = backendUrl + req.url;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: undefined
            },
            body: req.method !== 'GET' && req.method !== 'HEAD'
                ? JSON.stringify(req.body)
                : undefined,
        });

        res.status(response.status);
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            return res.json(await response.json());
        };

        return res.send(await response.text());

    } catch (err: any) {
        console.error("Proxy Error:", err);
        return res.status(500).json({ error: err.message });
    };
};