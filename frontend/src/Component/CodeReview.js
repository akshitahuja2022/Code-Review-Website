import React, { useEffect, useState } from "react";
import "./CodeReview.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { handleError, handleSuccess } from "./Notification";

function Review() {
  const [code, setCode] = useState(`function sum(){
    return 1+1;
}`);

  const [review, setReview] = useState(``);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const reviewCode = async () => {
    try {
      handleSuccess("Your code is being reviewed. Please wait a moment ⏳");
      const response = await axios.post(
        "https://code-review-website.onrender.com/ai/get-review",
        {
          code,
        }
      );
      setReview(response.data);
      setMessage(true);
    } catch (err) {
      handleError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 m-auto gap-[1rem] p-5">
      {/* Left side editor */}
      <div className="editor-container relative flex flex-col bg-neutral-700 rounded-lg text-white overflowX-auto p-2">
        <div className="w-full h-full">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={5}
            style={{
              fontSize: "1.1rem",
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontWeight: 12,
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              overflowX: "hidden",
            }}
          />
        </div>
        <div
          onClick={reviewCode}
          className="absolute bottom-3 right-5 text-white bg-blue-700 font-medium p-2 px-8 rounded-md cursor-pointer select-none hover:bg-gray-400 hover:text-black"
        >
          Review
        </div>
      </div>

      {/* Right side AI Review */}
      {message ? (
        <div className="flex flex-col bg-teal-800 rounded-lg text-white px-2 py-2 review-panel">
          <Markdown key={review} rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      ) : (
        <div className="flex flex-col bg-teal-800 rounded-lg text-white px-2 py-2 review-panel">
          <h2 className="text-2xl font-semibold mb-3 text-white">
            No Review Yet
          </h2>
          <p className="text-base text-gray-300 mb-6 max-w-md">
            evaluation. Paste your code in the editor and click{" "}
            <span className="font-bold text-blue-400">“Review”</span> to get
            AI-powered insights, suggestions, and improvements.
          </p>
        </div>
      )}
    </div>
  );
}

export default Review;
