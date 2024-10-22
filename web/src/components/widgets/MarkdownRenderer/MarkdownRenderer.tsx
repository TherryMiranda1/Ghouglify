import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

interface MarkdownRendererProps {
  path: string; // La ruta del archivo markdown
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para cargar el contenido del archivo Markdown
    const loadMarkdown = async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(
            `Error loading markdown file: ${response.statusText}`
          );
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError("Error loading markdown file");
        console.error(err);
      }
    };

    loadMarkdown();
  }, [path]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <RendererStyled>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </RendererStyled>
  );
};

const RendererStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: auto;
  padding: 16px;
  max-width: ${DEVICE_BREAKPOINTS.md};
  img {
    width: 100%;
    max-width: ${DEVICE_BREAKPOINTS["2xs"]};
  }
  h1,
  h2,
  h3{
    color: var(--tint-color);
    display: block;
    align-self: flex-start;
  }
  a {
    color: var(--secondary-text-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default MarkdownRenderer;
