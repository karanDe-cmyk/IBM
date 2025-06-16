import React from 'react'

export default function ThemeSwitcher({theme, toggleTheme}) {

    return (
        <div
        style={{
            background: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#000" : "#fff",
            height: "60vh",
            textAlign: "center",
            paddingTop: "20px"
        }}  
        >
            <button onClick={toggleTheme}>Change Theme to {theme === "light" ? "dark" : "light"}</button>
        </div>
    )
}
