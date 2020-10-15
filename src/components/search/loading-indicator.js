import React from "react"
import "../../styles/loading-indicator.scss"

export const LoadingIndicator = ({ style = {} }) => {
    return (
        <div className="loading-indicator" style={style}>
            <div className="circle circle--1" />
            <div className="circle circle--2" />
            <div className="circle circle--3" />
        </div>
    )
}

export default LoadingIndicator
