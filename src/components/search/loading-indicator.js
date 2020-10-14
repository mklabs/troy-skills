import React from "react"
import "../../styles/loading-indicator.scss"

export const LoadingIndicator = () => {
    return (
        <div className="loading-indicator">
            <div className="circle circle--1" />
            <div className="circle circle--2" />
            <div className="circle circle--3" />
        </div>
    )
}

export default LoadingIndicator
