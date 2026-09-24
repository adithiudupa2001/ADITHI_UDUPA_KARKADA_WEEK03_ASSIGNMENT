import { useEffect } from "react";

const DISQUS_SHORTNAME = "paws-and-home-sg";
const PAGE_URL = "https://adithiudupakarkadaweek03assignment.vercel.app/";
const PAGE_ID = "home";

export default function DisqusComments() {
  useEffect(() => {
    const w = window as any;

    w.disqus_config = function (this: any) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_ID;
    };

    // Already loaded (React re-mount / StrictMode) — reset instead of re-adding.
    if (document.getElementById("dsq-embed-script")) {
      if (w.DISQUS) {
        w.DISQUS.reset({ reload: true, config: w.disqus_config });
      }
      return;
    }

    const s = document.createElement("script");
    s.id = "dsq-embed-script";
    s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
    s.setAttribute("data-timestamp", String(Date.now()));
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="feedback" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-2">Tell us what you think</h2>
      <p className="text-sm text-gray-600 mb-6">
        Did this help you find a shelter or a pet? Tell us what worked and what didn't.
      </p>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
}
