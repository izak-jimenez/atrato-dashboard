import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const serverInit = async () => {
  const server = new ApolloServer({ schema });
  await server.start();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use("/atrato/graphql/api", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  app.get("/", function (req, res) {
    res.send("Hello from backend test test");
  });
};

serverInit();
