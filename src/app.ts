import Server from "./server";
import path from "path";
import "reflect-metadata";

declare global {
    var __rootdir: string;
}

global.__rootdir = __dirname;

Server.start();
