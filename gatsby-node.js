const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve("src/templates/post.js")
  const tagTemplate = path.resolve("src/templates/tag.js")
  const pageTemplate = path.resolve("src/templates/page.js")

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            title
            slug
            date
            feature_image
            tags
            authors
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/pages/" } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.posts.nodes
  posts.forEach((node, index) => {
    const slug = node.frontmatter.slug
    const prev = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: `/${slug}/`,
      component: postTemplate,
      context: {
        slug,
        prevSlug: prev ? prev.frontmatter.slug : null,
        nextSlug: next ? next.frontmatter.slug : null,
      },
    })
  })

  const pages = result.data.pages.nodes
  pages.forEach((node) => {
    const slug = node.frontmatter.slug
    createPage({
      path: `/${slug}/`,
      component: pageTemplate,
      context: { slug },
    })
  })

  const tagSet = new Set()
  posts.forEach((node) => {
    const tags = node.frontmatter.tags || []
    tags.forEach((tag) => tagSet.add(tag))
  })

  tagSet.forEach((tag) => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
    createPage({
      path: `/tag/${tagSlug}/`,
      component: tagTemplate,
      context: { tag },
    })
  })
}
