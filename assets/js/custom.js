"use strict";
var _a;
const toggler = document.getElementsByClassName("caret");
for (let i = 0; i < toggler.length; i++) {
    (_a = toggler[i]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        this.parentElement.querySelector(".theme-category-nested").classList.toggle("theme-category-active");
        this.classList.toggle("caret-down");
    });
}
