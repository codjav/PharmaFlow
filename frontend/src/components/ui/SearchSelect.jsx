import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SearchSelect = ({
  options = [],
  value,
  labelKey = "name",
  valueKey = "id",
  placeholder = "Search...",
  onSelect,
  disabled = false,
}) => {
  const containerRef = useRef(null);

  const inputRef = useRef(null);

  const [dropdownStyle, setDropdownStyle] = useState({});

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const [highlighted, setHighlighted] = useState(0);

  useEffect(() => {
    if (!open || !inputRef.current) return;

    const updatePosition = () => {
      const rect = inputRef.current.getBoundingClientRect();

      setDropdownStyle({
        position: "fixed",

        top: rect.bottom + 4,

        left: rect.left,

        width: rect.width,

        zIndex: 99999,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);

      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    const selected = options.find((item) => item[valueKey] === value);

    if (selected) {
      setQuery(selected[labelKey]);
    }
  }, [value, options, valueKey, labelKey]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];

    return options
      .filter((item) => {
        const name = item[labelKey]?.toLowerCase() || "";

        const barcode = item.barcode?.toLowerCase() || "";

        const company = item.company?.toLowerCase() || "";

        const search = query.toLowerCase();

        return (
          name.includes(search) ||
          barcode.includes(search) ||
          company.includes(search)
        );
      })
      .slice(0, 20);
  }, [query, options, labelKey]);

  const choose = (item) => {
    setQuery(item[labelKey]);

    setOpen(false);

    onSelect(item);
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setHighlighted((prev) => Math.min(prev + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setHighlighted((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (filtered[highlighted]) {
        choose(filtered[highlighted]);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-64">
      <input
        ref={inputRef}

        disabled={disabled}

        className="w-full rounded-lg border border-slate-300 px-3 py-2"

        value={query}

        placeholder={placeholder}

        onFocus={() => {
            if(!disabled){
          setOpen(true);
        }}}

        onChange={(e) => {
            if(disabled) return;
          setQuery(e.target.value);
          setOpen(true);
          setHighlighted(0);
        }}

        onKeyDown={handleKeyDown}
      />

      {open &&
        createPortal(
          <div
            style={dropdownStyle}
            className="max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-2xl"
          >
            {filtered.length === 0 ? (
              <div className="p-3 text-gray-500">No medicine found</div>
            ) : (
              filtered.map((item, index) => (
                <button
                  key={item[valueKey]}

                  type="button"

                  onClick={() => choose(item)}

                  className={`block w-full border-b px-3 py-2 text-left ${
                    highlighted === index ? "bg-blue-100" : "hover:bg-slate-100"
                  }`}
                >
                  <div className="font-medium">{item[labelKey]}</div>

                  <div className="text-xs text-gray-500">
                    {item.company}

                    {item.barcode && ` • ${item.barcode}`}
                  </div>
                </button>
              ))
            )}
          </div>,

          document.body,
        )}
    </div>
  );
};

export default SearchSelect;
