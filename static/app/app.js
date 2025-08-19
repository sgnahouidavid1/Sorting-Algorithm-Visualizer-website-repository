const line_Elements = [];
const line_Array = [...document.querySelectorAll('.line')]; // This selects all elements with the class 'line' and stores them in an array
// console.log(line_Array);
const specialChars = [...'qertyuiopasdfghjklzxcvbnQERTYUIOPASF'.split('')]; // This selects all characters from the specified string and stores them in an array
// console.log(specialChars);

class Header { // This class handles the text animation for each header line
    constructor(id, element) {
        this.id = id;
        this.frame = 0;
        this.idx = 0;
        this.element = element;
        this.element.className = `${id}`;
        this.originalString = element.innerText;
        this.innerHTML = '';
        this.intersecting = false;
        this.createRdmEffect();
    }

    createRdmEffect() { // This function creates the random text effect
        for (let i = 0; i < this.originalString.length; i++) {
            this.innerHTML += `<span>${this.originalString[i]}</span>`;
        }
        this.element.innerHTML = this.innerHTML;
        this.spans = [...this.element.querySelectorAll('span')];
    }
    animateEffect() { // This function animates the random text effect
        if (this.idx !== this.originalString.length && this.intersecting) {
            this.spans[this.idx].style.opacity = 1;
            this.spans[this.idx].style.transform = `translateX(0)`;
            if (this.frame % 1 == 0 && this.spans[this.idx].innerText !== ' ') {
                this.spans[this.idx].innerText = specialChars[Math.floor(Math.random() * specialChars.length)];
            }
            if (this.frame % 4 == 0 && this.frame !== 0) {
                this.spans[this.idx].innerText = this.originalString[this.idx];
                this.idx++;
            }
            this.frame++;
            requestAnimationFrame(this.animateEffect.bind(this));
        } else {
            console.log('done');
        }
    }
    reset() { // This function resets the animation
        this.idx = 0;
        this.frame = 0;
        this.intersecting = false;
        this.spans.forEach(span => { // Reset the animation for each span
            span.style.opacity = 0;
            span.style.transform = `translateX(-10px)`;
        })
    }
}
// Initialize the header animations
window.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to be fully loaded
    setTimeout(() => {  // Wait for the text to load
        line_Array.forEach((header, idx) => {
            line_Elements[idx] = new Header(idx, header)
        })
        let options = {
            rootMargin: '0px',
            threshold: 0.0
        }
        let callback = (entries) => {   // This function is called when the observed elements intersect with the viewport
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    line_Elements[+entry.target.className].intersecting = true;
                    line_Elements[+entry.target.className].animateEffect();
                } else {
                    line_Elements[+entry.target.className].reset();
                }
            })
        }
        let observer = new IntersectionObserver(callback, options); // Create an IntersectionObserver to observe the header elements
        line_Elements.forEach(instance => { // Observe each header element
            observer.observe(instance.element);
            instance.element.style.opacity = 1;
        })
    })
})

/* Hamburger rotation javascript code */
const hamBtn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');
const footer = document.getElementById('footer');
function nav_menuToggle() {
    hamBtn.classList.toggle('open');

    if (nav.classList.contains("hidden")) {
        nav.classList.remove("hidden");
        nav.classList.add("visable");
        footer.style.justifyContent = `start`;
    } else {
        nav.classList.add("hidden");
        nav.classList.remove("visable");
        footer.style.justifyContent = `center`;
    }
}
hamBtn.addEventListener('click', nav_menuToggle);

const sortBtn = document.getElementById('sort-btn');
function sort_Toggle() {
    hamBtn.classList.toggle('open');

    if (nav.classList.contains("hidden")) {
        nav.classList.remove("hidden");
        nav.classList.add("visable");
        footer.style.justifyContent = `start`;
    } else {
        nav.classList.add("hidden");
        nav.classList.remove("visable");
        footer.style.justifyContent = `center`;
    }
}

sortBtn.addEventListener('click', sort_Toggle);
