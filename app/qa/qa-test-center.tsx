"use client";

import { useMemo, useState } from "react";

type TestStatus = "idle" | "running" | "pass" | "warn" | "fail";

type TestResult = {
  id: string;
  name: string;
  category: string;
  status: TestStatus;
  durationMs?: number;
  detail: string;
};

const ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/guides", name: "Guides" },
  { path: "/how-we-rank", name: "How we rank" },
  { path: "/privacy", name: "Privacy" },
  { path: "/terms", name: "Terms" },
  { path: "/contact", name: "Contact" },
  { path: "/affiliate-disclosure", name: "Affiliate disclosure" },
  { path: "/robots.txt", name: "Robots" },
  { path: "/sitemap.xml", name: "Sitemap" },
];

const INITIAL_RESULTS: TestResult[] = [
  { id: "origin", name: "Production origin", category: "Health", status: "idle", detail: "Not tested" },
  ...ROUTES.map((route) => ({
    id: `route:${route.path}`,
    name: route.name,
    category: "Routes",
    status: "idle" as TestStatus,
    detail: route.path,
  })),
  { id: "assets", name: "Static asset sample", category: "Assets", status: "idle", detail: "Not tested" },
  { id: "browser", name: "Browser capabilities", category: "Browser", status: "idle", detail: "Not tested" },
];

function statusLabel(status: TestStatus) {
  if (status === "pass") return "PASS";
  if (status === "warn") return "WARN";
  if (status === "fail") return "FAIL";
  if (status === "running") return "RUNNING";
  return "READY";
}

function statusTone(status: TestStatus) {
  if (status === "pass") return { background: "#dcfce7", color: "#166534" };
  if (status === "warn") return { background: "#fef3c7", color: "#92400e" };
  if (status === "fail") return { background: "#fee2e2", color: "#991b1b" };
  if (status === "running") return { background: "#e0e7ff", color: "#3730a3" };
  return { background: "#f1f5f9", color: "#475569" };
}

async function timedFetch(path: string) {
  const started = performance.now();
  const response = await fetch(path, {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });
  const durationMs = Math.round(performance.now() - started);
  return { response, durationMs };
}

