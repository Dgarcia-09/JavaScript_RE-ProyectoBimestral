import {config} from "dotenv"
import {initServer} from "./configs/server.js"
import { defaultCategory } from "./src/category/category.controller.js"

config()
initServer()
defaultCategory()