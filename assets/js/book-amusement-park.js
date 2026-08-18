$(".checkin").datepicker({
    minDate: 0,
    firstDay: 0,
    // changeMonth: true,
    numberOfMonths: 1,
    dateFormat: 'DD, d MM, yy',
    onSelect: function (selectedDate) {
        $(this).parent('.form-group').addClass('valid');
    }
});

$(function () {
    $('.modelTyepCheck').on('click', function () {
        var chk = $(this).attr('data-type');
        $('.model_PackCateg input[name="pack"]').each(function () {
            if ($(this).val() == chk) {
                $(this).prop("checked", true)
            }
            else {
                $(this).prop("checked", false)
            }
        });
    });
});
var Totaltax = 0;
var total = 0;
var DEFAULT_Value = {
    ADULT: 0,
    KIDS: 0,
    TAX: 0,
    ADULTTax: 0,
    KIDSTax: 0,
    COUPONS: $('#hdnTotalCoupon').val(),
}
var BTN_DEC, BTN_INC;
const ActionType = {
    INC_COUNTER: "INC_COUNTER",
    DEC_COUNTER: "DEC_COUNTER",
}
const ACTION_COUNT = {
    ADULT: parseInt($('#hdnTotalAdult').val()),
    KIDS: parseInt($('#hdnTotalKids').val()),
}

function PopPackage() {
    //alert($('#hdnTotalAdult').val());

    DEFAULT_Value = {
        ADULT: parseInt($('#hdnAdultPrice').val()),
        KIDS: parseInt($('#hdnKidsPrice').val()),
        TAX: 0,
    }
    BTN_DEC = $('.btn-dec');
    BTN_INC = $('.btn-inc');

    BTN_INC.on('click', function () {
        var acF = $(this).attr('data-btn');
        CounterHandler(ActionType.INC_COUNTER, acF)
    })
    BTN_DEC.on('click', function () {
        var acF = $(this).attr('data-btn')
        CounterHandler(ActionType.DEC_COUNTER, acF)
    });

    function CounterHandler(type, ACTFor) {
        if (ActionType.INC_COUNTER == type) {
            ACTION_COUNT[ACTFor] = ACTION_COUNT[ACTFor] + 1;
        }
        else if (ActionType.DEC_COUNTER == type) {
            if (ACTION_COUNT[ACTFor] === 0) {
                return 0;
            }
            else {
                ACTION_COUNT[ACTFor] = ACTION_COUNT[ACTFor] - 1;
            }
        }
        handleCalculation(ACTFor)
    }

    function handleCalculation(i) {
        var price_ = DEFAULT_Value[i] * ACTION_COUNT[i];
        bindDataInput(i, price_);
    }

    function bindDataInput(i) {
        $('a[data-btn="' + i + '"]').siblings('.countVal').text(ACTION_COUNT[i]);
        // $('button[data-btn="'+i+'"]').parents('.wrap').children().find('.price').text(DEFAULT_Value[i] * ACTION_COUNT[i]);
        DEFAULT_Value.COUPONS = 0;
        $('#hdnCouponCode').val('');
        TootalValue()
    }

    function TootalValue() {
        var adult = DEFAULT_Value.ADULT * ACTION_COUNT.ADULT;
        var kid = DEFAULT_Value.KIDS * ACTION_COUNT.KIDS;
        DEFAULT_Value.COUPONS = 0;
        total = parseInt(adult + kid);
        Totaltax = 0;
        if (parseInt(adult) > 0) {
            Totaltax = Totaltax + (ACTION_COUNT.ADULT * parseInt($('#hdnAdultPriceTaxs').val()));
        }
        if (parseInt(kid) > 0) {
            Totaltax = Totaltax + (ACTION_COUNT.KIDS * parseInt($('#hdnKidsPriceTaxs').val()));
        }
        if ((parseInt(adult) == 0) && (parseInt(kid) == 0)) {
            $('.dis_hide_book_now').hide();
            //dis_hide_book_now
        }
        else {
            $('.dis_hide_book_now').show();
        }
        DEFAULT_Value.TAX = Totaltax;
        $('#hdnTotalTax').val(Totaltax);
        total = total;
        $('#hdnTotalAdult').val(ACTION_COUNT.ADULT);
        $('#hdnTotalKids').val(ACTION_COUNT.KIDS);
        $('#hdnTotalGuest').val((ACTION_COUNT.ADULT + ACTION_COUNT.KIDS));
        $('.input_tottal').val(total);
        $('.decPrice').text("Rs. -" + DEFAULT_Value.COUPONS);
        $('.acTPrice').html("Rs. " + total + ".00");
        $('.final_tax').html("Rs. " + Totaltax + ".00");
        $('.acTPriceDes').html("Rs. " + ((total + Totaltax) - DEFAULT_Value.COUPONS) + ".00");
        $('.final_amount').html("Rs. " + ((total + Totaltax) - DEFAULT_Value.COUPONS) + ".00");
        $('.inputdecPrice_tottal').val((total + Totaltax));
        $('#hdnTotalPrice').val((total + Totaltax));
        $('#hdnTotalCoupon').val(DEFAULT_Value.COUPONS);        
        total = total + Totaltax;
    }
    DefaultValTottal();
}

