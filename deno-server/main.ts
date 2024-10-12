import { Hono } from "hono";
import { cors } from "hono/cors";
import { renderer } from "./renderer.tsx";
import userRoutes from "./src/routes/userRoutes.ts";
import postRoutes from "./src/routes/postRoutes.ts";
import { AppContext } from "./types.d.ts";
import { dbMiddleware } from "./src/middleware/dbMiddleware.ts";

const app = new Hono<AppContext>();

app.use(renderer);
app.use("*", cors());
app.use("*", dbMiddleware);

app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Definir rutas para usuarios y publicaciones
app.route("/api", userRoutes);
app.route("/api", postRoutes);

// Manejo de rutas no encontradas
app.notFound((c) => c.json({ error: "Not Found" }, 404));

// Ruta de inicio
app.get("/", (c) => {
  return c.render("Looks like it works!");
});

// Exportar la aplicación
export default app;
