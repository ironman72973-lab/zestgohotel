import React from "react";
import "./SearchBox.css";

function SearchBox({
    value,
    onChange,
    placeholder = "Search...",
    onSearch,
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSearch) {
            onSearch();
        }
    };

    return (
        <div className="search-box">
            <span className="search-icon">
                <i className="bi bi-search"></i>
            </span>

            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />

            {value && (
                <button
                    className="clear-btn"
                    onClick={() =>
                        onChange({ target: { value: "" } })
                    }
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            )}
        </div>
    );
}

export default SearchBox;