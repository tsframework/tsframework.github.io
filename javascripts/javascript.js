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
    }
    $(window).scroll(fixDiv);
    fixDiv();
})