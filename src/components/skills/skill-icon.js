import React from "react"
import Img from "gatsby-image"

const SkillIcon = ({ skill, size = 70, transformationCoef = 0.79, offset }) => {
    if (!skill) {
        return null
    }

    let title = `${skill.skill.localised_name} -  ${skill.skill.localised_description}`
    title += `\n---\n`
    title += skill.effects
        .map(effect => {
            return effect.description
        })
        .join("\n")

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundSize: "contain",
    }

    offset = offset || Math.ceil(size * 0.1)
    const imgSize = Math.floor(size * transformationCoef)
    const imgStyle = {
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        top: `${offset}px`,
        left: `${offset}px`,
    }

    if (!skill.img) {
        return null
    }

    return (
        <Img
            fixed={skill.img.fixed}
            title={title}
            className="skill-icon-wrapper"
            style={style}
            imgStyle={imgStyle}
        />
    )
}

export default SkillIcon
