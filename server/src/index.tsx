import { Hono } from "hono";
import { cors } from "hono/cors";
import { renderer } from "./renderer";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

const app = new Hono();

app.use(renderer);
app.use("*", cors());

app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    c.json({ error: "Internal Server Error" }, 500);
  }
});

app.route("/api", userRoutes);
app.route("/api", postRoutes);

app.notFound((c) => c.json({ error: "Not Found" }, 404));
app.get("/", (c) => {
  return c.render(<h1>Looks like it works!</h1>);
});

export default app;