function DefaultValTottal() {
    var Totaltax = 0;
    ACTION_COUNT.ADULT = 1;
    ACTION_COUNT.KIDS = 0;
    

    var adult = DEFAULT_Value.ADULT * ACTION_COUNT.ADULT;
    var kid = DEFAULT_Value.KIDS * ACTION_COUNT.KIDS;
    total = parseInt(adult + kid);
    if (parseInt(kid) > 0)
    {
        Totaltax = (ACTION_COUNT.KIDS * parseInt($('#hdnKidsPriceTaxs').val()));
    }
    if (parseInt(adult) > 0) {
        Totaltax = Totaltax + (ACTION_COUNT.ADULT * parseInt($('#hdnAdultPriceTaxs').val()));
    }
    DEFAULT_Value.TAX = Totaltax;
    $('#hdnTotalTax').val(Totaltax);
    var t = DEFAULT_Value.ADULT + DEFAULT_Value.KIDS;
    $('.acTPrice').html("Rs. " + total + ".00");
    $('.final_tax').html("Rs. " + Totaltax + ".00");
    $('.inputdecPrice_tottal').val(total);
    $('.acTPriceDes').text("Rs. " + (total + Totaltax));
    $('.final_amount').html("Rs. " + (total + Totaltax) + ".00");
    $('#hdnTotalPrice').val((total + Totaltax));
    total = total + Totaltax;

    $('.adults_pri').text("Rs. "+DEFAULT_Value.ADULT+"/head");
    $('.kids_pri').text("Rs. "+DEFAULT_Value.KIDS+"/head");
}

// ___________________________________________________Coupon___________________________________________________
function ApplyCoupanHandler() {
    if ($('input[name="inputCoupan"]:checked').length < 1) {
        alert("Please Select Coupon code!");
        return false
    }
    var coupon = $('input[name="inputCoupan"]:checked').val();
    var CoupName = $('input[name="inputCoupan"]:checked').attr('data-Code');
    var CoupType = $('input[name="inputCoupan"]:checked').attr('data-Type');
    var CoupValue = $('input[name="inputCoupan"]:checked').attr('data-Value');
    var CoupMinAmount = $('input[name="inputCoupan"]:checked').attr('data-MinAmount');
    if($('#hdnCouponFor').val() == "0"){
        if (parseInt(total) >= parseInt(CoupMinAmount)) {
            $('.maximum_savings').hide();
            couponApplyHandler(total, CoupType, CoupValue, CoupName);
        }
        else {
            $('.maximum_savings').show();
            if (CoupType == "Value") {
                $('.savings_type').text("₹ " + CoupValue + "");
            }
            else {
                $('.savings_type').text("" + CoupValue + "%");
            }
            $('.min_amount').text("Valid on minimum purchase of ₹ " + CoupMinAmount + "");
            $('input[name="inputCoupan"]').prop('checked', false);
        }
    }
    else if($('#hdnCouponFor').val() == "1"){
        if (parseInt($('#ContentPlaceHolder1_hdnPayableAmount').val()) >= parseInt(CoupMinAmount)) {
            $('.maximum_savings').hide();
            CouponsRooms(CoupType, CoupValue, CoupName);
        }
        else{
            $('.maximum_savings').show();
            if (CoupType == "Value") {
                $('.savings_type').text("₹ " + CoupValue + "");
            }
            else {
                $('.savings_type').text("" + CoupValue + "%");
            }
            $('.min_amount').text("Valid on minimum purchase of ₹ " + CoupMinAmount + "");
            $('input[name="inputCoupan"]').prop('checked', false);
        }
    }

}

