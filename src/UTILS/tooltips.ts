import '../ASSETS/js/materialize.js';

export const elems = document.querySelectorAll('.tooltipped');
export const instances = M.Tooltip.init(elems, {
    outDuration: 0
});