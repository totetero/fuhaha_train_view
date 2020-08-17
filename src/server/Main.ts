
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as fs from "fs"
import * as http from "http"

const handlerTestGet = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
	res.writeHead(200, { "Content-Type": "text/plain", });
	res.write("test");
	res.end();
};

const handlerFileGet = async (req: http.IncomingMessage, res: http.ServerResponse, path: string, contentType: string): Promise<void> => {
	const data: string = await fs.promises.readFile(path, "utf-8");
	res.writeHead(200, { "Content-Type": contentType, });
	res.write(data);
	res.end();
};

const handlerError404 = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
	res.writeHead(404, { "Content-Type": "text/plain", });
	res.write("not found");
	res.end();
};

const handlerError500 = async (req: http.IncomingMessage, res: http.ServerResponse, error: Error): Promise<void> => {
	console.error(error);
	res.writeHead(500, { "Content-Type": "text/plain", });
	res.write("internal server error");
	res.end();
};

const port: number = 8080;
http.createServer().on("request", async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
	try {
		const isGet: boolean = req.method === "GET";
		if (req.url === "/test" && isGet) { return await handlerTestGet(req, res); }
		if (req.url === "/" && isGet) { return await handlerFileGet(req, res, "./public/index.html", "text/html"); }
		if (req.url?.startsWith("/index.js") && isGet) { return await handlerFileGet(req, res, "./public/index.js", "text/javascript"); }
		return await handlerError404(req, res);
	} catch(error) {
		return await handlerError500(req, res, error);
	}
}).listen(port, (): void => console.log(`http://localhost:${port}`));

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

