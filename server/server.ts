import { serve } from "https://deno.land/std@v0.39.0/http/server.ts";

const { PORT = "8080" } = Deno.env();

const helloServer = async () => {
    const enc = new TextEncoder();
    for await (const req of serve(`:${PORT}`)) {
        const body = "Nations on Hands";
        req.respond({ body: enc.encode(body) });
        console.debug(JSON.stringify(Object.keys(req)));
        console.log(`${req.method} ${req.url}`);
    }
};

helloServer();