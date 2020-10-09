module.exports = {
    pathPrefix: "/troy-skills",
    siteMetadata: {
        title: `Troy Skills`,
        description: `See the details of Troy Character Skill Trees`,
        author: `@mklabs`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data`
            }
        },
        {
            resolve: `gatsby-transformer-csv`,
            options: {
                extensions: [`tsv`],
                delimiter: "\t"
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-troy-skills`,
                short_name: `troy-skills`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/loot_plate_victory.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-plugin-webfonts`,
            options: {
                fonts: {
                    google: [
                        {
                            family: "Cabin",
                            variants: ["400", "500"]
                        },
                        {
                            family: "Hind",
                            variants: ["400", "500"]
                        }
                    ]
                }
            }
        },
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                // replace `UA-XXXXXXXXX-X` with your own Google Analytics Tracking ID
                trackingId: `UA-180108496-1`
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
}
