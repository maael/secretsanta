import { configure } from "@storybook/react";

const req = require.context("../app/", true, /.story.jsx$/);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
