import {

  dirname,
  fromFileUrl,
  join,
  json,
  opine, renderFileToString,
  serveStatic,
  urlencoded,
} from "./deps.ts";

import indexRouter from "./routes/index.ts";
import rezerwacjaRouter from "./routes/rezerwacja.ts";
import kontaktRouter from "./routes/kontakt.ts";

const __dirname = fromFileUrl(dirname(import.meta.url));

const app = opine();
app.engine('ejs', renderFileToString);
app.set('view engine', 'ejs');
// Handle different incoming body types
app.use(json());
app.use(urlencoded());

// Serve our static assets
app.use(serveStatic(join(__dirname, "public")));

// Mount our routers
app.use("/", indexRouter);
app.use("/rezerwacja", rezerwacjaRouter);
app.use("/kontakt", kontaktRouter);

export default app;
