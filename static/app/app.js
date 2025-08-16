const line_Elements = [];
const line_Array = [...document.querySelectorAll('.line')];
// console.log(line_Array);
const specialChars = [...'!@#$%^&()_-+={}[];:<>?/~.,|*qwertyuiopasdfghjklzxcvbnm'.split('')];
// console.log(specialChars);

class Header {
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

    createRdmEffect() {
        for (let i = 0; i < this.originalString.length; i++) {
            this.innerHTML += `<span>${this.originalString[i]}</span>`;
        }
        this.element.innerHTML = this.innerHTML;
        this.spans = [...this.element.querySelectorAll('span')];
    }
    animateEffect() {
        if (this.idx !== this.originalString.length && this.intersecting) {
            this.spans[this.idx].style.opacity = 1;
            this.spans[this.idx].style.transform = `translateX(0)`;
            if (this.frame % 2 == 0 && this.spans[this.idx].innerText !== ' ') {
                this.spans[this.idx].innerText = specialChars[Math.floor(Math.random() * specialChars.length)];
            }
            if (this.frame % 8 == 0 && this.frame !== 0) {
                this.spans[this.idx].innerText = this.originalString[this.idx];
                this.idx++;
            }
            this.frame++;
            requestAnimationFrame(this.animateEffect.bind(this));
        } else {
            console.log('done');
        }
    }
    reset() {
        this.idx = 0;
        this.frame = 0;
        this.intersecting = false;
        this.spans.forEach(span => {
            span.style.opacity = 0;
            span.style.transform = `translateX(-10px)`;
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        line_Array.forEach((header, idx) => {
            line_Elements[idx] = new Header(idx, header)
        })
        let options = {
            rootMargin: '0px',
            threshold: 0.0
        }
        let callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    line_Elements[+entry.target.className].intersecting = true;
                    line_Elements[+entry.target.className].animateEffect();
                } else {
                    line_Elements[+entry.target.className].reset();
                }
            })
        }
        let observer = new IntersectionObserver(callback, options);
        line_Elements.forEach(instance => {
            observer.observe(instance.element);
            instance.element.style.opacity = 1;
        })
    })
})



