const nav = document.getElementById("nav")
const menuButton = document.querySelector(".icon-menu")
const closeButton = document.getElementById("close-button")
const numberOfProductsInTheCart = document.querySelector(".quantity__products")
const priceWithDiscount = document.querySelector(".price-with-discount")
const cartInformation = document.querySelector(".cart-information-container")
const cartInformationEmpty = document.querySelector(".cart-information-container__empty")
const cartInformationDescription = document.querySelector(".cart-information-description")
const productPrice = document.querySelector(".product-price")
const navLink = document.getElementsByTagName("a")
const buttonCart = document.querySelector(".button-cart")
const body = document.getElementsByTagName("body")
const bodyActiveMenu = document.querySelector(".body-active-menu")
const previousButton = document.getElementById("previous")
const nextButton = document.getElementById("next")
const imagesProduct = document.querySelectorAll(".image-product")
const imagesThumbnailContainer = document.querySelector(".img-thumbnail-container")
const imagesProductThumbnail = document.querySelectorAll(".image-product-thumbnail")
const lightboxImagesThumbnail = document.querySelectorAll(".lightbox-image-thumbnail")
const lightboxImagesProduct = document.querySelectorAll(".lightbox-image-product")
const minusButton = document.getElementById("minus")
const plusButton = document.getElementById("plus")
const inputTypeNumber = document.getElementById("input-type-number")
const addToCartButton = document.querySelector(".add-to-cart")
const lightbox = document.querySelector(".lightbox")
const lightboxImageContainer = document.querySelector(".lightbox__img-container")
const lightboxCloseButton = document.querySelector(".lightbox__close-button")
const lightboxPreviousButton = document.getElementById("lightbox-previous-button")
const lightboxNextButton = document.getElementById("lightbox-next-button")


cartInformationEmpty.hidden = true

menuButton.addEventListener("click", ()=> {
    nav.classList.add("nav-showing")
    bodyActiveMenu.hidden = false
})

closeButton.addEventListener("click", ()=> {
    nav.classList.remove("nav-showing")
    bodyActiveMenu.hidden = true
})

const navLinkArray = Array.from(navLink)

for(const link of navLinkArray) {
    link.addEventListener("click", ()=> {
        nav.classList.add("nav-display")
        bodyActiveMenu.hidden = true
    })
}


let index = 0

nextButton.addEventListener("click", ()=> {
    if(index !== imagesProduct.length - 2){
        imagesProduct[index].classList.add("display-none")
        imagesProduct[index].nextElementSibling.classList.remove("display-none")
        ++index  
    }
})

previousButton.addEventListener("click", ()=> {
    if(index > 0){
        imagesProduct[index].classList.add("display-none")
        imagesProduct[index].previousElementSibling.classList.remove("display-none")
        --index  
    }
})

minusButton.addEventListener("click", ()=> {
    if(inputTypeNumber.value == 0){
        inputTypeNumber.value = 0
    }else{
        inputTypeNumber.value--
    }
    if(inputTypeNumber.value < 1){
        numberOfProductsInTheCart.textContent = ""
        numberOfProductsInTheCart.classList.add("display-none")
        cartInformationDescription.classList.add("cart-information-description-hidden")
        cartInformationEmpty.hidden = false
        setTimeout(() => {
            cartInformation.classList.remove("cart-information-container-showing")
        }, 1250);
    }
})


plusButton.addEventListener("click", ()=> {
    if(numberOfProductsInTheCart.textContent == ""){
        cartInformation.classList.remove("cart-information-container-showing")
    }
    inputTypeNumber.value++
})

buttonCart.addEventListener("click", ()=> {
    cartInformation.classList.toggle("cart-information-container-showing")
    if(inputTypeNumber.value == "0" || numberOfProductsInTheCart.classList.contains("display-none")){
        cartInformationDescription.classList.add("cart-information-description-hidden")
        cartInformationEmpty.hidden = false
    }else{
        const finalPrice = priceWithDiscount.textContent.substring(1) * inputTypeNumber.value
        productPrice.innerHTML = `${priceWithDiscount.textContent} x <span class="product-amount">${inputTypeNumber.value}</span> <span class="final-price">$${finalPrice}</span>`
        cartInformationDescription.classList.remove("cart-information-description-hidden")
        cartInformationEmpty.hidden = true
    }
})

addToCartButton.addEventListener("click", ()=> {
    if(inputTypeNumber.value == 0){
        numberOfProductsInTheCart.classList.add("display-none")
    }else{
        numberOfProductsInTheCart.classList.remove("display-none")
        numberOfProductsInTheCart.textContent = inputTypeNumber.value
        cartInformationEmpty.hidden = true
        const finalPrice = priceWithDiscount.textContent.substring(1) * inputTypeNumber.value
        productPrice.innerHTML = `${priceWithDiscount.textContent} x <span class="product-amount">${inputTypeNumber.value}</span> <span class="final-price">$${finalPrice}</span>`
        cartInformationDescription.classList.remove("cart-information-description-hidden")
    }
})

const imagesProductThumbnailArray = Array.from(imagesProductThumbnail)
const imagesProductArray = Array.from(imagesProduct)

for (const imgThumbnail of imagesProductThumbnailArray) {
    imgThumbnail.addEventListener("click", function() {
        if(lightbox.classList.contains("lightbox-show")) {
            imgThumbnail.removeEventListener("click", function(){})
        }else{
            imagesProductThumbnailArray.forEach(element => {
                element.classList.remove("currently-showing")
            });
            imgThumbnail.classList.add("currently-showing")
            let indexOfThumbnail = imagesProductThumbnailArray.indexOf(imgThumbnail)//Obtengo el índice de la imagen en miniatura a la que se le dio click
            for(const image of imagesProductArray) {
                image.classList.add("display-none")
            }
            imagesProductArray[indexOfThumbnail].classList.remove("display-none")
        }
    })
}

const lightboxImagesProductArray = Array.from(lightboxImagesProduct)

let indexImage

for(const currentImage of imagesProductArray) {
    currentImage.addEventListener("click", function() {
        if(window.matchMedia("(min-width: 1024px)").matches){
            indexImage = imagesProductArray.indexOf(currentImage)
            for(const lightboxImage of lightboxImagesProductArray) {
                lightboxImage.classList.add("display-none")
            }
            lightboxImagesProductArray[indexImage].classList.remove("display-none")
            lightboxImagesThumbnail[indexImage].classList.add("currently-showing")
            lightbox.classList.add("lightbox-show") 
        }else{
            currentImage.removeEventListener("click", function(){})
        }
    })
}

lightboxCloseButton.addEventListener("click", ()=> {
    lightbox.classList.remove("lightbox-show")
})

lightboxPreviousButton.addEventListener("click", function() {
    if(indexImage < 1) {
        lightboxPreviousButton.removeEventListener("click", function(){})
    }else{
        lightboxImagesProductArray[indexImage].classList.add("display-none")
        lightboxImagesThumbnail[indexImage].classList.remove("currently-showing")
        indexImage--
        lightboxImagesProductArray[indexImage].classList.remove("display-none")
        lightboxImagesThumbnail[indexImage].classList.add("currently-showing")

    }
})

lightboxNextButton.addEventListener("click", function() {
    if(indexImage > 2) {
        lightboxNextButton.removeEventListener("click", function(){})
    }else{
        lightboxImagesProductArray[indexImage].classList.add("display-none")
        lightboxImagesThumbnail[indexImage].classList.remove("currently-showing")
        indexImage++
        lightboxImagesProductArray[indexImage].classList.remove("display-none")
        lightboxImagesThumbnail[indexImage].classList.add("currently-showing")
    }
})