$('.coupAppliDeBox,.decouBox').hide();

function couponApplyHandler(total, CoupType, CoupValue, CoupName) {

    if (CoupType == "Value") {
        total = total - CoupValue;
        DEFAULT_Value.COUPONS = CoupValue;
    }
    else {
        DEFAULT_Value.COUPONS = (parseInt(total) * parseInt(CoupValue));
        DEFAULT_Value.COUPONS = parseInt((DEFAULT_Value.COUPONS / 100));
        total = total - DEFAULT_Value.COUPONS;
    }
    //total = total - des;
    $('#hdnTotalPrice').val(total);
    $('#hdnTotalCoupon').val(DEFAULT_Value.COUPONS);
    $('#hdnCouponCode').val(CoupName);
    $('.listCouponJs input[name="inputCoupan"]').each(function () {
        if ($(this).attr('data-name') == CoupName) {
            $(this).prop('checked', true);
        }
        else {
            $(this).prop('checked', false);
        }
    })
    $('.inputProMocode').val(CoupName);
    $('.input_tottal').val(total);
    $('.decPrice').text("Rs. -" + DEFAULT_Value.COUPONS);
    $('.inputdecPrice').val(total);
    $('.inputdecPrice_tottal').val(total);
    $('.acTPriceDes').text("Rs. " + total);
    $('.final_amount').html("Rs. " + total + ".00");
    $('.CouponsPopModule').removeClass('is-open');
    $('.coupAppliDeBox,.decouBox').show();
}


//____________________________________________________ Bind Calendar Package___________________________________________________


