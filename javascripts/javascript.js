$(function() {
    function getTableOfContent() {
        var $items = $('#main-content > h1');
        $items.each(function() {
            var $h1 = $(this);
            var id = $h1.attr('id');
            var text = $h1.text();

            var ul = $('<ul class="nav sub"></ul>');
            var li = $('<li><a href="#' + id + '">' + text + '</a></li>');

            ul.appendTo(li);
            li.appendTo('#guides');

            var $next = $h1;
            while (true) {
                $next = $next.next();
                var subItem = $next.length == 0 ? null : $next[0];
                if (!subItem || subItem.tagName == 'H1') break;
                if (subItem.tagName != 'H2') continue;

                id = $(subItem).attr('id');
                text = $(subItem).text();
                $('<li><a href="#' + id + '">' + text + '</a></li>').appendTo(ul);
            }
        })
    }

    getTableOfContent();
    $('.guides li:first').addClass('active');

    hljs.configure({
        languages: ['bash', 'html', 'json', 'javascript', 'typescript']
    });
    hljs.initHighlighting();

    $('button').data('toggle', 'dropdown').click(function() {
        if ($(this).parent().hasClass('open'))
            $(this).parent().removeClass('open');
        else
            $(this).parent().addClass('open');
    });

    var topMenu = $("#guides"),
        topMenuHeight = topMenu.outerHeight()+15,
    // All list items
        menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    function fixDiv() {
        var $cache = $('aside > .menu-fixed');
        if ($(window).scrollTop() > 250)
            $cache.css({
                'position': 'fixed',
                'top': '10px'
            });
        else
            $cache.css({
                'position': 'relative',
                'top': 'auto'
            });

        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        // Set/remove active class
        if (menuItems.parent().parent().hasClass("sub")) {
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active")
                .end().filter("[href='#" + id + "']").parent().parent().parent().addClass("active");
        } else {
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    }
    $(window).scroll(fixDiv);
    fixDiv();
})