import { useState, useEffect, useRef } from "react";

export default function GameMenu({ gameId, onRemove }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="position-relative" ref={menuRef}>
      <button
        className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center border-0"
        style={{ width: 36, height: 36, color: "#6c757d" }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-label="Game options"
        title="Options"
      >
        ⋯
      </button>

      {open && (
        <div
          className="position-absolute end-0 mt-1 rounded-3 shadow"
          style={{
            zIndex: 100,
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            minWidth: 160,
            top: "100%",
          }}
        >
          <button
            className="btn btn-sm w-100 text-start px-3 py-2 text-danger d-flex align-items-center gap-2"
            style={{ borderRadius: "inherit" }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(gameId);
              setOpen(false);
            }}
          >
            <span>🗑</span> Remove game
          </button>
        </div>
      )}
    </div>
  );
}
