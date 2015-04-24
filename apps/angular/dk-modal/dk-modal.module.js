'use strict';

angular
    .module('dk-modal.module', ['ui.bootstrap', 'dk-modal.directive']);

// potential injectables - '$document', '$compile', '$controller', '$http', '$rootScope',
// '$q', '$templateCache'
// the prior service is geared to render custom templated modals and needs everything
//under the sun to proceed
// dk-modal will implement a simple popup that looks LIKE the modalservice dialogue
