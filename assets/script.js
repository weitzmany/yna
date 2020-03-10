var data = [
                {"name": "Cheerios", "checked": true, "details": {"quantity": 1,"price": 13, "description": "Cheerios"}},
                {"name": "Bread", "checked": false, "details": {"quantity": 3,"price": 11.1, "description": "Bread"}},
                {"name": "Milk", "checked": false, "details": {"quantity": 2,"price": 5.9, "description": "milk"}}
            ];

$(function(){
    
    //init list
    $(data).each(function(i,e){
        add_item(e);
    });  
    
    // add item
    $('.add_item input').keyup(function(e){
        if(e.keyCode == 13){
            var name = $(this).val();
            var item = {
                "name": name, 
                "checked": false, 
                "details": {
                    "quantity": 0,
                    "price": 0, 
                    "description": ""
                }
            }
            add_item(item);
            e.target.value = '';
        }
    });

    $(document).on('click','.item input',function(e){
        $(this).closest('.item').toggleClass('checked');
    });

    $(document).on('click','.item',function(e){
        if(!$(e.target).hasClass('checkbox')){
            $('.item_name').text($(this).data('name'));
            $('#quantity').val($(this).data('details').quantity);
            $('#price').val($(this).data('details').price);
            $('#description').val($(this).data('details').description);
            $('#details').show();
            $(this).find('span').hide();
            $(this).find('.edit').show().focus();
        }
    });

    $(document).on('click',function(e){
        if(!e.target.closest('.item') && !e.target.closest('#details')){
            $('#details').hide();
        }
    });

    $(document).on('keyup','.edit',function(e){
        var name = $(this).val();
        if(e.keyCode == 13){
            $(this).blur();
        }else{
            $(this).siblings('span').text(name);
            $('.item_name').text(name);
        }
    });

    $(document).on('blur','.edit',function(e){
        $(this).hide();
        $(this).siblings('span').show();
    });

});

function add_item(obj){
    let item = $($('#item').clone().html());
    item.find('.name').text(obj.name);
    item.find('.edit').val(obj.name);
    if(obj.checked){
        item.find('input').attr('checked','checked');
        item.addClass('checked');
    }
    item.appendTo('#items');
    item.data(obj);
}