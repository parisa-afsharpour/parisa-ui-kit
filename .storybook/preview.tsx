import type { Preview } from "@storybook/react";
import { UIProvider } from "../src/providers/UIProvider";
import "../src/index.css";
import 'antd/dist/reset.css';


const preview: Preview = {
    decorators: [
        (Story) => (
            <UIProvider>
                <Story />
            </UIProvider>
        ),
    ],
};

export default preview;