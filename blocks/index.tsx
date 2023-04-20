import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { ActionList, ActionMenu, Box, Flash } from "@primer/react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";

// Supported stylesheets from Prism
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/HEAD/AVAILABLE_STYLES_PRISM.MD
const availableStylesheets = [
  "coy",
  "dark",
  "funky",
  "okaidia",
  "solarizedlight",
  "tomorrow",
  "twilight",
  "prism",
  "a11yDark",
  "atomDark",
  "base16AteliersulphurpoolLight",
  "cb",
  "coldarkCold",
  "coldarkDark",
  "coyWithoutShadows",
  "darcula",
  "dracula",
  "duotoneDark",
  "duotoneEarth",
  "duotoneForest",
  "duotoneLight",
  "duotoneSea",
  "duotoneSpace",
  "ghcolors",
  "gruvboxDark",
  "gruvboxLight",
  "holiTheme",
  "hopscotch",
  "lucario",
  "materialDark",
  "materialLight",
  "materialOceanic",
  "nightOwl",
  "nord",
  "oneDark",
  "oneLight",
  "pojoaque",
  "shadesOfPurple",
  "solarizedDarkAtom",
  "synthwave84",
  "vs",
  "vscDarkPlus",
  "xonokai",
  "zTouch",
].sort((a, b) => a.localeCompare(b));

export default function ExampleFileBlock(props: FileBlockProps) {
  const oneDarkIndex = availableStylesheets.findIndex((a) => a === "prism");
  const [selectedIndex, setSelectedIndex] = useState(oneDarkIndex);
  const [currentStyle, setCurrentStyle] = useState(
    availableStylesheets[selectedIndex]
  );
  const { context, content } = props;

  useEffect(() => {
    setCurrentStyle(availableStylesheets[selectedIndex]);
  }, [selectedIndex]);

  const language = getLanguageFromFilename(context.path).toLowerCase();

  if (!language) {
    return (
      <Box p={4}>
        <Flash variant="danger">
          We could not identify the language in the file. It's contents are
          displayed as-is for now.
        </Flash>
        <Box
          marginTop={5}
          borderColor="border.default"
          borderWidth={1}
          borderStyle="solid"
          borderRadius={6}
          overflow="hidden"
        >
          <Box p={4}>
            <pre className="mt-3 p-3">{content}</pre>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
          marginBottom="-0.5em"
        >
          <Box>
            <strong>{context.path}</strong>
          </Box>
          <Box>
            <ActionMenu>
              <ActionMenu.Button aria-label="Select theme">
                Theme: {availableStylesheets[selectedIndex]}
              </ActionMenu.Button>
              <ActionMenu.Overlay maxHeight="medium" sx={{ overflow: "auto" }}>
                <ActionList selectionVariant="single">
                  {availableStylesheets.map((s, i) => (
                    <ActionList.Item
                      key={s}
                      selected={i === selectedIndex}
                      onSelect={() => setSelectedIndex(i)}
                    >
                      {s}
                    </ActionList.Item>
                  ))}
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>
        </Box>
        <Box>
          <SyntaxHighlighter
            language={language}
            showLineNumbers={true}
            style={styles[currentStyle as keyof typeof styles]}
          >
            {content}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
}
