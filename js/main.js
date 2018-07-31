jQuery(document).ready(function($) {
    $('.loop').owlCarousel({
        loop: true,
        margin: 25,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:3,
                loop: false
            },
            1024:{
                items:5
            }
        }
    });

    new Sticky(document.querySelector('.contents .iphone'), document.querySelector('.contents'))
});

(function() {

    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;
    function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();

                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    }

    function actualResizeHandler() {
        new Sticky(document.querySelector('.contents .iphone'), document.querySelector('.contents'))
    }

}());

    function Sticky(sticked, conteiner) {
        'use strict';

        let styles = sticked.style,
            contentCords = getCoords(conteiner),
            sectionDimensions = conteiner.querySelector('.content').getBoundingClientRect(),
            stickedDimensions =  sticked.getBoundingClientRect(),
            stickyStart = contentCords.top + sectionDimensions.height/2 - stickedDimensions.height/2, //кординаты начала скролла телефона
            stickedStart = sectionDimensions.height/2 - stickedDimensions.height/2,
            stopSticky = contentCords.top + conteiner.getBoundingClientRect().height - sectionDimensions.height/2 -stickedDimensions.height/2, //кординаты конца фиксации телефона
            contents = conteiner.querySelectorAll('.content'),
            slideBreackpoint = [];


        window.onscroll = function () {
            if(window.pageYOffset + sectionDimensions.height/2 - stickedDimensions.height/2 > stickyStart &&  window.pageYOffset + sectionDimensions.height/2 - stickedDimensions.height/2 < stopSticky){
                scrolling();
            }else if (window.pageYOffset + sectionDimensions.height/2 - stickedDimensions.height/2 >= stopSticky){
                stopScrolling();
            }else{
                beforeScroll();
            }
            slideBreackpoint.forEach(function (t, number, ts) {
                if(window.pageYOffset >= t && window.pageYOffset <= ts[number+1]){
                    document.querySelector('.iphone__slide__w').style.marginTop = (-stickedDimensions.height * (number+1)) +'px';
                }else if(window.pageYOffset <= ts[0]){
                    document.querySelector('.iphone__slide__w').style.marginTop = 0;
                }
            });

        }

        function scrolling() {
            styles.left = getCoords(sticked).left+'px';
            styles.position = 'fixed';
            styles.top = stickedStart+'px';
            styles.bottom = 'auto';
        }

        function stopScrolling() {
            styles.position = '';
            styles.top = 'auto';
            styles.bottom =  sectionDimensions.height/2 - stickedDimensions.height/2+'px';
            styles.left = '';
        }

        function beforeScroll() {
            styles.position = '';
            styles.top = stickedStart + 'px';
            styles.left = '';
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }



        contents.forEach(function callback(currentValue, index, array) {
            slideBreackpoint.push(stickyStart + (sectionDimensions.height * index))
        });
    }

