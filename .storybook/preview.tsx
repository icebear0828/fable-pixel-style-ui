import type { Preview } from "@storybook/react-vite";
import "../src/components/styles/index.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      options: {
        paper: { name: "Paper", value: "#fff1e8" },
        white: { name: "White", value: "#ffffff" },
        grid: { name: "Pixel grid", value: "#fff1e8" },
        ink: { name: "Ink", value: "#1d2b53" },
      },
    },
    options: {
      storySort: {
        order: ["Overview", ["Introduction", "Palette", "Icons"], "General", "Form", "Data", "Feedback"],
      },
    },
    docs: { toc: true },
  },
  initialGlobals: {
    backgrounds: { value: "paper" },
  },
  tags: ["autodocs"],
};

export default preview;
