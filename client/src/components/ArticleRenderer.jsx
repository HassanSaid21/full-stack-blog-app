

import  { useEffect } from "react";
import parse from "html-react-parser";
import "prismjs/themes/prism-tomorrow.css"; // Import a Prism.js theme
import Prism from "prismjs";


const ArticleRenderer = ({ content }) => {
  useEffect(() => {
    // Highlight all code blocks after rendering
    Prism.highlightAll();
  }, [content]);

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "div" &&
        domNode.attribs?.class?.includes("ql-code-block-container")
      ) {
        // Extract code lines from the container
        const codeLines = domNode.children
          .filter(
            (child) =>
              child.name === "div" &&
              child.attribs?.class?.includes("ql-code-block")
          )
          .map((child) => child.children?.[0]?.data || "") // Safely extract text content
          .join("\n");

        // Determine the language (default to 'javascript' if not specified)
        const language =
          domNode.children[0]?.attribs?.["data-language"] ?(domNode.children[0]?.attribs?.["data-language"]==='plain'? "javascript" : domNode.children[0]?.attribs?.["data-language"]):'javascript' ;

        return (
          <pre>
            <code className={`language-${language}`}>{codeLines}</code>
          </pre>
        );
      }
    },
  };

  return <div>{parse(content, options)}</div>;
};


export default ArticleRenderer