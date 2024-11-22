const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

const platformConfig = {
  "application-infos": {
    path: "application-infos",
    remoteEntry: "http://localhost:4300/remoteEntry.js",
    remoteName: "remote",
    exposedModule: "./ApplicationInfoModule",
    exposedModuleName: "ApplicationInfoModule",
  },
  "todo-app": {
    path: "todo-app",
    remoteEntry: "http://localhost:4300/remoteEntry.js",
    remoteName: "remote",
    exposedModule: "./TodoModule",
    exposedModuleName: "TodoModule",
    query: {
      isRequired: true,
      params: ["id", "version"],
    },
  },
  "todo-app-2": {
    path: "todo-app-2",
    remoteEntry: "http://localhost:4300/remoteEntry.js",
    remoteName: "remote",
    exposedModule: "./TodoModule",
    exposedModuleName: "TodoModule",
    query: {
      isRequired: true,
      params: ["id", "version"],
    },
  },
};

// Platform config route
app.get("/platform-config", (req, res) => {
  res.json(platformConfig);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
