
    var data1 = [];

    $(document).on("mouseover","a",function(){
     $(this).parent().css("background-size", "auto 110%");
    });

    $(document).on("mouseout","a",function(){
     $(this).parent().css("background-size", "auto 100%");
    });

    $( document ).ready(function() {
        getData();
    });

    $( window ).resize(function() {
        css(data1);
    });
    function getData() {
        $.ajax({
            url: 'https://raw.githubusercontent.com/MiKyung2/REMM2K_project/master/contents.json',
            dataType: "json",
            async:false,
            success:function(data){
                $('#row_template').tmpl(data).appendTo('#content');
                
                 $.each(data, function(key, value) {
                     var $cur_article = $('article').eq(key);
                     $cur_article.find('h1').append(value.title);
                 });
                
                data1 = data;
                css(data);
            },
            method: 'GET'
        });
    }

    function css(data) {
        var win_size = funcThisSize();
        var sum_col = 0;
        
        $.each(data, function(key, value) {
            var $cur_article = $('article').eq(key);

            var size = value.size;
            size = size.split('-');
            
            var col_size;
            
            if ( Number(size[1]) > win_size ) {
                col_size = win_size;
            }else {
                col_size = Number(size[1]);
            }
            
            switch(col_size) {
                case 1:
                    $cur_article.css('width','370px'); 
                    sum_col = sum_col + 1;
                    break;
                case 2:
                    $cur_article.css('width','775px'); 
                    sum_col = sum_col + 2;
                    break;
                case 3:
                    $cur_article.css('width','1180px'); 
                    sum_col = sum_col + 3;
                    break;
            }
            
            if ( sum_col == win_size) {
                $cur_article.css('margin-right','0px');
                sum_col = 0;
            }else if (sum_col > win_size) {
                console.log('err');
                sum_col = 0;
            }else {
                $cur_article.css('margin-right','35px');
            }

            $cur_article.css('background-image','url(".'+value.img+'")');  
        });
    }

    function funcThisSize() {
        var win_width = window.innerWidth;
        if (win_width >= 1200 ) {
            return 3;
        }else if (win_width < 1200 && win_width >= 768) {
            return 2;
        }else {
            return 1;
        }
    }


    