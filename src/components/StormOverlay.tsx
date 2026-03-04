import { useEffect, useRef, useCallback } from "react";

// Each cloud is a cluster of overlapping ellipses to create organic shapes
const cloudClusters = [
  // Orange streaky clouds — right of the glow, above the mountains
  {
    blobs: [
      { x: 62, y: 36, w: 250, h: 60 },
      { x: 67, y: 38, w: 200, h: 70 },
      { x: 58, y: 37, w: 180, h: 50 },
    ],
    color: "255,160,80",
  },
  {
    blobs: [
      { x: 72, y: 34, w: 220, h: 55 },
      { x: 76, y: 36, w: 180, h: 65 },
      { x: 69, y: 35, w: 150, h: 45 },
    ],
    color: "255,140,60",
  },
  // Upper-left dark blue sky wisps
  {
    blobs: [
      { x: 15, y: 10, w: 180, h: 70 },
      { x: 19, y: 13, w: 150, h: 80 },
      { x: 12, y: 12, w: 120, h: 55 },
    ],
    color: "140,150,200",
  },
];

export function StormOverlay() {
  const clusterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const flash = useCallback((index: number) => {
    const el = clusterRefs.current[index];
    if (!el) return;

    el.style.opacity = String(0.6 + Math.random() * 0.4);

    const doubleFlash = Math.random() < 0.35;

    setTimeout(() => {
      if (el) el.style.opacity = "0";

      if (doubleFlash) {
        setTimeout(() => {
          if (el) el.style.opacity = String(0.4 + Math.random() * 0.3);
          setTimeout(() => {
            if (el) el.style.opacity = "0";
          }, 80 + Math.random() * 60);
        }, 100 + Math.random() * 80);
      }
    }, 60 + Math.random() * 80);

    const next = 2000 + Math.random() * 5000;
    timeoutsRef.current[index] = window.setTimeout(() => flash(index), next);
  }, []);

  useEffect(() => {
    cloudClusters.forEach((_, i) => {
      const delay = 500 + Math.random() * 4000;
      timeoutsRef.current[i] = window.setTimeout(() => flash(i), delay);
    });

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [flash]);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      {cloudClusters.map((cluster, i) => (
        <div
          key={i}
          ref={(el) => { clusterRefs.current[i] = el; }}
          style={{ opacity: 0, transition: "opacity 0.06s ease-in" }}
        >
          {cluster.blobs.map((blob, j) => (
            <div
              key={j}
              className="absolute rounded-full"
              style={{
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                width: blob.w,
                height: blob.h,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(ellipse, rgba(${cluster.color},0.8) 0%, rgba(${cluster.color},0) 65%)`,
                filter: "blur(50px)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
