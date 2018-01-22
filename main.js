
    var data = [];
    var url = [];
    

    $( document ).ready(function() {
        
        
        getData();
 
    });

    
    function getData() {
        var win_size = funcThisSize();
        var sum_col = 0;
        
        $.ajax({
            url: 'https://raw.githubusercontent.com/MiKyung2/REMM2K_project/master/contents.json',
            dataType: "json",
            success:function(data){
                $('#row_template').tmpl(data).appendTo('#content');
                
                $.each(data, function(key, value) {
                    
                    var $cur_article = $('article').eq(key);
                    
                    switch(value.size) {
                        case 'col-01':
                            $cur_article.css('width','370px'); 
                            sum_col = sum_col + 1;
                            break;
                        case 'col-02':
                            $cur_article.css('width','775px'); 
                            sum_col = sum_col + 2;
                            break;
                        case 'col-03':
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
                        console.log(sum_col);
                    }
                    
                    $cur_article.css('background-image','url(".'+value.img+'")');  
                });
                 
            },
            method: 'GET'
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
    