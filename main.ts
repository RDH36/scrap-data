import { load } from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";

const nhm = new NodeHtmlMarkdown({}, undefined, undefined);

const run = async () => {
  const article = await fetch(
    "https://daily.dev/blog/2023-is-finally-over-lets-wrap-it-up"
  ).then((res) => res.text());
  const $ = load(article);
  const articleHtml =
    $("article").html() ||
    $(".prose").html() ||
    $(".content").html() ||
    $("#content").html() ||
    $(".article").html() ||
    $(".post").html() ||
    $("main").html() ||
    $("body").html();

  if (!articleHtml) {
    console.error("No article content found");
    return;
  }

  const markdown = nhm.translate(articleHtml);

  const $head = $("head");

  const url =
    $head.children("meta[property='og:image']").attr("content") ||
    $head.children("meta[name='og:image']").attr("content") ||
    $head.children("meta[name='twitter:image']").attr("content") ||
    $head.children("meta[name='twitter:image:src']").attr("content");

  console.log(markdown);
  console.log(url);
};

run();
