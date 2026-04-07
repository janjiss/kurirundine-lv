import "./src/styles/fonts.css"
import "./src/styles/style.css"
import "./src/styles/overrides.css"
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

export const onRouteUpdate = () => {
  requestAnimationFrame(() => {
    const galleries = document.querySelectorAll(".kg-gallery-card")
    galleries.forEach((gallery) => {
      const images = gallery.querySelectorAll("img")
      images.forEach((image) => {
        const container = image.closest(".kg-gallery-image")
        if (container && image.naturalWidth && image.naturalHeight) {
          container.style.flex = `${image.naturalWidth / image.naturalHeight} 1 0%`
        } else if (container) {
          image.addEventListener("load", () => {
            container.style.flex = `${image.naturalWidth / image.naturalHeight} 1 0%`
          })
        }
      })

      const links = Array.from(images).map((img) => {
        let a = img.closest("a")
        if (!a) {
          a = document.createElement("a")
          a.setAttribute("href", img.src)
          img.parentNode.insertBefore(a, img)
          a.appendChild(img)
        }
        return a
      })
      if (links.length > 0) {
        new SimpleLightbox(links, {
          overlayOpacity: 1,
          captionSelector: "img",
          captionType: "attr",
          captionsData: "alt",
          nav: true,
          close: true,
          showCounter: false,
        })
      }
    })

    const standaloneImgs = document.querySelectorAll(
      ".post-content > p > img, .post-content > .kg-image-card img"
    )
    standaloneImgs.forEach((img) => {
      if (img.closest(".kg-gallery-card")) return
      let a = img.closest("a")
      if (!a) {
        a = document.createElement("a")
        a.setAttribute("href", img.src)
        img.parentNode.insertBefore(a, img)
        a.appendChild(img)
      }
    })

    const standaloneLinks = document.querySelectorAll(
      ".post-content > p > a > img, .post-content > .kg-image-card a > img"
    )
    const linkEls = Array.from(standaloneLinks)
      .filter((img) => !img.closest(".kg-gallery-card"))
      .map((img) => img.closest("a"))
    if (linkEls.length > 0) {
      new SimpleLightbox(linkEls, {
        overlayOpacity: 1,
        captionSelector: "img",
        captionType: "attr",
        captionsData: "alt",
        nav: true,
        close: true,
        showCounter: false,
      })
    }
  })
}
