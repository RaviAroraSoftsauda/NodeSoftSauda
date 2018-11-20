var glbidx ;
var lstidx ;
$(document).ready(function() {
    $('table.display').DataTable();
} );
$( function() {
    $( "#ratechangedate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: new Date,
        minDate: new Date(2000, 6, 12)
    });

    $( "#offerstartdate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        // minDate: new Date
    });

    $( "#offerenddate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        // minDate: new Date
    });

    $( "#filterstartdate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $( "#filterenddate" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    // $( "#date" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: 'dd/mm/yy'
    // });

    $('#offerstarttime').timepicker({ 'timeFormat': 'h:i A' });
    $('#offerendtime').timepicker({ 'timeFormat': 'h:i A' });
});
$(document).ready(function()
{
    $(".datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
});

$(document).ready(function () {
    
    var table;
    table = jQuery('.product_detail_table').DataTable({
        dom: 'Bfrtip',
        "lengthChange": true,
        buttons: [
            'excel',
            'print',
            'pdf'
        ]
    });
    'use strict';
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return decodeURI(results[1]) || 0;
        }
    }
    function datatablesearch() {
        var whatsSelected = [];
        var filterValue = $("input[name='formfilter']:checked").val();
        //console.log(filterValue);
        if(filterValue != 'all') {
            whatsSelected.push(filterValue);
            table.columns(7).search(whatsSelected.join('|'),true).draw();
        } else {
            $('.product_detail_table').DataTable().destroy();
            table = '';
            table = jQuery('.product_detail_table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'excel',
                    'print',
                    'pdf',
                
                ]
            });
        }
    }
    var para, checkpass;
    para = $.urlParam('success');
    if( para == 1) {
        setTimeout(function(){ window.location.href = '/products/all'; }, 10000);
    }

    checkpass = $.urlParam('pass');
    if( checkpass == 1) {
        setTimeout(function(){ window.location.href = '/settings/passwordsetting'; }, 10000);
    }
    
    $('.repeater').repeater({
        isFirstItemUndeletable: true,
        defaultValues: {
            'textarea-input': 'foo',
            'text-input': 'bar',
            'select-input': 'B',
            'checkbox-input': ['A', 'B'],
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            if(confirm('Are you sure you want to delete this element?')) {
                $(this).slideUp(deleteElement);
            }
        },
        repeaters: [{
            isFirstItemUndeletable: true,
            selector: '.inner-repeater',
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        }],
        ready: function (setIndexes) {
        }
    });
    // var table;
    // table = jQuery('.product_detail_table').DataTable({
    //     dom: 'lrtip',
    //     "lengthChange": false,
    //      initComplete: function () {
    //     }
    //  });

     function datatablesearch() {
        var whatsSelected = [];
        var filterValue = $("input[name='formfilter']:checked").val();
        //console.log(filterValue);
        if(filterValue != 'all') {
            whatsSelected.push(filterValue);
            table.columns(7).search(whatsSelected.join('|'),true).draw();
        } else {
            $('.product_detail_table').DataTable().destroy();
            table = '';
            table = jQuery('.product_detail_table').DataTable({
                dom: 'lrtip',
                "lengthChange": false,
                initComplete: function () {
                }
            });
        }
    }

    $(document).on("click", "input[name='formfilter']", function(){
        datatablesearch();
    });
    ///party
    $(document).on("change", "#city_name", function() {
        $('.loader').show(); 
        var cityid =  $("#city_name option:selected").attr("data-city");
        // alert(districtID); 
        $.ajax({
            type:'GET',
            url: '/party/getcitybyid',
            dataType:'json',
            data:
            {
                id: cityid
            },
            success: function(data) {
                if( data['success'] ) {
                    var statArray = data['state_name'];
                    var i;
                    var result = '<select class="form-control" name="state_name" id="state_name">';
                        result += '<option value="'+statArray._id+'">'+statArray.state_name.state_name+'</option>';
                    result += '</select>';
                    
                    $('.state_name_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#dis_name", function() {
        $('.loader').show(); 
        var districtID =  $("#dis_name option:selected").attr("data-dis_id");
        // alert(districtID); 
        $.ajax({
            type:'GET',
            url: '/add_city/getdistrictbyid',
            dataType:'json',
            data:
            {
                id: districtID
            },
            success: function(data) {
                if( data['success'] ) {
                    var statArray = data['state_name'];
                    var i;
                    var result = '<select class="form-control" name="state_name" id="state_name">';
                        result += '<option value="'+statArray._id+'">'+statArray.state_name+'</option>';
                    result += '</select>';
                    
                    $('.state_name_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#kind", function() {
        // $('.loader').show();
        var partyID =  $("#kind option:selected").attr("data-party_id");
        //  alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var sta = data['party'];
                    var kindArray = data['party']['contact_group'];
                    var  j;
                    if(kindArray!='')
                    {
                        var result='<input class="form-control" name="sl_cont" type="hidden"/>';
                    }
                    else
                    {
                        var result='<input class="form-control" name="sl_cont" type="text"/>'; 
                    }
                    var staton='';
                    for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="sl_cont" value="'+kindArray[0]['contact_no']+'" type="text"/>';
                    }
                    var staton = '<select class="form-control" name="state_name" id="state_name">';
                        staton += '<option value="'+sta.city_name._id+'">'+sta.city_name['city_name']+'</option>';
                        staton += '</select>';
                    // staton += '<input class="form-control" name="from_ct" value="'+sta.city_name['city_name']+'" type="text"/>';
                    // console.log(sta['city_name'])
                    $('.staion_div').html(staton);
                    $('.kind_name_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#sb_code", function() {
        // $('.loader').show();
        var partyID =  $("#sb_code option:selected").attr("data-party_id");
        // alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    var result='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="sb_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    // }
                    
                    $('.sb_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#brcont", function() {
        // $('.loader').show();
        var partyID =  $("#brcont option:selected").attr("data-party_id");
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var sta = data['party'];
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    if(kindArray!='')
                    {
                        var result='<input class="form-control" name="sl_cont" type="hidden"/>';
                    }
                    else
                    {
                        var result='<input class="form-control" name="sl_cont" type="text"/>'; 
                    }
                    var staton='';
                    for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="br_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    }
                    staton += '<select name="to_ct" id="remarks" class="form-control" style="width: 132px;"><></select>';
                    // <input class="form-control" name="from_ct" value="'+sta.city_name['city_name']+'" type="text"/>
                    $('.staion_to').html(staton);
                    $('.br_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#bbcount", function() {
        // $('.loader').show();
        var partyID =  $("#bbcount option:selected").attr("data-party_id");
        // alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    var result='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="bb_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    // }
                    $('.bb_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    ///direct Delivery
    $(document).on("change", "#slcount", function() {
        // $('.loader').show();
        var partyID =  $("#slcount option:selected").attr("data-party_id");
        //  alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var kindArray = data['party']['contact_group'];
                    var  j;
                    var result ='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="sl_cont" value="'+kindArray[0]['contact_no']+'" type="text"/>';
                    // }
                    $('.kind_name_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#sbcount", function() {
        // $('.loader').show();
        var partyID =  $("#sbcount option:selected").attr("data-party_id");
        // alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    var result='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="sb_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    // }
                    
                    $('.sb_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#brcount", function() {
        // $('.loader').show();
        var partyID =  $("#brcount option:selected").attr("data-party_id");
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var sta = data['party'];
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    var result='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="br_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    // }
                    $('.br_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#bbcunt", function() {
        // $('.loader').show();
        var partyID =  $("#bbcunt option:selected").attr("data-party_id");
        // alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/kindname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    var kindArray = data['party']['contact_group'];
                    // alert(kindArray);
                    var  j;
                    var result='';
                    // for(j = 0; j < kindArray.length; j++) {
                        result += '<input class="form-control" name="bb_cont" value="'+kindArray[0]['contact_no']+'" type="text" autocomplete="off"/>';
                    // }
                    $('.bb_cont_div').html(result);
                    $('.loader').hide();
                }
            }
        });
    });
    $(document).on("change", "#inp_code", function() {
        // $('.loader').show();
        var partyID =  $("#inp_code option:selected").attr("data-product_id");
        // alert(partyID); 
        $.ajax({
            type:'GET',
            url: '/contract_sauda/packname',
            dataType:'json',
            data:
            {
                id: partyID
            },
            success: function(data) {
                if( data['success'] ) {
                    // alert(data);
                    var packArray = data['sno'];
                    // alert(packArray);
                    var  p=0;
                    var result='';
                    //  for(p = 0; p < packArray.length; p++) {
                        var packArray = packArray[p]['product_mast_group'];
                        // alert(packArray);
                        //console.log();
                        result += '<td><input class="form-control" name="pck" value="'+packArray[p]['it_pck']+'" id="pck" type="text" autocomplete="off"/></td>';
                        
                    // }
                    $('.pack_name').html(result);
                    $('#pck').css("width","72px");
                    $('.loader').hide();
                }
            }
        });
    });
   
    $(document).on("change", "#productbrand", function(){
        $('.loader').show();
        var productID =  $("#offerproductname option:selected").attr("data-productid");
        var productBrand = $(this).val();
        $.ajax({
            type:'GET',
            url: '/offers/getproductbrandbyid',
            dataType:'json',
            data:
            {
                id: productID
            },
            success: function(data) {
                if( data['success'] ) {
                    var productArray = data['product']['productbrand'];
                    var i, j;
                    var packVariation = '<select class="form-control" name="pack" id="pack">';
                    packVariation += '<option value="all" selected="">All</option>';
                    for (i = 0; i < productArray.length; i++) {
                        if(productArray[i]['productbrand'] == productBrand) {
                            var brandPackVariationArray = productArray[i]['bank_variation'];
                            for(j = 0; j < brandPackVariationArray.length; j++) {
                                //console.log(brandPackVariationArray[j]['packvalue']);
                                packVariation += '<option value="'+brandPackVariationArray[j]['packvalue']+'">'+brandPackVariationArray[j]['packvalue']+'</option>';
                            }
                        }
                    }
                    packVariation += '</select>';
                    $('.product_variation_div').html(packVariation);
                    $('.loader').hide();
                }
            }
        });
    });
    //sauda register
    $(document).on("click", "#filtersubmit", function(){
        $('.loader').show();
        var sl_code = $('#slcode').val();
        var sb_code = $('#sbcode').val();
        var br_code = $('#brcode').val();
        var bb_code = $('#bbcode').val();
        var filterstartdate = $('#filterstartdate').val();
        var filterenddate = $('#filterenddate').val();
        var rdovalue = $("input[name='formfilter']:checked").val();
        $.ajax({
            type: "POST",
			url: '/sauda_register/contractdetail',
			dataType:'json',
            data:
            {
                sl_code:sl_code,
                sb_code:sb_code,
                br_code:br_code,
                bb_code:bb_code,
                filterstartdate:filterstartdate,
                filterenddate:filterenddate,
                rdovalue: rdovalue
            },
            success: function(data) {
                var i, j, result;
                if( data['success'] == true ) {
                    var contract = data['contract'];
                    for (i = 0; i < contract.length; i++) {
                        var contractdet = contract[i]['sauda2']['contract_sauda_group'];
                            $.each(contractdet, function(index,value){
                                if(sd_date == 'sd_date')
                                {
                                result += '<tr>';
                                result += '<td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['br_code']['party_name']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+contract[i]['sb_code']['party_name']+'</td><td>'+contract[i]['bb_code']['party_name']+'</td>';
                                result += '</tr>';
                                }
                                else if(sb_brok == 'sb_brok')
                                {
                                    result += '<tr>';
                                    result += '<td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['br_code']['party_name']+'</td><td>'+contract[i]['sb_code']['party_name']+'</td>';
                                    result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td><td>'+contract[i]['bb_code']['party_name']+'</td>';
                                    result += '</tr>';
                                }
                                else if(br_brok == 'br_brok')
                                {
                                    result += '<tr>';
                                    result += '<td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td><td>'+contract[i]['sb_code']['party_name']+'</td>';
                                    result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+contract[i]['br_code']['party_name']+'</td><td>'+contract[i]['bb_code']['party_name']+'</td>';
                                    result += '</tr>';
                                }
                                else if(bb_brok == 'bb_brok')
                                {
                                    result += '<tr>';
                                    result += '<td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td><td>'+contract[i]['sb_code']['party_name']+'</td>';
                                    result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+contract[i]['br_code']['party_name']+'</td><td>'+contract[i]['bb_code']['party_name']+'</td>';
                                    result += '</tr>';
                                }
                                else if(sl_brok == 'sl_brok')
                                {
                                    result += '<tr>';
                                    result += '><td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['br_code']['party_name']+'</td><td>'+contract[i]['sb_code']['party_name']+'</td>';
                                    result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td><td>'+contract[i]['bb_code']['party_name']+'</td>';
                                    result += '</tr>';
                                }
                                else if (sl_code == sl_code)
                                {
                                    result += '<tr>';
                                    result += '<td>'+contract[i]['sd_date']+'</td><td>'+contract[i]['vouc_code']+'</td><td>'+contract[i]['sl_code']['party_name']+'</td>';
                                    result += '<td>'+value['p_code']+'</td><td>'+value['brand_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['pck_unit']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['s_rate']+'</td><td>'+value['b_rate']+'</td><td>'+value['w_q']+'</td><td>'+value['wghtunit']+'</td><td>'+value['rateper']+'</td><td>'+value['amount']+'</td><td>'+value['pcktype']+'</td><td>'+value['g_n']+'</td><td>'+value['ipack']+'</td><td>'+value['slbrk_rt']+'</td><td>'+value['slbrk_type']+'</td><td>'+value['slbrk_amt']+'</td><td>'+value['brbrk_rt']+'</td><td>'+value['brbrk_typ']+'</td><td>'+value['brbrk_amt']+'</td><td>'+value['slbrk_rte']+'</td><td>'+value['slbrk_typ']+'</td>';
                                    result += '</tr>';  
                                }
                                });
                        }
                    }
                   
                    $('.contract_detail_body').html(result);
                    $('.loader').hide();
            }
        });
    });
    $(document).on("click", "#sd_date", function() {
        $('#sddate').show();
        $('#brbrok').hide();
        $('#slbrok').hide();
        $('#sauda_main').hide();
    });
    $(document).on("click", "#br_brok", function() {
        $('#brbrok').show();
        $('#sddate').hide();
        $('#slbrok').hide();
        $('#sauda_main').hide();
    });
    $(document).on("click", "#sl_brok", function() {
        $('#brbrok').hide();
        $('#sddate').hide();
        $('#slbrok').show();
        $('#sauda_main').hide();
    });
    $(document).on("click", "#sb_brok", function() {
        $('#brbrok').hide();
        $('#sddate').hide();
        $('#slbrok').show();
        $('#sauda_main').hide();
    });
    $(document).on("click", "#bb_brok", function() {
        $('#brbrok').show();
        $('#sddate').hide();
        $('#slbrok').hide();
        $('#sauda_main').hide();
    });
    
 //delivery register
 $(document).on("click", "#deliveryfiltersubmit", function(){
    $('.loader').show();
    var sl_code = $('#slcode').val();
    var sb_code = $('#sbcode').val();
    var br_code = $('#brcode').val();
    var bb_code = $('#bbcode').val();
    var sl_brok = $("input[name='formfilter']:checked").val();
    var sd_date = $("input[name='formfilter']:checked").val();
    var sb_brok = $("input[name='formfilter']:checked").val();
    var br_brok = $("input[name='formfilter']:checked").val();
    var bb_brok = $("input[name='formfilter']:checked").val();
    $.ajax({
        type: "POST",
        url: '/delivery_register/deleverydetail',
        dataType:'json',
        data:
        {
                sl_code:sl_code,
                sb_code:sb_code,
                br_code:br_code,
                bb_code:bb_code,
                sd_date: sd_date,
                sl_brok: sl_brok,
                sb_brok: sb_brok,
                br_brok: br_brok,
                bb_brok: bb_brok
        },
        success: function(data) {
            var i, j, result;
            if( data['success'] == true ) {
                var delveryentry1 = data['delveryentry1'];
                //console.log(sl_code);
                //console.log(br_code);
                //console.log(delveryentry1);
                for (i = 0; i < delveryentry1.length; i++) {
                    var delveryentry1det = delveryentry1[i]['sauda2']['contract_sauda_group'];
                    
                        $.each(delveryentry1det, function(index,value){
                            if(sd_date == 'sd_date')
                            {
                               result += '<tr>';
                               result += '<td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['br_code']['party_name']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td>';
                               result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+delveryentry1[i]['sb_code']['party_name']+'</td><td>'+delveryentry1[i]['bb_code']['party_name']+'</td>';
                               result += '</tr>';
                            }
                            else if(sb_brok == 'sb_brok')
                            {
                                result += '<tr>';
                                result += '<td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['br_code']['party_name']+'</td><td>'+delveryentry1[i]['sb_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td><td>'+delveryentry1[i]['bb_code']['party_name']+'</td>';
                                result += '</tr>';
                            }
                            else if(br_brok == 'br_brok')
                            {
                                result += '<tr>';
                                result += '<td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td><td>'+delveryentry1[i]['sb_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+delveryentry1[i]['br_code']['party_name']+'</td><td>'+delveryentry1[i]['bb_code']['party_name']+'</td>';
                                result += '</tr>';
                            }
                            else if(bb_brok == 'bb_brok')
                            {
                                result += '<tr>';
                                result += '<td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td><td>'+delveryentry1[i]['sb_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+delveryentry1[i]['br_code']['party_name']+'</td><td>'+delveryentry1[i]['bb_code']['party_name']+'</td>';
                                result += '</tr>';
                            }
                            else if(sl_brok == 'sl_brok')
                            {
                                result += '<tr>';
                                result += '><td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['br_code']['party_name']+'</td><td>'+delveryentry1[i]['sb_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['amount']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td><td>'+delveryentry1[i]['bb_code']['party_name']+'</td>';
                                result += '</tr>';
                            }
                            else if (sl_code == sl_code)
                            {
                                result += '<tr>';
                                result += '<td>'+delveryentry1[i]['sd_date']+'</td><td>'+delveryentry1[i]['vouc_code']+'</td><td>'+delveryentry1[i]['sl_code']['party_name']+'</td>';
                                result += '<td>'+value['p_code']+'</td><td>'+value['brand_code']+'</td><td>'+value['bag']+'</td><td>'+value['pck']+'</td><td>'+value['pck_unit']+'</td><td>'+value['wght']+'</td><td>'+value['sd_rate']+'</td><td>'+value['s_rate']+'</td><td>'+value['b_rate']+'</td><td>'+value['w_q']+'</td><td>'+value['wghtunit']+'</td><td>'+value['rateper']+'</td><td>'+value['amount']+'</td><td>'+value['pcktype']+'</td><td>'+value['g_n']+'</td><td>'+value['ipack']+'</td><td>'+value['slbrk_rt']+'</td><td>'+value['slbrk_type']+'</td><td>'+value['slbrk_amt']+'</td><td>'+value['brbrk_rt']+'</td><td>'+value['brbrk_typ']+'</td><td>'+value['brbrk_amt']+'</td><td>'+value['slbrk_rte']+'</td><td>'+value['slbrk_typ']+'</td>';
                                result += '</tr>';  
                            }
                            });
                    }
                }
                $('.delivery_detail_body').html(result);
                $('.loader').hide();
        }
    });
});
// $(document).on("click", "#slcode", function() {
//     $('#myModal').modal('show');
// });
// success : function (a){
//     $('#result').html(a);
//     $('#myModal').modal('show');
// }
    //product_mast_group
    $(document).on("click", ".outer-add-btn", function() {
        var parent_id = $('.inner-add-btn:last').prop('id');
        var main_loop_id  = 0;
        $( ".product_variation_wrapper").each(function( i, val ) {
            main_loop_id++;
        });
        var product_mast = '<div class="product_variation_wrapper" id="product_variation_wrapper-'+main_loop_id+'"><div class="row pp"><div class="product_variation_wrapper" id="variation-row-'+main_loop_id+'"><div class="col-md-1 brand_pack_value"><input name="product_mast_group['+main_loop_id+'][it_pck]" value="" placeholder="Packing" type="text" class="form-control it_pck"></div><div class="col-md-1 brand_pack_value"><select name="product_mast_group['+main_loop_id+'][it_bk]" class="form-control it_bk"><option value="katta">Katta</option><option value="bori">Bori</option><option value="box">Box</option></select></div><div class="col-md-1"><input name="product_mast_group['+main_loop_id+'][it_ratesl]" class="form-control it_ratesl"  placeholder="Brokerage Rate(Seller)" type="text"></div><div class="col-md-1"><select name="product_mast_group['+main_loop_id+'][it_ratetypsl]" class="form-control it_ratetypsl"><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></div><div class="col-md-1"><input class="form-control it_ratebr"  name="product_mast_group['+main_loop_id+'][it_ratebr]" placeholder="Brokerage Rate (Buyer)" type="text"></div><div class="col-md-1"><select name="product_mast_group['+main_loop_id+'][it_ratetypbr]" class="form-control it_ratetypbr"><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></div><input data-repeater-delete="inner-field-'+main_loop_id+'" data-brand-index="'+main_loop_id+'" type="button" value="X"  class="inner-delete-btn btn btn-danger del"></div></div>';
        
        $(".product_brand_variaton").append(product_mast);
        $(".pp").css("margin-right","-638px");
        $(".pp").css("margin-bottom","10px");
    });
    
    $(document).on("click", ".outer-delete-btn", function(){
        alert('Product Deleted Successfully');
        var brandIndex = $(this).attr('data-repeater-delete');
        var parent_id = $(this).closest('.product_variation_wrapper').prop('id');
        $("#"+parent_id).remove();
        $('#inner-btn-'+brandIndex).remove();
    });
    $(document).on("click", ".inner-delete-btn", function(){
        var parent_id = $(this).closest('.product_variation_wrapper').prop('id');
        $("#"+parent_id).remove();
    });;
///product_mast_end
//contact
$(document).on("click", ".contact-add-btn", function() {
    var parent_id = $('.inner-add-btn:last').prop('id');
    var main_loop_id  = 100;
    $( ".contact_variation_wrapper").each(function( i, val ) {
        main_loop_id++;
    });
    var contact_group = '<div class="contact_variation_wrapper" id="contact_variation_wrapper-'+main_loop_id+'"><div class="row cc"><div class="input-group-col col-sm-3"><input class="form-control" name="contact_group['+main_loop_id+'][contact_no]" placeholder="Contact" type="text" autocomplete="off"/></div><div class="input-group-col col-sm-3"> <input class="form-control" type="mobile_no" placeholder="Mobile" name="contact_group['+main_loop_id+'][mobile_no]"/></div><div class="input-group-col col-sm-3"><input class="form-control" type="email" placeholder="Email" name="contact_group['+main_loop_id+'][email_id]"/></div> <div class="input-group-col col-sm-3"> <select name="contact_group['+main_loop_id+'][document]" id="document" class="form-control"> <option value="">Select Document</option><option value="All">All</option><option value="Contract From">Contract From</option><option value="Delivery Entry">Delivery Entry</option><option value="Payment Entry">Payment Entry</option><option value="Cash/Bank Book">Cash/Bank Book</option><option value="Journal Entry">Journal Entry</option></select></div><input data-repeater-delete="inner-field-'+main_loop_id+'" data-brand-index="'+main_loop_id+'" type="button" value="X"  class="contact-delete-btn btn btn-danger del"></div>';
    
    $(".contact_row").append(contact_group);
    $(".del").css("float","right");
    $(".del").css("margin-right","-98px");
    $(".del").css("margin-top","2px");
    $(".cc").css("width"," 832px");
    $(".cc").css("margin-left"," -17px");
});
$(document).on("click", ".contact-delete-btn", function(){
    var parent_id = $(this).closest('.contact_variation_wrapper').prop('id');
    $("#"+parent_id).remove();
});

$(document).on("click", ".contact_delete_btn", function(){
    alert('Contact Group Deleted Successfully');
    var brandIndex = $(this).attr('data-brand-index');
    var parent_id = $(this).closest('.contact_variation_row-'+brandIndex).prop('id');
    $("#"+parent_id).remove();
});
    $(document).on('click', '.delete-broker', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
        type:'DELETE',
        url: '/brokers/'+id,
        success: function(response) {
            alert('Deleting Broker');
            $('.loader').hide();
            window.location.href='/brokers/all';
        },
        error: function(err){
            console.log(err);
        }
        });
    });

    $(document).on('click', '.delete-product', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
        type:'DELETE',
        url: '/products/'+id,
        success: function(response){
            $('.loader').hide();
            alert('Product Deleted Successfully');
            window.location.href='/products/all';
        },
        error: function(err){
            console.log(err);
        }
        });
    });

    $(document).on('click', '.delete-orders', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
        type:'DELETE',
        url: '/orders/'+id,
        success: function(response){
            alert('Deleting Order');
            $('.loader').hide();
            window.location.href='/orders/all';
        },
        error: function(err){
            console.log(err);
        }
        });
    });

    $(document).on('click', '.delete-offers', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
        type:'DELETE',
        url: '/offers/'+id,
        success: function(response){
            alert('Deleting Offer');
            $('.loader').hide();
            window.location.href='/offers/all';
        },
        error: function(err){
            console.log(err);
        }
        });
    });

    $(document).on('click', '.delete-brand', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/brands/'+id,
            success: function(response) {
                alert('Deleting Brand');
                $('.loader').hide();
                window.location.href='/brands/all';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $(document).on('click', '.product_name_change', function(){
        $('.offer_product_name').hide();
        $('#offerproductname').show();
    });

    

    $("#addbrandform").on( "submit", function() {
        var brandTitle = $.trim($('.brandtitle').val());
        var brandDescription = $.trim($('.branddescripiton').val());
        if(brandTitle== '') {
            $('.brandtitle').next().show();
            
        }else{
            $('.brandtitle').next().hide();
        }

        if(brandDescription== '') {
            $('.branddescripiton').next().show();
            
        }else{
            $('.branddescripiton').next().hide();
        }

        if(brandTitle == '' || brandDescription == ''){
            return false;
        }
    });

});

    $("#addstate").on( "submit", function() {
        var stateName = $.trim($('.state_name').val());
        var state_code = $.trim($('.state_code').val());
        var state_capital = $.trim($('.state_capital').val());
        // alert(stateName);
       if(stateName== '') {
            
            $('.state_name').next().show();
            
        }else{
            $('.state_name').next().hide();
        }
        if(state_code== '') {
            
            $('.state_code').next().show();
            
        }else{
            $('.state_code').next().hide();
        }
        if(state_capital== '') {
            
            $('.state_capital').next().show();
            
        }else{
            $('.state_capital').next().hide();
        }
        if(stateName== '' || state_code== '' || state_capital== ''){
            return false;
        }
    });
    $(document).on('click', '.edit_state_btn', function(){
        var stateid = $(this).attr('data-id');
        $('.loader').show();
        // alert(cityid)
        // alert(brandid);
        $.ajax({
            type:'GET',
            url: '/state_master/'+stateid,
            dataType:'json',
            success: function(response) {
               
                // alert(response);
                if(response['success'] == true) {
                    // //console.log(response);
                    var state_name = response['state_master'].state_name;
                    var stateid = response['state_master']._id;
                    var state_code = response['state_master'].state_code;
                    var state_capital = response['state_master'].state_capital;
                    $('.state_name').val(state_name);
                    $('.state_code').val(state_code);
                    $('.state_capital').val(state_capital);
                    $('#edit_state').show();
                    $('#edit').show();
                    $('#addstate').hide();
                    $('#add').hide();
                    $("#edit_state").attr("action", "/state_master/edit_state/" + stateid);
                } else {
                    $('.branddanger').html(response['message']);
                    $('.branddanger').show();
                    $('.brandsuccess').hide();
                }
                $('.loader').hide();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
    $(document).on('click', '.delete-state', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/state_master/'+id,
            success: function(response) {
                alert('confirm(Are you sure want to delete.)');
                // $('.loader').hide();
                window.location.href='/state_master/state_master';
                $('.loader').hide();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
$("#addcity").on( "submit", function() {
    var state_name = $.trim($('.state_name').val());
    var dis_name = $.trim($('.dis_name').val());
    // alert(stateName);
    if(state_name== '') {
        
        $('.state_name').next().show();
        
    }else{
        $('.state_name').next().hide();
    }
    if(cityName== '') {
        
        $('.city_name').next().show();
        
    }else{
        $('.city_name').next().hide();
    }
    if(dis_name== '') {
        
        $('.dis_name').next().show();
        
    }else{
        $('.dis_name').next().hide();
    }
    if(stateName== '' || cityName== '' || dis_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_city_btn', function(){
    var cityid = $(this).attr('data-id');
    $('.loader').show();
    // alert(cityid)
    // alert(brandid);
    $.ajax({
        type:'GET',
        url: '/add_city/'+cityid,
        dataType:'json',
        success: function(response) {
           
            // alert(response);
            if(response['success'] == true) {
                // //console.log(response);
                var city_name = response['city_master'].city_name;
                var cityid = response['city_master']._id;
                var state_name = response['city_master'].state_name;
                var dis_name = response['city_master'].dis_name;
                var city_code = response['city_master'].city_code;
                var city_std_code = response['city_master'].city_std_code;
                $('.city_name').val(city_name);
                $('.state_name').val(state_name);
                $('.city_code').val(city_code);
                $('.dis_name').val(dis_name);
                $('.city_std_code').val(city_std_code);
                $('#edit_city').show();
                $('#edit').show();
                $('#addcity').hide();
                $('#add').hide();
                $("#edit_city").attr("action", "/add_city/edit_city/" + cityid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-city', function(){
    // $('.loader').show();
    let id = $(this).attr('data-id');
    alert(id);
    $.ajax({
        type:'DELETE',
        url: '/add_city/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/add_city/add_city';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
///district
$("#adddis").on( "submit", function() {
    var stateName = $.trim($('.state_name').val());
    var dis_name = $.trim($('.dis_name').val());
    // alert(stateName);
    if(stateName== '') {
        
        $('.state_name').next().show();
        
    }else{
        $('.state_name').next().hide();
    }
    if(dis_name== '') {
        
        $('.dis_name').next().show();
        
    }else{
        $('.dis_name').next().hide();
    }
    if(stateName== '' || dis_name== '' ){
        return false;
    }
});
$(document).on('click', '.edit_district_btn', function(){
    var districtid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/add_district/'+districtid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var state_id = response['district_master'].state_id;
                var dis_name = response['district_master'].dis_name;
                var districtid = response['district_master']._id;
                $('.state_id').val(state_id);
                $('.dis_name').val(dis_name);
                $('#edit_district').show();
                $('#edit').show();
                $('#adddis').hide();
                $('#add').hide();
                $("#edit_district").attr("action", "/add_district/edit_district/" + districtid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-district', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/add_district/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/add_district/add_district';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//product
$("#addproduct").on( "submit", function() {
    var item_name = $.trim($('.item_name').val());
    // alert(stateName);
    if(item_name== '')
     {
        
        $('.item_name').next().show();
        
    }else
    {
        $('.item_name').next().hide();
    }
    if(item_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_product_btn', function(){
    var productid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/product/'+productid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var item_name = response['product'].item_name;
                var sno = response['product'].sno;
                var productid = response['product']._id;
                $('.sno').val(sno);
                $('.item_name').val(item_name);
                $('#edit').show();
                $('#edit_product').show();
                $('#addproduct').hide();
                $('#add').hide();
                $("#edit_product").attr("action", "/product/edit_product/" + productid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-product', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/product/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/product/product';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//expense
$("#expense").on( "submit", function() {
    var expense_name = $.trim($('.expense_name').val());
    var expense_type = $.trim($('.expense_type').val());
    // alert(stateName);
    if(expense_name== '')
     {
        
        $('.expense_name').next().show();
        
    }else
    {
        $('.expense_name').next().hide();
    }
    if(expense_type== '')
     {
        
        $('.expense_type').next().show();
        
    }else
    {
        $('.expense_type').next().hide();
    }
    if(expense_name== '' || expense_type== ''){
        return false;
    }
});
$(document).on('click', '.edit_expense_btn', function(){
    var expenseid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/expense/'+expenseid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var expense_name = response['expense'].expense_name;
                var sno = response['expense'].sno;
                var expense_type = response['expense'].expense_type;
                var productid = response['expense']._id;
                $('.sno').val(sno);
                $('.expense_name').val(expense_name);
                $('.expense_type').val(expense_type);
                $('#edit_expense').show();
                $('#edit').show();
                $('#expense').hide();
                $('#add').hide();
                $("#edit_expense").attr("action", "/expense/edit_expense/" + productid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-expense', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/expense/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/expense/expense';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//proprietor
$("#proprietor").on( "submit", function() {
    var proprietor_name = $.trim($('.proprietor_name').val());
    // alert(stateName);
    if(proprietor_name== '')
     {
        
        $('.proprietor_name').next().show();
        
    }else
    {
        $('.proprietor_name').next().hide();
    }
    if(proprietor_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_proprietor_btn', function(){
    var proprietorid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/proprietor/'+proprietorid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var proprietor_name = response['proprietor'].proprietor_name;
                var proprietorid = response['proprietor']._id;
                $('.proprietor_name').val(proprietor_name);
                $('#edit_proprietor').show();
                $('#edit').show();
                $('#proprietor').hide();
                $('#add').hide();
                $("#edit_proprietor").attr("action", "/proprietor/edit_proprietor/" + proprietorid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-proprietor', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/proprietor/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/proprietor/proprietor';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
// group
$("#addgroup").on( "submit", function() {
    var group_name = $.trim($('.group_name').val());
    // alert(stateName);
    if(group_name== '')
     {
        
        $('.group_name').next().show();
        
    }else
    {
        $('.group_name').next().hide();
    }
    if(group_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_group_btn', function(){
    var groupid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/group/'+groupid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var group_name = response['group'].group_name;
                var groupid = response['group']._id;
                $('.group_name').val(group_name);
                $('#edit_group').show();
                $('#edit').show();
                $('#addgroup').hide();
                $('#add').hide();
                $("#edit_group").attr("action", "/group/edit_group/" + groupid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-group', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/group/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/group/group';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//bank
$("#bank").on( "submit", function() {
    var bank_name = $.trim($('.bank_name').val());
    // alert(stateName);
    if(bank_name== '')
     {
        
        $('.bank_name').next().show();
        
    }else
    {
        $('.bank_name').next().hide();
    }
    if(bank_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_bank_btn', function(){
    var bankid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/bank/'+bankid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                // //console.log(response);
                var bank_name = response['bank'].bank_name;
                var bankid = response['bank']._id;
                $('.bank_name').val(bank_name);
                $('#edit_bank').show();
                $('#edit').show();
                $('#bank').hide();
                $('#add').hide();
                $("#edit_bank").attr("action", "/bank/edit_bank/" + bankid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-bank', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/bank/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/bank/bank';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//brand
$("#brand").on( "submit", function() {
    var brand_name = $.trim($('.brand_name').val());
    // alert(stateName);
    if(brand_name== '')
     {
        
        $('.brand_name').next().show();
        
    }else
    {
        $('.brand_name').next().hide();
    }
    if(brand_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_brand_btn', function(){
    var brandid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/brand/'+brandid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var brand_name = response['brand'].brand_name;
                var brandid = response['brand']._id;
                $('.brand_name').val(brand_name);
                $('#edit_brand').show();
                $('#edit').show();
                $('#brand').hide();
                $('#add').hide();
                $("#edit_brand").attr("action", "/brand/edit_brand/" + brandid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-brand', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/brand/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/brand/brand';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//courier
$("#courier").on( "submit", function() {
    var courier_name = $.trim($('.courier_name').val());
    // alert(stateName);
    if(courier_name== '')
     {
        
        $('.courier_name').next().show();
        
    }else
    {
        $('.courier_name').next().hide();
    }
    if(courier_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_courie_btn', function(){
    var courierid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/courier/'+courierid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var courier_name = response['courier'].courier_name;
                var courierid = response['courier']._id;
                $('.courier_name').val(courier_name);
                $('#edit_courier').show();
                $('#edit').show();
                $('#courier').hide();
                $('#add').hide();
                $("#edit_courier").attr("action", "/courier/edit_courier/" + courierid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-courie', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/courier/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/courier/courier';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//Transport
$("#transport").on( "submit", function() {
    var transport_name = $.trim($('.transport_name').val());
    // alert(stateName);
    if(transport_name== '')
     {
        
        $('.transport_name').next().show();
        
    }else
    {
        $('.transport_name').next().hide();
    }
    if(transport_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_transport_btn', function(){
    var transportid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/transport/'+transportid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var transport_name = response['transport'].transport_name;
                var transportid = response['transport']._id;
                $('.transport_name').val(transport_name);
                $('#edit_transport').show();
                $('#edit').show();
                $('#transport').hide();
                $('#add').hide();
                $("#edit_transport").attr("action", "/transport/edit_transport/" + transportid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-transport', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/transport/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/transport/transport';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//term
$("#term").on( "submit", function() {
    var term_name = $.trim($('.term_name').val());
    // alert(stateName);
    if(term_name== '')
     {
        
        $('.term_name').next().show();
        
    }else
    {
        $('.term_name').next().hide();
    }
    if(term_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_term_btn', function(){
    var termid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/term/'+termid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var term_name = response['term'].term_name;
                var termid = response['term']._id;
                $('.term_name').val(term_name);
                $('#edit_term').show();
                $('#edit').show();
                $('#term').hide();
                $('#add').hide();
                $("#edit_term").attr("action", "/term/edit_term/" + termid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-term', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/term/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/term/term';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//narration
$("#narration").on( "submit", function() {
    var narration_name = $.trim($('.narration_name').val());
    var type = $.trim($('.type').val());
    // alert(stateName);
    if(narration_name== '' || type== '')
     {
        
        $('.narration_name').next().show();
        $('.type').next().show();
        
    }else
    {
        $('.narration_name').next().hide();
        $('.type').next().hide();
    }
    if(narration_name== '' || type== ''){
        return false;
    }
});
$(document).on('click', '.edit_narration_btn', function(){
    var narrationid = $(this).attr('data-id');
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/narration/'+narrationid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var narration_name = response['narration'].narration_name;
                var narrationid = response['narration']._id;
                var type = response['narration'].type;
                $('.narration_name').val(narration_name);
                $('.type').val(type);
                $('#edit_narration').show();
                $('#edit').show();
                $('#narration').hide();
                $('#add').hide();
                $("#edit_narration").attr("action", "/narration/edit_narration/" + narrationid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-narration', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/narration/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/narration/narration';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//party
$("#party").on( "submit", function() {
    var party_name = $.trim($('.party_name').val());
    var city_name = $.trim($('.city_name').val());
    // alert(stateName);
    if(party_name== '' || city_name== '' )
     {
        
        $('.party_name').next().show();
        $('.city_name').next().show();
        
    }else
    {
        $('.party_name').next().hide();
        $('.city_name').next().hide();
    }
    if(party_name== '' ||  city_name== '') {
        return false;
    }
});

///courier_inword
$("#courier_inword").on( "submit", function() {
    var party_name = $.trim($('.party_name').val());
    // alert(stateName);
    if(party_name== '') {
        
        $('.party_name').next().show();
        
    }else{
        $('.party_name').next().hide();
    }
    if(party_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_courier_inword_btn', function(){
    var courierid = $(this).attr('data-id');
    // $('.loader').show();
    // alert(courierid)
    // alert(brandid);
    $.ajax({
        type:'GET',
        url: '/courier_inword/'+courierid,
        dataType:'json',
        success: function(response) {
           
            // alert(response);
            if(response['success'] == true) {
                // /alert(response);
                var cou_date = response['courier_inword'].cou_date;
                var courierid = response['courier_inword']._id;
                // alert(courierid);
                var party_sno = response['courier_inword'].party_sno;
                var cou_nm = response['courier_inword'].cou_nm;
                var cou_lotno = response['courier_inword'].cou_lotno;
                var cou_product = response['courier_inword'].cou_product;
                var cou_brand = response['courier_inword'].cou_brand;
                var cou_rate = response['courier_inword'].cou_rate;
                var cou_contdition = response['courier_inword'].cou_contdition;
                var cou_rcpt = response['courier_inword'].cou_rcpt;
                var cou_content = response['courier_inword'].cou_content;
                var remarks = response['courier_inword'].remarks;
                var cou_crgs = response['courier_inword'].cou_crgs;
                $('.cou_date').val(cou_date);
                $('.party_sno').val(party_sno);
                $('.cou_nm').val(cou_nm);
                $('.cou_lotno').val(cou_lotno);
                $('.cou_product').val(cou_product);
                $('.cou_brand').val(cou_brand);
                $('.cou_rate').val(cou_rate);
                $('.cou_contdition').val(cou_contdition);
                $('.cou_rcpt').val(cou_rcpt);
                $('.cou_content').val(cou_content);
                $('.remarks').val(remarks);
                $('.cou_crgs').val(cou_crgs);
                $('#edit_courier_inword').show();
                $('#courier_inword').hide();
                $("#edit_courier_inword").attr("action", "/courier_inword/edit_courier_inword/" + courierid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_courier_inword', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/courier_inword/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/courier_inword/courier_inword';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//courier_outword
$("#courier_outword").on( "submit", function() {
    var party_name = $.trim($('.party_name').val());
    // alert(stateName);
    if(party_name== '') {
        
        $('.party_name').next().show();
        
    }else{
        $('.party_name').next().hide();
    }
    if(party_name== ''){
        return false;
    }
});
$(document).on('click', '.edit_courier_outword_btn', function(){
    var courierid = $(this).attr('data-id');
    // $('.loader').show();
    // alert(courierid)
    // alert(brandid);
    $.ajax({
        type:'GET',
        url: '/courier_outword/'+courierid,
        dataType:'json',
        success: function(response) {
           
            // alert(response);
            if(response['success'] == true) {
                // /alert(response);
                var cou_date = response['courier_outword'].cou_date;
                var courierid = response['courier_outword']._id;
                // alert(courierid);
                var party_sno = response['courier_outword'].party_sno;
                var cou_nm = response['courier_outword'].cou_nm;
                var cou_lotno = response['courier_outword'].cou_lotno;
                var cou_product = response['courier_outword'].cou_product;
                var cou_brand = response['courier_outword'].cou_brand;
                var cou_rate = response['courier_outword'].cou_rate;
                var cou_contdition = response['courier_outword'].cou_contdition;
                var cou_rcpt = response['courier_outword'].cou_rcpt;
                var cou_content = response['courier_outword'].cou_content;
                var remarks = response['courier_outword'].remarks;
                var cou_crgs = response['courier_outword'].cou_crgs;
                $('.cou_date').val(cou_date);
                $('.party_sno').val(party_sno);
                $('.cou_nm').val(cou_nm);
                $('.cou_lotno').val(cou_lotno);
                $('.cou_product').val(cou_product);
                $('.cou_brand').val(cou_brand);
                $('.cou_rate').val(cou_rate);
                $('.cou_contdition').val(cou_contdition);
                $('.cou_rcpt').val(cou_rcpt);
                $('.cou_content').val(cou_content);
                $('.remarks').val(remarks);
                $('.cou_crgs').val(cou_crgs);
                $('#edit_courier_outword').show();
                $('#courier_outword').hide();
                $("#edit_courier_outword").attr("action", "/courier_outword/edit_courier_outword/" + courierid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_courier_outword', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/courier_outword/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/courier_outword/courier_outword';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//daily_rates
// $("#daily_rates").on( "submit", function() {
//     var item_name = $.trim($('.item_name').val());
//     var rate_min = $.trim($('.rate_min').val());
//     var rate_max = $.trim($('.rate_max').val());
//     // alert(stateName);
//     if(st_name== '' || item_name== '' || prod_spec== '' || rate_min== '' || rate_max== '' || rate_condtion== '') {
        
//         $('.st_name').next().show();
//         $('.item_name').next().show();
//         $('.prod_spec').next().show();
//         $('.rate_min').next().show();
//         $('.rate_max').next().show();
//         $('.rate_condtion').next().show();
        
//     }else{
//         $('.st_name').next().hide();
//         $('.item_name').next().hide();
//         $('.prod_spec').next().hide();
//         $('.rate_min').next().hide();
//         $('.rate_max').next().hide();
//         $('.rate_condtion').next().hide();
//     }
//     if(st_name== '' || item_name== '' || prod_spec== '' || rate_min== '' || rate_max== '' || rate_condtion== ''){
//         return false;
//     }
// });
$(document).on('click', '.edit_daily_rates_btn', function(){
    var dailyratesid = $(this).attr('data-id');
    // $('.loader').show();
    // alert(courierid)
    // alert(brandid);
    $.ajax({
        type:'GET',
        url: '/daily_rates/'+dailyratesid,
        dataType:'json',
        success: function(response) {
           
            // alert(response);
            if(response['success'] == true) {
                // /alert(response);
                var st_name = response['daily_rates'].st_name;
                var dailyratesid = response['daily_rates']._id;
                var item_name = response['daily_rates'].item_name;
                var prod_spec = response['daily_rates'].prod_spec;
                var rate_min = response['daily_rates'].rate_min;
                var rate_max = response['daily_rates'].rate_max;
                var rate_condtion = response['daily_rates'].rate_condtion;
                $('.st_name').val(st_name);
                $('.item_name').val(item_name);
                $('.prod_spec').val(prod_spec);
                $('.rate_min').val(rate_min);
                $('.rate_max').val(rate_max);
                $('.rate_condtion').val(rate_condtion);
                $('#edit_daily_rates').show();
                $('#daily_rates').hide();
                $("#edit_daily_rates").attr("action", "/daily_rates/edit_daily_rates/" + dailyratesid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_daily_rates', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/daily_rates/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/daily_rates/daily_rates';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//edit_product_mast
$(document).on('click', '.edit_product_mast_btn', function(){
    $('.loader').show();
    var product_mast_id = $(this).attr('data-id');
    // alert(product_mast_id);
   
    $.ajax({
        type:'GET',
        url: '/product_mast/'+product_mast_id,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                // alert(response['success']);
                var p_code = response['product_mast'].p_code;
                var sno = response['product_mast'].sno;
                var product_name = response['product_mast'].product_name;
                var product_mast_id = response['product_mast']._id;
                var short_name = response['product_mast'].short_name;
                var hsn_code = response['product_mast'].hsn_code;
                var item_name = response['product_mast'].item_name;
                var item_unit = response['product_mast'].item_unit;
                
                var product_mast_group = response['product_mast'].product_mast_group;
                var html;
                for (let index = 0; index < product_mast_group.length; index++){
                        var brandvariation = product_mast_group[index];
                        console.log(brandvariation);
                        html = '<div class="product_variation_wrapper" id="product_variation_wrapper-'+index+'">';
                            html += '<div class="row rr"><div class="col-md-1"><input name="product_mast_group['+index+'][it_pck]" class="form-control it_pck" value="'+brandvariation.it_pck+'" placeholder="Packing" type="text"></div><div class="col-md-1 brand_pack_value"><select name="product_mast_group['+index+'][it_bk]" class="form-control it_bk"><option>'+brandvariation.it_bk+'</option> <option value="katta">Katta</option><option value="bori">Bori</option><option value="box">Box</option></select></div><div class="col-md-1"><input name="product_mast_group['+index+'][it_ratesl]" class="form-control it_ratesl" value="'+brandvariation.it_ratesl+'" placeholder="Brokerage Rate(Seller)" type="text"></div><div class="col-md-1 brand_pack_value"><select name="product_mast_group['+index+'][it_ratetypsl]" class="form-control it_ratetypsl"><option>'+brandvariation.it_ratetypsl+'</option><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></div><div class="col-md-1 brand_pack-charges"><input class="form-control it_ratebr"  name="product_mast_group['+index+'][it_ratebr]" value="'+brandvariation.it_ratebr+'" placeholder="Brokerage Rate (Buyer)" type="text"></div><div class="col-md-1 brand_pack_value"><select name="product_mast_group['+index+'][it_ratetypbr]" class="form-control it_ratetypbr"><option>'+brandvariation.it_ratetypsl+'</option><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></div></div>';
                    
                                    html += '<input data-repeater-delete="'+index+'" type="button" value="X" class="outer-delete-btn btn btn-danger del">';
                                
                            html += '</div>';
                            $('.product_brand_variaton').append(html);
                           
                    } 
                //css
                $(".rr").css("margin-right","-648px");
                $(".rr").css("margin-bottom","10px");
                $(".del").css("float","right");
                $(".del").css("margin-top","-48px");
                $(".del").css("margin-right","102px");
                $(".cc").css("margin-top","-45px");
                $(".cc").css("margin-right","52px");
                $(".cc").css("float","right");
                //css end
                $('.p_code').val(p_code);
                $('.sno').val(sno);
                $('.product_name').val(product_name);
                $('.short_name').val(short_name);
                $('.hsn_code').val(hsn_code);
                $('.item_name').val(item_name);
                $('.item_unit').val(item_unit);
                $('#edit').show();
                $('#edit_product_mast').show();
                $('#product_mast').hide();
                $('#show').hide();
                // $('#product_hide').hide();
                $("#edit_product_mast").attr("action", "/product_mast/edit_product_mast/" + product_mast_id);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete_product_mast', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/product_mast/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/product_mast/product_mast';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
////security
$(document).on('click', '.edit_security_btn', function(){
    var securityid = $(this).attr('data-id');
    // alert(securityid);
    $('.loader').show();
    $.ajax({
        type:'GET',
        url: '/security_right/'+securityid,
        dataType:'json',
        success: function(response) {
            if(response['success'] == true) {
                //console.log(response);
                var right_name = response['security'].right_name;
                var right_desc = response['security'].right_desc;
                var sno = response['security'].sno;
                var securityid = response['security']._id;
                $('.sno').val(sno);
                $('.right_name').val(right_name);
                $('.right_desc').val(right_desc);
                $('#edit_security').show();
                $('#security_add').hide();
                $("#edit_security").attr("action", "/security_right/edit_security/" + securityid);
            } else {
                $('.branddanger').html(response['message']);
                $('.branddanger').show();
                $('.brandsuccess').hide();
            }
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on('click', '.delete-security', function(){
    $('.loader').show();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/security_right/'+id,
        success: function(response) {
            alert('confirm(Are you sure want to delete.)');
            // $('.loader').hide();
            window.location.href='/security_right/security_right';
            $('.loader').hide();
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$(document).on("change", "#br_code", function() {
   
    $('.loader').show();
    var br_code =  $("#br_code option:selected").attr("data-party_id");
    $.ajax({
        type:'GET',
        url: '/delivery_entry/saudaname',
        dataType:'json',
        data:
        {
            ID: br_code
        },
        success: function(data) {
            var i, j, result,sau;
            if( data['success'] == true ) {
                var delveryentry1 = data['delveryentry2'];
                console.log(delveryentry1);
                j=0;
                for (i = 0; i < delveryentry1.length; i++) {
                    var delveryentry1det = delveryentry1[i]['contract_sauda_group'];
                        $.each(delveryentry1det, function(index,value){
                        
                            j++;
                            result += '<tr>';
                                   result += '<div id="delivery-'+index+'"><td><input type="text" name="disvouc_code" id="vouc_code'+j+'" value="'+delveryentry1[i]['vouc_code']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="dissd_date" id="sd_date'+j+'" value="'+delveryentry1[i]['sd_date']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="dispsl_code" id="sl_code'+j+'" value="'+delveryentry1[i]['pcode']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="dispsb_code" id="sb_code'+j+'"  value="'+delveryentry1[i]['typ']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="p_code" id="p_code'+j+'" value="'+value['p_code']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="brand_code" id="brand_code'+j+'" value="'+value['brand_code']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="bag" id="bag'+j+'" value="'+value['bag']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="pck" id="pck'+j+'" value="'+value['pck']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="wght" id="wght'+j+'" value="'+value['wght']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="sd_rate" id="sd_rate'+j+'" value="'+value['sd_rate']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="dis_ptch" id="dis_ptch'+j+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="amount" id="amount'+j+'" value="'+value['amount']+'" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="delivery" id="delivery'+j+'" class="form-control" style="width: 72px;"></td><td><input type="text" name="new_bal" id="new_bal'+j+'" value="New Balance" class="form-control" style="width: 72px;" readonly></td><td><input type="text" name="rmv_bal" id="rmv_bal'+j+'" value="Rmv Balance" class="form-control" style="width: 72px;" readonly></td><td><input type="hidden" name="sauda2" id="sauda2'+j+'"  value="'+delveryentry1[i]['_id']+'"></td></div>';
                                   result += '</tr>';
                                   glbidx = j;
                            });
                    }
                    sau = '<input type="button"  value="OK" id="delivery_sauda" class="btn btn-primary" />'; 
                }
               
                $('.delivery_repeat_row').html(result);
                $('.addsauda').html(sau);
                // $(".contract_repeat_row").append(sau);
                $('.loader').hide();
        }
    });
});
$(document).on("click", "#delivery_sauda", function() {
    // alert(glbidx);
    $("#delivery").hide();
    $.ajax({
        type:'GET',
        url: '/delivery_entry/productname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                var product = data['product_mast'];
                var brand = data['brand'];
                var main_loop_id = 0;
                var result;
                for (i = 1; i <= glbidx; i++) {
                    var delivery = $('#delivery'+i).val();
                    var pck = $('#pck'+i).val();
                    var bag = $('#bag'+i).val();
                    var vouc_code= $('#vouc_code'+i).val();
                    var sd_date= $('#sd_date'+i).val();
                    var p_code= $('#p_code'+i).val();
                    var brand_code= $('#brand_code'+i).val();
                    var wght= $('#wght'+i).val();
                    var sd_rate= $('#sd_rate'+i).val();
                    var amount= $('#amount'+i).val();
                    var dis_ptch= $('#dis_ptch'+i).val();
                    var new_bal= $('#new_bal'+i).val();
                    var rmv_bal= $('#rmv_bal'+i).val();
                    var sauda2 = $('#sauda2'+i).val();    
                if (delivery>0)
                {
                $( "#delivery").each(function( i, val ) {
                    main_loop_id++;
                    result += '<tr>';
                    result += '<td><select name="contract_sauda_group['+main_loop_id+'][p_code]"  id="inp_code'+i+'"  class="form-control" style="width:102px;">';
                    for(p = 0; p < product.length; p++) {
                        if(p_code==product[p]['_id'])
                        {
                            result += "<option value='"+product[p]['_id']+"' selected>"+product[p]['product_name']+"</option>";
                        }
                        else{
                            result += "<option value='"+product[p]['_id']+"'>"+product[p]['product_name']+"</option>"; 
                        } 
                    }
                   result += '</select></td><td><select name="contract_sauda_group['+main_loop_id+'][brand_code]" id="brand_name'+i+'" class="form-control brand_name" style="width: 102px;">';
                   for(b = 0; b < brand.length; b++) {
                       if(brand_code==brand[b]['_id'])
                       {
                        result +="<option value='"+brand[b]['_id']+"' selected>"+brand[b]['brand_name']+"</option>";
                       }
                       else{
                        result +="<option value='"+brand[b]['_id']+"'>"+brand[b]['brand_name']+"</option>";
                       }
                   
                    }
                   result +='</select></td><input type="hidden" name="cntr'+main_loop_id+'" value="'+main_loop_id+'" id="cntr'+main_loop_id+'"><td><input type="text" name="contract_sauda_group['+main_loop_id+'][bag]" id="bag'+main_loop_id+'" oninput="calc('+main_loop_id+')" value="'+bag+'" class="form-control" style="width: 72px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][pck]" id="pck'+main_loop_id+'" oninput="calc('+main_loop_id+')" value="' +pck+'" class="form-control" style="width: 72px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][pck_unit]" id="inbrnd_code'+main_loop_id+'" class="form-control" style="width: 72px;"><option value="KG">KG</option></select></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][wght]" oninput="calc('+main_loop_id+')"  id="wght'+main_loop_id+'" value="'+wght+'" class="form-control wght" style="width: 82px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][sd_rate]" id="sd_rate'+main_loop_id+'" oninput="calc('+main_loop_id+')" value="'+sd_rate+'"  class="form-control wght" style="width: 72px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][s_rate]" id="seler_rate'+main_loop_id+'"  class="form-control" style="width: 72px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][b_rate]" id="buy_rate'+main_loop_id+'" class="form-control" style="width: 72px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][w_q]" id="w_q'+main_loop_id+'" class="form-control w_q" style="width: 72px;"><option value="W">W</option><option value="Q">Q</option></select></td><td><select name="contract_sauda_group['+main_loop_id+'][wghtunit]" id="wghtunit'+main_loop_id+'" oninput="calc('+main_loop_id+')" class="form-control" style="width: 72px;"><option value="Qtl">Qtl</option><option value="Tons">Tons</option><option value="Kg">Kg</option></select></td><td><select name="contract_sauda_group['+main_loop_id+'][rateper]" id="rateper'+main_loop_id+'" class="form-control" style="width: 62px;"><option value="">Select...</option><option value="1">1</option><option value="10">10</option><option value="100">100</option></select></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][amount]" id="amount'+main_loop_id+'" value="'+amount+'" class="form-control" style="width: 102px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][pcktype]" id="pcktype" class="form-control" style="width: 102px;"><option value="Gross">Gross</option><option value="Net">Net</option></select></td><td><select name="contract_sauda_group['+main_loop_id+'][g_n]" id="g_n'+main_loop_id+'" class="form-control" style="width: 102px;"><option value="">Select...</option><option value="O">O</option><option value="N">N</option></select></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][ipack]" id="ipack'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][slbrk_rt]" id="slbrk_rt'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][slbrk_type]" id="slbrk_type'+main_loop_id+'" class="form-control" style="width: 102px;"><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][slbrk_amt]" id="slbrk_amt'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][brbrk_rt]" id="brbrk_rt'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][brbrk_typ]" id="brbrk_typ'+main_loop_id+'" class="form-control" style="width: 102px;"><option value="">Select...</option><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][brbrk_amt]" id="amount2'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><input type="text" name="contract_sauda_group['+main_loop_id+'][slbrk_rte]" id="slbrk_rte'+main_loop_id+'" class="form-control" style="width: 102px;"></td><td><select name="contract_sauda_group['+main_loop_id+'][slbrk_typ]" id="slbrk_typ" class="form-control" style="width: 102px;"><option value="">Select...</option><option value="%">%</option><option value="PBag">PBag</option><option value="PQtl">PQtl</option><option value="Fix">Fix</option></select></td><td><input type="hidden" name="sauda2" value="'+sauda2+'"></td>';

                    result += '</tr>';
                });
            } 
        }
           
    }
    $(".contract_repeat_row").append(result);
     }
    });  
});
$(document).on("click", "#br_code", function() {
    $("#delivery").show();
});
var s = 1;
var member = s + 1;
var limit = 1000;

$(document).on('click', '.addMachine', function()
{


lstidx = $("input[name*='cntr']").length+1;
member=lstidx;
  if (s == limit)
  {
    alert("You have reached the limit of adding " + s + " inputs");
  }
  else
  {
    var product = "";
    $.ajax({
        type:'GET',
        url: '/contract_sauda/productname',
        dataType:'json',
        success: function(data) {
            if( data['success'] ) {
                 product = data['product_mast'];
                 brand = data['brand'];
                var newdiv = document.createElement('div');
                new_div = "<tr class='contract_wrapper' id='rohit"+lstidx+"'><td><select name='contract_sauda_group["+lstidx+"][p_code]'  id='inp_code"+lstidx+"'  class='form-control' style='width:102px;'>";
                for(j = 0; j < product.length; j++) {
                    new_div += "<option value='"+product[j]['_id']+"'>"+product[j]['product_name']+"</option>";
                }
                new_div += '</select></td>';
                
                new_div += "<td><select name='contract_sauda_group["+lstidx+"][brand_code]' list='brand_name' class='form-control brand_name' style='width: 102px;'>";
                for(i = 0; i < brand.length; i++) {
                    new_div += "<option value='"+brand[i]['_id']+"'>"+brand[i]['brand_name']+"</option>";
                }
                 new_div +="</select></td><td><input type='hidden' name='cntr"+member+"' value="+member+" id='cntr"+member+"'><input type='text' name='contract_sauda_group["+lstidx+"][bag]' id='bag"+lstidx+"' oninput='calc("+lstidx+")' class='form-control' style='width: 72px;' required></td><td class='pack_name'><input type='text' name='contract_sauda_group["+lstidx+"][pck]' id='pck"+lstidx+"' oninput='calc("+lstidx+")' class='form-control' style='width: 72px;' required></td><td><select name='contract_sauda_group["+lstidx+"][pck_unit]' list='brnd_code' id='inbrnd_code"+lstidx+"'  class='form-control' style='width: 72px;'><option value='KG'>KG</option></select></td><td><input type='text' name='contract_sauda_group["+lstidx+"][wght]' id='wght"+lstidx+"' oninput='calc("+lstidx+")' class='form-control wght' style='width: 82px;'></td><td><input type='text' name='contract_sauda_group["+lstidx+"][sd_rate]' id='sel_rate"+lstidx+"'  oninput='calc("+lstidx+")' class='form-control wght' style='width: 72px;' required></td><td><input type='text' name='contract_sauda_group["+lstidx+"][s_rate]' id='seler_rate"+lstidx+"'  class='form-control' style='width: 72px;'></td><td><input type='text' name='contract_sauda_group["+lstidx+"][b_rate]' id='buy_rate"+lstidx+"' class='form-control' style='width: 72px;'></td><td><select name='contract_sauda_group["+lstidx+"][w_q]' id='w_q"+lstidx+"' oninput='calc("+lstidx+")' class='form-control w_q' style='width: 72px;'><option value='W'>W</option><option value='Q'>Q</option></select></td><td><select name='contract_sauda_group["+lstidx+"][wghtunit]' id='wghtunit"+lstidx+"' oninput='calc("+lstidx+")' class='form-control' style='width: 72px;'><option value='Qtl'>Qtl</option><option value='Tons'>Tons</option><option value='Kg'>Kg</option></select></td><td><select name='contract_sauda_group["+lstidx+"][rateper]' id='rateper"+lstidx+"'  oninput='calc("+lstidx+")' class='form-control' style='width: 62px;'><option value=''>Select...</option><option value='1'>1</option><option value='10'>10</option><option value='100'>100</option></select></td><td><input type='text' name='contract_sauda_group["+lstidx+"][amount]' id='amount"+lstidx+"' class='form-control amount' style='width: 102px;'></td><td><select name='contract_sauda_group["+lstidx+"][pcktype]' id='pcktype"+lstidx+"' class='form-control' style='width: 102px;'><option value='Gross'>Gross</option><option value='Net'>Net</option></select></td><td><select name='contract_sauda_group["+lstidx+"][g_n]' id='g_n"+lstidx+"' class='form-control' style='width: 102px;'><option value=''>Select...</option><option value='O'>O</option><option value='N'>N</option></select></td><td><input type='text' name='contract_sauda_group["+lstidx+"][ipack]' class='form-control' style='width: 102px;'></td><td><input type='text' name='contract_sauda_group["+lstidx+"][slbrk_rt]' id='slbrk_rt"+lstidx+"' class='form-control' style='width: 102px;'></td><td><select name='contract_sauda_group["+lstidx+"][slbrk_type]' id='slbrk_type"+lstidx+"' class='form-control' style='width: 102px;'><option value='%'>%</option><option value='PBag'>PBag</option><option value='PQtl'>PQtl</option><option value='Fix'>Fix</option></select></td><td><input type='text' name='contract_sauda_group["+lstidx+"][slbrk_amt]' id='slbrk_amt"+lstidx+"' class='form-control' style='width: 102px;'></td><td><input type='text' name='contract_sauda_group["+lstidx+"][brbrk_rt]'  id='brbrk_rt"+lstidx+"' class='form-control' style='width: 102px;'></td><td><select name='contract_sauda_group["+lstidx+"][brbrk_typ]' id='brbrk_typ"+lstidx+"' class='form-control' style='width: 102px;'><option value=''>Select...</option><option value='%'>%</option><option value='PBag'>PBag</option><option value='PQtl'>PQtl</option><option value='Fix'>Fix</option></select></td><td><input type='text' name='contract_sauda_group["+lstidx+"][brbrk_amt]' id='amount2"+lstidx+"' class='form-control' style='width: 102px;'></td><td><input type='text' name='contract_sauda_group["+lstidx+"][slbrk_rte]' id='slbrk_rte"+lstidx+"' class='form-control' style='width: 102px;'></td><td><select name='contract_sauda_group["+lstidx+"][slbrk_typ]' id='slbrk_typ"+lstidx+"' class='form-control' style='width: 102px;'><option value=''>Select...</option><option value='%'>%</option><option value='PBag'>PBag</option><option value='PQtl'>PQtl</option><option value='Fix'>Fix</option></select></td><td><a data-repeater-delete='inner-field-"+lstidx+"' data-brand-index='"+member+"' class='contract-delete-btn' style='cursor:pointer;'><i class='fa fa-times' style='font-size: 20px;color: red;margin-left:12px;'></i></a></td></tr>";
                $(new_div).insertBefore("#contract_div");
                s++;
                member++;

            }
        }
    });

  } 
});
$(document).on("click", ".contract-delete-btn", function(){
    alert('Are you sure you want to delete this element');
    var parent_id = $(this).closest('.contract_wrapper').prop('id');
    $("#"+parent_id).remove();
});
$(document).on("click", ".sauda_delete_btn", function(){
    alert('Are you sure you want to delete this element');
    var brandIndex = $(this).attr('data-brand-index');
    var parent_id = $(this).closest('.sauda_variation_row-'+brandIndex).prop('id');
    $("#"+parent_id).remove();
});
//contract_sauda calculation
$(document).ready(function() {
    $("#wght").keyup(function() {
       calc( function(err, result)  {
       });
});
});
$(document).ready(function() {
$("#pck").keyup(function() {
   calc( function(err, result)  {
   });
});
});
$(document).ready(function() {
$("#bag").keyup(function() {
calc( function(err, result)  {
});

});
});
$(document).ready(function() {
$("#sel_rate").keyup(function() {
    
});
});
$(document).ready(function() {
$("#wghtunit").change(function() {
calc( function(err, result)  {
});
 
});
});
$(document).ready(function() {
$("#w_q").change(function() {
calc( function(err, result)  {
});
});
});
    function calc(callback) {
    var bag = 0;
    var pck = 0;
    var wghtunit = 0;
    var w_q = 0;
    var amount = 0;
    var wght = 0;

    var sel_rate=   parseInt($("#sel_rate"+callback).val());
    $("#seler_rate"+callback).val(Number(sel_rate)); 
    $("#buy_rate"+callback).val(Number(sel_rate));

    lstidx = $("input[name*='cntr']").length;
    member=lstidx;
 
    if (lstidx === undefined) lstidx=1;
       else lstidx = member; 
    //  alert(lstidx);
    for (i = 1; i <= lstidx; i++) 
    {
        wghtunit=  $("#wghtunit"+i).val();
        w_q= w_q +  parseInt($("#w_q"+i).val());
        sel_rate=   parseInt($("#sel_rate"+i).val());
        
        var divfac = 100;    
        if (wghtunit == "Tons") divfac = 1000;
        if (wghtunit == "Kg") divfac = 1;
        $("#wght"+i).val(Number(parseInt($("#bag"+i).val())) * Number(parseInt($("#pck"+i).val()))/divfac);
        if (w_q == "Q")  $("#amount"+i).val(Number(parseInt($("#bag"+i).val())) * Number(sel_rate));
        else  $("#amount"+i).val(Number(parseInt($("#wght"+i).val())) * Number(sel_rate));

        amount= amount +  parseInt($("#amount"+i).val());
        bag= bag +  parseInt($("#bag"+i).val());
        // alert(bag);
        pck= pck +  parseInt($("#pck"+i).val());
        wght= wght +  parseInt($("#wght"+i).val());

    }
        $("#tot_bags").val(Number(bag));
       
        $("#tot_wght").val(Number(wght));
        $("#tot_ammount").val(Number(amount));
}