$(function(){
    var dates = {}
    var DataContainer = new  Array();
    var dataar = new Array();
    var hotelID = 1;
    var BASE_PATH = location.origin;
    const url = BASE_PATH+"/assets/js/Charges.json";
	//console.log("url: " + url);
    function FEATCH_FILE(id = 0){
        $.getJSON(url, function (data) {
			//console.log(JSON.stringify(data, null, " "));
            $.each(data, function (key, model) {
                if (model.ID == parseInt(id)) {
                    dataar.push(model) ;
                }
            })
        })
        .done(function() {
            pusDataWhenFeatchCompl()
            console.log( "second success" );
          })
        .fail(function() {
            alert("Something Wrong Please Try again!");
            console.log( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });
    }
    FEATCH_FILE(0);
    $('.bind_package').on('click', function (e) {
        hotelID = $(this).attr('data-Package');
        FEATCH_FILE(hotelID);
    })
    // Get Data
    function pusDataWhenFeatchCompl(){
        dataar.forEach(function(i){
            dates[new Date(i.date)] = i.ADULT.toString();
        })
    }
    
    

    $(".checkinPackageInput").datepicker({      
        minDate: 0,
        firstDay: 0,
        maxDate: "+3M +10D",
        dateFormat: 'mm-dd-yy',
        // changeMonth: true,
        numberOfMonths: 1,
        beforeShowDay: function (date) {
            var hlText = dates[date];
            var date2 = new Date(date);
            var tglAja = date2.getDate();
            var mon = date2.getMonth();
            if (hlText) {
                updateDatePickerCells(tglAja, hlText, mon);
                return [true, "", hlText];
            }
            else {
                return [true, '', ''];
            }
        },
        onClose: function (selectedDate) {
            $('#ContentPlaceHolder1_hdnToDate').val(selectedDate);
            $('#ContentPlaceHolder1_txtchecin').val(selectedDate);
            if ($(this).val() != "") {
                $(this).parent('.form-group').addClass('valid');
                $('.inputCheckInLabel').text(selectedDate);
            }
            else {
                $(this).parent('.form-group').removeClass('valid');
                $('.inputCheckInLabel').text("Select Date");
            }
            $(".checkout_hotel").datepicker("option", "minDate", selectedDate);
        },
        
    });
    function updateDatePickerCells(a, b,mon) {
        var num = parseInt(a);
        var m = parseInt(mon);
		 console.log("num: " + num + ", m: " + m);
        setTimeout(() => {
            $('.ui-datepicker td > *').each(function (idx, elem) {
                if ($(this).parent('td').attr('data-month') == m && $(this).attr('data-date') == num) {
                    value = b;
                } 
                else {
                    value = 0;
                    }
                    var className = 'datepicker-content-' +value.toString();
                    if (value == 0)
                        addCSSRule('.ui-datepicker td a.' + className + ':after {content: "\\a0";}'); //&nbsp;
                    else
                        addCSSRule('.ui-datepicker td a.' + className + ':after {content: "₹ ' + value + '";}');                           
                        $(this).addClass(className + " tdredsb");
                        $(this).attr('data-month',parseInt($(this).parent('td').attr('data-month'))+1);

                        $(this).mouseover( function(){
                            var m = $(this).attr('data-month')
                            var d = $(this).attr('data-date')
                            var y = $(this).parent('td').attr('data-year')
                            var g = m+"/"+d+"/"+y;
                            g.toString();
                            var ss = dataar.filter(dd => dd.date == g);
                            if(ss[0].ADULT){

                                const toltipTemp = 
                                                `<div class="tooltip_model">
                                                    <div class="wrap">
                                                        <p><strong>Adult: </strong><span>₹ ${ss[0].ADULT}</span></p>
                                                        <p><strong>Kids: </strong><span>₹ ${ss[0].KIDS}</span></p>
                                                    </div>
                                                </div>`;
                                $(this).append(toltipTemp)
                            }
                        });
                        $(this).mouseleave( function(){
                            $(this).find('.tooltip_model').remove();
                        })
                        $(this).click( function(e){
                            var m = $(this).attr('data-month')
                            var d = $(this).attr('data-date')
                            var y = $(this).parent('td').attr('data-year')
                            var g = m+"/"+d+"/"+y;
                            g.toString();
                            var ss = dataar.filter(dd => dd.date == g);
                            if(ss[0].ADULT){
                                //$('#hdnAdultPriceTaxs').val(ss[0].ADULTTax);
                                //$('#hdnKidsPriceTaxs').val(ss[0].KIDSTax);
                                $('#hdnAdultPrice').val(ss[0].ADULT);
                                $('#hdnKidsPrice').val(ss[0].KIDS);
                                // alert(ss[0].ADULT);
                                DEFAULT_Value.ADULT = ss[0].ADULT;
                                DEFAULT_Value.KIDS = ss[0].KIDS;
                                //DEFAULT_Value.ADULTTax = ss[0].ADULTTax;
                                //DEFAULT_Value.KIDSTax = ss[0].KIDSTax;
                                DefaultValTottal();
                                var CHANGE_DATE = ['ADULT','COUPLES','ADULTTax','KIDSTax'];
                                CHANGE_DATE.forEach(function(e){
                                    // bindDataInput(e);
                                    $('.countVal.kids_adults').text(1);
                                    $('.countVal.kids_count').text(0);
                                })
                            }
                        })
                })                     
        }, 400);
    }

    var dynamicCSSRules = [];
        function addCSSRule(rule) {
        if ($.inArray(rule, dynamicCSSRules) == -1) {
            $('head').append('<style>' + rule + '</style>');
            dynamicCSSRules.push(rule);
        }

    }
}())
