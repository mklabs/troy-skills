import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "../../styles/skill-tooltip-ability-bullet.scss"

export default function SkillTooltipAbilityBullets({ abilityBullets, unitAbility, service }) {
    const data = useStaticQuery(graphql`
        query {
            allAbilityIconsImageSharp: allFile(
                filter: { relativeDirectory: { eq: "ability_icons" } }
            ) {
                totalCount
                nodes {
                    relativePath
                    relativeDirectory
                    ext
                    extension
                    name
                    childImageSharp {
                        fixed(width: 25) {
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
    `)

    const { allAbilityIconsImageSharp } = data

    if (!abilityBullets) {
        return null
    }

    const rows = abilityBullets.map(bullet => {
        const img = allAbilityIconsImageSharp.nodes.find(
            node => node.name === unitAbility.icon_name
        )

        const content = bullet.bulletText.split("||").map(bullet => {
            const content = service.replaceInlineIcon(bullet, { static: true })
            return <div key={bullet}>{content}</div>
        })

        return {
            img,
            content
        }
    })

    return (
        <div className="tooltip-ability-effect-bullet">
            {rows.map((row, i) => (
                <div className="tooltip-ability-effect-bullet-row" key={i}>
                    <div className="tooltip-ability-effect-bullet-icon">
                        <Img fixed={row.img.childImageSharp.fixed} />
                    </div>
                    <div className="tooltip-ability-effect-bullet-text">{row.content}</div>
                </div>
            ))}
        </div>
    )
}
