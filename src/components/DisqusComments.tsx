import { useEffect, useState } from "react";

const DISQUS_SHORTNAME = "paws-and-home-sg";
const PAGE_URL = "https://adithiudupakarkadaweek03assignment.vercel.app/";
const PAGE_ID = "home";

export default function DisqusComments() {
  const [isLiveSite, setIsLiveSite] = useState(false);

  useEffect(() => {
    // Only load Disqus script on the production site to prevent cross-origin iframe Script errors in development / preview environments
    const isLive =
      typeof window !== "undefined" &&
      window.location.hostname === "adithiudupakarkadaweek03assignment.vercel.app";

    setIsLiveSite(isLive);

    if (!isLive) {
      return;
    }

    try {
      const w = window as any;

      w.disqus_config = function (this: any) {
        this.page.url = PAGE_URL;
        this.page.identifier = PAGE_ID;
      };

      // Already loaded (React re-mount / StrictMode) — reset instead of re-adding.
      if (document.getElementById("dsq-embed-script")) {
        if (w.DISQUS) {
          try {
            w.DISQUS.reset({ reload: true, config: w.disqus_config });
          } catch (err) {
            console.warn("Disqus reset skipped:", err);
          }
        }
        return;
      }

      const s = document.createElement("script");
      s.id = "dsq-embed-script";
      s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      s.setAttribute("data-timestamp", String(Date.now()));
      s.async = true;
      s.crossOrigin = "anonymous";
      s.onerror = (e) => {
        console.warn("Disqus script failed to load:", e);
      };
      document.body.appendChild(s);
    } catch (err) {
      console.warn("Disqus initialization skipped:", err);
    }
  }, []);

  return (
    <section id="feedback" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-2">Tell us what you think</h2>
      <p className="text-sm text-gray-600 mb-6">
        Did this help you find a shelter or a pet? Tell us what worked and what didn't.
      </p>
      {isLiveSite ? (
        <>
          <div id="disqus_thread" />
          <noscript>
            Please enable JavaScript to view the{" "}
            <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
          </noscript>
        </>
      ) : (
        <div className="p-4 rounded-xl bg-warmgray-50 border border-warmgray-200 text-xs sm:text-sm text-warmgray-600">
          <p className="font-semibold text-warmgray-800">Comments enabled on live site</p>
          <p className="mt-1">
            The community discussion thread is active on{" "}
            <a
              href={PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-600 underline font-medium hover:text-terracotta-700"
            >
              adithiudupakarkadaweek03assignment.vercel.app
            </a>
            .
          </p>
        </div>
      )}
    </section>
  );
}
