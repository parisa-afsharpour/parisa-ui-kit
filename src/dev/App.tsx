//👈 فقط برای develop & preview

import { Button } from "../components/button";
import {
    UIProvider,
    useUISemanticTokens,
} from "../theme/UIProvider";

const sizes = ["xs", "s", "m", "l", "xl"] as const;

type PreviewProps = {
    title: string;
};

function PreviewPanel({ title }: PreviewProps) {
    // Tokens are read from the nearest UIProvider.
    const semantic = useUISemanticTokens();

    return (
        <main
            dir="rtl"
            style={{
                padding: 32,
                minHeight: "100vh",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 32,

                backgroundColor: semantic.base.outline.bg.default,
                color: semantic.base.outline.text.default,
            }}
        >
            <header>
                <h1>{title}</h1>
                <p>محیط توسعه و تست کامپوننت‌ها</p>
            </header>

            <section>
                <h2>Button — Variants</h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <Button label="Solid" variant="solid" relevance="primary" />
                    <Button label="Outline" variant="outline" relevance="primary" />
                    <Button label="Tone" variant="tone" relevance="primary" />
                    <Button label="Textual" variant="textual" relevance="primary" />
                </div>
            </section>

            <section>
                <h2>Button — Sizes</h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            label={size.toUpperCase()}
                            size={size}
                            relevance="primary"
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2>Button — States</h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <Button label="Default" />
                    <Button label="Disabled" disabled />
                    <Button label="Loading" loading />
                </div>
            </section>
        </main>
    );
}

export default function App() {
    return (
        <div
            dir="rtl"
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                gap: 16,
                width: "100%",
                minHeight: "100vh",
            }}
        >
            <UIProvider theme="isc" colorMode="light">
                <PreviewPanel title="Light Mode" />
            </UIProvider>

            <UIProvider theme="isc" colorMode="dark">
                <PreviewPanel title="Dark Mode" />
            </UIProvider>
        </div>
    );
}
