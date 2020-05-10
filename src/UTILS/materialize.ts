import '../ASSETS/js/materialize.js';

export const tooltipElems = document.querySelectorAll('.tooltipped');
export const tooltipInstances = M.Tooltip.init(tooltipElems, {
    outDuration: 0
});

export const sidenavElems = document.querySelectorAll('.sidenav');
export const sidenavInstances = M.Sidenav.init(sidenavElems);