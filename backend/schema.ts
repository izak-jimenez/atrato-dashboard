import "./types/User.js";
import "./types/Card.js";
import { builder } from "./graphql/builder.js";

export const schema = builder.toSchema();
