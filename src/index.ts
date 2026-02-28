import { renderHtml } from "./renderHtml";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";
import { saveResume } from "./services/resumeService";
import { ResumeInput } from "./types/resume";

export default {
	async fetch(request, env) {
		const db = drizzle(env.DB, { schema });
		const url = new URL(request.url);

		// Handle POST /resume
		if (request.method === "POST" && url.pathname === "/resume") {
			try {
				const input = (await request.json()) as ResumeInput;
				const result = await saveResume(db, input);
				return Response.json(result, { status: 201 });
			} catch (e) {
				return Response.json({ error: (e as Error).message }, { status: 500 });
			}
		}

		// Handle GET /resume (Get all with relations)
		// Original behavior was returning HTML, so let's keep that on root / or specific path
		// but user asked for "resume storage", so exposing API is primary.
		// Let's modify default view to show enhanced data but keep the endpoint clean.

		// For debugging/viewing: GET /resume or root
		const results = await db.query.resumesMain.findMany({
			with: {
				experience: true,
				skills: true,
				certifications: true,
			},
		});

		// If accessing /resume with GET, return JSON
		if (url.pathname === "/resume") {
			return Response.json(results);
		}

		// Default: Render HTML for root
		return new Response(renderHtml(JSON.stringify(results, null, 2)), {
			headers: {
				"content-type": "text/html",
			},
		});
	},
} satisfies ExportedHandler<Env>;
