import React from "react"
import Img from "gatsby-image"
import ReactTooltip from "react-tooltip"
import { useStaticQuery, graphql } from "gatsby"

const SkillIcon = ({ skill, size = 70, transformationCoef = 0.79, offset }) => {
    const data = useStaticQuery(graphql`
        query AllEffectBundlesImages {
            allImageSharp: allFile(
                filter: { relativeDirectory: { eq: "effect_bundles" } }
            ) {
                totalCount
                edges {
                    node {
                        relativePath
                        relativeDirectory
                        ext
                        extension
                        name
                        childImageSharp {
                            fixed(width: 28) {
                                originalName
                                height
                                width
                                ...GatsbyImageSharpFixed
                            }
                            original {
                                height
                                width
                            }
                        }
                    }
                }
            }
        }
    `)

    if (!skill) {
        return null
    }

    const { allImageSharp } = data

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

    const indent = Number(skill.indent)
    const tooltipDirection = indent <= 3 ? "right" : "left"

    const overridePosition = (
        { left, top },
        currentEvent,
        currentTarget,
        node
    ) => {
        console.log("overridePosition", left, top);
        const d = document.documentElement
        top = top + 80
        top = Math.min(d.clientHeight - node.clientHeight, top)
        top = Math.max(0, top)
        return { top, left }
    }

    return (
        <div className="skill-icon-wrapper">
            <div data-tip={title} data-for={`skill-tooltip-${skill.key}`}>
                <Img
                    fixed={skill.img.fixed}
                    className="skill-icon-img-wrapper"
                    style={style}
                    imgStyle={imgStyle}
                />
            </div>

            <ReactTooltip
                className="skill-tooltip"
                place={tooltipDirection}
                id={`skill-tooltip-${skill.key}`}
                overridePositzion={overridePosition}
            >
                <h4 className="title">{skill.skill.localised_name}</h4>
                <div className="content">
                    <p className="description">
                        {skill.skill.localised_description}
                    </p>
                    <div className="effects">
                        {skill.effects.map(effect => {
                            const isPositiveValueGood =
                                effect.is_positive_value_good === "true"
                            const value = Number(effect.value)
                            const isPositiveEffect = isPositiveValueGood
                                ? value >= 0
                                : value < 0

                            let img = isPositiveEffect
                                ? allImageSharp.edges.find(
                                      ({ node }) =>
                                          effect.icon ===
                                          `${node.name}${node.ext}`
                                  )
                                : allImageSharp.edges.find(
                                      ({ node }) =>
                                          effect.icon_negative ===
                                          `${node.name}${node.ext}`
                                  )

                            return (
                                <div
                                    key={effect.effect_key}
                                    className={`effect ${
                                        isPositiveEffect
                                            ? "positive"
                                            : "negative"
                                    }`}
                                >
                                    {img ? (
                                        <Img
                                            fixed={
                                                img.node.childImageSharp.fixed
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <span className="effect-description">
                                        {effect.description}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ReactTooltip>
        </div>
    )
}

export default SkillIcon
