/**
 * Recursos cargados en runtime - no exponer en HTML
 */
(function() {
    'use strict';
    var _ = function(s) {
        try {
            return typeof atob === 'function' ? atob(s) : s;
        } catch (e) {
            return s;
        }
    };
    var R = {
        a: _('aHR0cHM6Ly93YS5tZS81Mjc0NDQ4NTMwMzM/dGV4dD1Ib2xhLCUyMHF1aWVybyUyMGluZm9ybWFjaSVDMyVCM24lMjBzb2JyZSUyMHVuJTIwcHJvdG9jb2xvJTIwcGVyc29uYWxpemFkbw=='),
        b: _('aHR0cHM6Ly93YS5tZS81Mjc0NDM1MTQxNDk/dGV4dD1Ib2xhLCUyMHF1aWVybyUyMGluZm9ybWFjaSVDMyVCM24lMjBzb2JyZSUyMHVuJTIwcHJvdG9jb2xvJTIwcGVyc29uYWxpemFkbw=='),
        i1: _('aW1nLzFGLnBuZw=='),
        i2: _('aW1nLzJGLnBuZw=='),
        i3: _('aW1nLzNGLnBuZw=='),
        i4: _('aW1nLzRGLnBuZw=='),
        i5: _('aW1nLzVGLnBuZw=='),
        i6: _('aW1nLzZGLnBuZw=='),
        ib: _('aW1nL0JyYW5kLnBuZw=='),
        ic: _('aW1nL2NlbHVsYXMucG5n'),
        ix: _('aW1nL2NlbHVsYS5wbmc='),
        ip: _('aW1nL3BsYW5faW50ZWdyYWwucG5n'),
        iv: _('aW1nL2NhcmQtY2Fyb3VzZWwucG5n'),
        iv_en: _('img/card-carouselEN.png'),
        iu: _('aW1nL3ZpcnVzLnBuZw=='),
        im: _('aW1nL21hcGEucG5n'),
        id: _('aW1nL2RvY3Rvci5wbmc='),
        id_en: _('img/doctorEN.png'),
        il: _('aW1nL2xvZ28tZm90ZXIucG5n'),
        it: _('aW1nL3Rlc3RpbW9uaW8ubXA0'),
        ifb: _('aW1nL2ZiLnBuZw=='),
        iig: _('aW1nL2lnLnBuZw=='),
        iin: _('aW1nL2luLnBuZw=='),
        iwa: _('aW1nL3dhLnBuZw=='),
        s1: _('aW1nLzAxLnBuZw=='),
        s2: _('aW1nLzAyLnBuZw=='),
        s3: _('aW1nLzAzLnBuZw=='),
        s4: _('aW1nLzA0LnBuZw=='),
        s5: _('aW1nLzA1LnBuZw=='),
        s6: _('aW1nLzA2LnBuZw=='),
        s1_en: _('img/01EN.png'),
        s2_en: _('img/02EN.png'),
        s3_en: _('img/03EN.png'),
        s4_en: _('img/04EN.png'),
        s5_en: _('img/05EN.png'),
        s6_en: _('img/06EN.png'),
        fw: _('NTI3NDQzNTE0MTQ5')
    };
    window.__rs = function(k) { return R[k] || ''; };
})();
