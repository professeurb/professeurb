import React from "react";
import remark from "remark";
import remark2react from "remark-react";
import rehype from "rehype";
import highlight from "rehype-highlight";
import rehype2react from "rehype-react";

import style from "./lang.module.css";


export function Md({ text }) {
  return (
    <>
      {
        remark()
          .use(remark2react)
          .processSync(text).contents
      }
    </>
  );
}

// export function Py({ text }) {
//   return (
//     <div>
//       {
//         remark()
//           .use(remark2react)
//           .processSync(text).contents
//       }
//     </div>
//   );
// }

export const Py = ({ text }) => {
  // console.log(
  //   rehype()
  //     .data("settings", { fragment: true })
  //     .use(highlight)
  //     .use(rehype2react, {
  //       createElement: React.createElement
  //     })
  //     .processSync(
  //       `<pre><code class="language-python">` + text + `</code></pre>`
  //     )
  // );
  return (
    <span className={style.inlinecode}>
      {
        rehype()
          .data("settings", { fragment: true })
          .use(highlight)
          .use(rehype2react, {
            createElement: React.createElement
          })
          .processSync(
            `<pre><code class="language-python">` + text + `</code></pre>`
          ).contents.props.children[0]
      }
    </span>
  );
};