export function QATestCenter() {
  const [results, setResults] = useState<TestResult[]>(INITIAL_RESULTS);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);

  const summary = useMemo(() => {
    const completed = results.filter((result) => ["pass", "warn", "fail"].includes(result.status));
    return {
      total: completed.length,
      pass: completed.filter((result) => result.status === "pass").length,
      warn: completed.filter((result) => result.status === "warn").length,
      fail: completed.filter((result) => result.status === "fail").length,
    };
  }, [results]);

  async function runFullTest() {
    setRunning(true);
    setResults(INITIAL_RESULTS.map((result) => ({ ...result, status: "running" })));

    const next: TestResult[] = [];

    try {
      const health = await timedFetch("/");
      next.push({
        id: "origin",
        name: "Production origin",
        category: "Health",
        status: health.response.ok ? "pass" : "fail",
        durationMs: health.durationMs,
        detail: `${health.response.status} ${health.response.statusText}`,
      });
    } catch (error) {
      next.push({ id: "origin", name: "Production origin", category: "Health", status: "fail", detail: String(error) });
    }

    for (const route of ROUTES) {
      try {
        const { response, durationMs } = await timedFetch(route.path);
        const contentType = response.headers.get("content-type") ?? "unknown";
        next.push({
          id: `route:${route.path}`,
          name: route.name,
          category: "Routes",
          status: response.ok ? "pass" : "fail",
          durationMs,
          detail: `${route.path} · ${response.status} · ${contentType}`,
        });
      } catch (error) {
        next.push({
          id: `route:${route.path}`,
          name: route.name,
          category: "Routes",
          status: "fail",
          detail: `${route.path} · ${String(error)}`,
        });
      }
    }

    try {
      const { response, durationMs } = await timedFetch("/favicon.svg");
      next.push({
        id: "assets",
        name: "Static asset sample",
        category: "Assets",
        status: response.ok ? "pass" : "warn",
        durationMs,
        detail: response.ok ? `favicon.svg · ${response.status}` : `favicon.svg · ${response.status}`,
      });
    } catch (error) {
      next.push({ id: "assets", name: "Static asset sample", category: "Assets", status: "warn", detail: String(error) });
    }

    const browserChecks = [
      ["fetch", typeof window.fetch === "function"],
      ["localStorage", (() => { try { return typeof window.localStorage !== "undefined"; } catch { return false; } })()],
      ["serviceWorker", "serviceWorker" in navigator],
    ];
    const browserPass = browserChecks.filter(([, ok]) => ok).length;
    next.push({
      id: "browser",
      name: "Browser capabilities",
      category: "Browser",
      status: browserPass === browserChecks.length ? "pass" : "warn",
      detail: `${browserPass}/${browserChecks.length} capabilities available`,
    });

    setResults(next);
    setLastRun(new Date().toLocaleString());
    setRunning(false);
  }

  async function copyReport() {
    const lines = [
      "VELVET XR QA REPORT",
      `Run: ${lastRun ?? "Not run"}`,
      "",
      ...results.map((result) => `${statusLabel(result.status)} | ${result.category} | ${result.name} | ${result.detail}${result.durationMs ? ` | ${result.durationMs}ms` : ""}`),
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", padding: "40px 20px", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#64748b" }}>Velvet XR</div>
            <h1 style={{ margin: "8px 0 8px", fontSize: "clamp(30px, 5vw, 48px)", lineHeight: 1.05 }}>QA Test Center</h1>
            <p style={{ margin: 0, color: "#64748b", maxWidth: 680 }}>Production smoke tests for routes, assets and browser capabilities.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={copyReport} disabled={!lastRun} style={{ border: "1px solid #cbd5e1", background: "white", color: "#0f172a", padding: "11px 16px", borderRadius: 10, cursor: lastRun ? "pointer" : "not-allowed", fontWeight: 700 }}>Copy report</button>
            <button onClick={runFullTest} disabled={running} style={{ border: 0, background: "#0f172a", color: "white", padding: "11px 18px", borderRadius: 10, cursor: running ? "wait" : "pointer", fontWeight: 800 }}>{running ? "Running…" : "Run full test"}</button>
          </div>
        </div>

        <div style={{ marginTop: 24, padding: 16, background: "white", border: "1px solid #e2e8f0", borderRadius: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em" }}>Target</div>
          <div style={{ marginTop: 5, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, wordBreak: "break-all" }}>{typeof window !== "undefined" ? window.location.origin : "Production"}</div>
          {lastRun && <div style={{ marginTop: 8, color: "#64748b", fontSize: 13 }}>Last run: {lastRun}</div>}
        </div>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 16 }}>
          {[
            ["Tests", summary.total],
            ["Passed", summary.pass],
            ["Warnings", summary.warn],
            ["Failed", summary.fail],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 18 }}>
              <div style={{ color: "#64748b", fontSize: 13 }}>{label}</div>
              <div style={{ fontSize: 30, fontWeight: 850, marginTop: 5 }}>{value}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 16, background: "white", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 18px", borderBottom: "1px solid #e2e8f0", fontWeight: 800 }}>Test results</div>
          <div>
            {results.map((result) => (
              <div key={result.id} style={{ display: "grid", gridTemplateColumns: "110px minmax(150px, 220px) 1fr auto", gap: 14, alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ ...statusTone(result.status), display: "inline-flex", justifyContent: "center", borderRadius: 999, padding: "5px 8px", fontSize: 11, fontWeight: 900 }}>{statusLabel(result.status)}</span>
                <div>
                  <div style={{ fontWeight: 750 }}>{result.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{result.category}</div>
                </div>
                <div style={{ color: "#475569", fontSize: 13, wordBreak: "break-word" }}>{result.detail}</div>
                <div style={{ color: "#94a3b8", fontSize: 12, minWidth: 58, textAlign: "right" }}>{result.durationMs ? `${result.durationMs} ms` : ""}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 16, color: "#64748b", fontSize: 12 }}>QA route is intended for development/operations use. Protect this route with Cloudflare Access before treating it as a private production admin tool.</div>
      </div>
    </main>
  );
}
