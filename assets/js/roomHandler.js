var TOTAL_ROOM_PRICE = "00.00";
var TOTAL_PAY_AMOUNT = "00.00";

var TOTAL_DESCOUNT = "00.00";
var TAXAPPLIED = "00.00";
var FROM_DATE = $("input#ContentPlaceHolder1_txtCheckInDate").val();
var TO_DATE = $('input#ContentPlaceHolder1_txtCheckOutDate').val();
var TotalNight = $('input#ContentPlaceHolder1_hdnTodayNights').val();
$(function(){

    $('.roomDetailList .listCard').each(function(e){
        $(this).attr('data-romlist', "R"+e)
    })
    $("input#ContentPlaceHolder1_txtCheckInDate").datepicker({
        minDate: 0,
        firstDay: 0,
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'DD, d MM, yy',
        onSelect: function (selectedDate) {
            FROM_DATE = selectedDate;
            $('input#ContentPlaceHolder1_txtCheckOutDate').focus()
            $(this).siblings('.dateSChecin').text(selectedDate)
            $(this).siblings('.inputHidFromDate').val(selectedDate);
            $("input#ContentPlaceHolder1_txtCheckOutDate").datepicker("option", "minDate", FROM_DATE);
        }
    });
    $("input#ContentPlaceHolder1_txtCheckOutDate").datepicker({
        minDate: '+2d',
        changeMonth: true,
        firstDay: 0,
        dateFormat: 'DD, d MM, yy',
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            TO_DATE = selectedDate;
            $(this).siblings('.dateSChecin').text(selectedDate)
            $(this).siblings('.inputHidtomDate').val(selectedDate)
            $('.jsaddroom .selectRomAd').trigger('click');
        }
    });
    function checkDateValid(){
        if($('.inputHidFromDate').val() != "" && $('.inputHidtomDate').val() != ""){
            return true
        }
        else{
            $('input#ContentPlaceHolder1_txtCheckInDate').focus()
            alert("Please Select Date");
            return false;
        }
    }
    // Room Select
    $('.noDropdown').each(function(){
        var rom_list = "";
        var norom = $(this).attr('data-noroom');
        for (let i = 0; i <= parseInt(norom); i++) {
            rom_list += '<li data-room="'+i+'">'+i+' Room</li>';
        }
        $(this).append("<ul>"+rom_list+"</ul>")
    });


    $('.jsaddroom .selectRomAd').on('click', function(){
        var hasdate = checkDateValid()
        if(hasdate){
            $(this).siblings('.noDropdown').slideToggle();

        }
    });
    
    $('body').click(function(e) {
        var catFilterCont = $(".jsaddroom");
        if (!catFilterCont.is(e.target) && catFilterCont.has(e.target).length === 0) {
            $('.jsaddroom .noDropdown').slideUp();
           
        }
    });

    $('.jsaddroom .noDropdown ul li').on('click', function(){
        $this = $(this);
        var roomPrice = $this.parents('.listCard').attr('data-roomprice');
        var roomTax = $this.parents('.listCard').attr('data-roomtax');
        $('.jsaddroom .noDropdown').slideUp();
        $(this).parents('.noDropdown').siblings('.selectRomAd').children('p').text($(this).text());
        var roomAdd = $(this).attr('data-room');
        var ADULT_Allowed = $this.parents('.noDropdown').attr('data-adults');
        var KIDS_Allowed = $this.parents('.noDropdown').attr('data-kids');
        var valhid = $(this).parents('.noDropdown').siblings('input.input_noroom');

        valhid.val(roomAdd)
        if(valhid.val() == "" || valhid.val() == "0"){
            $this.parents('.cardRoomCOunt').siblings('.jsAcardAcount').hide();
            $this.parents('.listCard').removeClass('room_addin_list')
        }
        else{
            $this.parents('.cardRoomCOunt').siblings('.jsAcardAcount').show();
            $this.parents('.listCard').addClass('room_addin_list')
        }

        var ListId = $(this).parents('.listCard').attr('data-romlist');
        ListGuest($this,roomAdd,ListId,ADULT_Allowed, KIDS_Allowed);

        var Room_Name = $(this).parents('.cardRommDetail').children().find('.roomName').text();
        var Room_Type = $this.parents('.listCard').attr('data-roomtype');
        var Room_Price = (parseInt(roomPrice) * parseInt(roomAdd)); 
        var Room_Tax = (parseInt(roomTax) * parseInt(roomAdd)); 
        var No_Rooms = roomAdd;
        roomAddtoCart(ListId, Room_Name, Room_Type, No_Rooms, Room_Price, Room_Tax)


    });

    /* Adults & Kids Addon */
    function ListGuest(a,RsNo,ListId,ADULT_Allowed, KIDS_Allowed){
        $this = a.parents('.cardRommDetail').children().find('.jsAcardList');
        var li =  $this.children('.flex').length;
        if(li < RsNo){
            var liofAdults = "";
            var liofKids = "";
            var RoomType = a.parents('.listCard').attr('data-roomtype');
            var RoomName = a.parents('.listCard').attr('data-roomname');
            ///alert(RoomName);
            //a.parents('.listCard').children().find('.add_to_cart').hide();
            //alert(a.parents('.listCard').attr('data-roomname'));
            for (let i = 0; i <= parseInt(ADULT_Allowed); i++) {
                liofAdults += `<li><div class="checkBoxGroup"> <label for=""> <input type="radio" ${i == 1 ? 'checked' : ''} onChange="handleChangeEvent($(this))" name="filadult${i+1}_${i}_adult" value="${i}" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Adult ${i}</span> </label> </div></li>`
            }
            for (let i = 0; i <= parseInt(KIDS_Allowed); i++) {
                liofKids += `<li><div class="checkBoxGroup"> <label for=""> <input type="radio" ${i == 0 ? 'checked' : ''} onChange="handleChangeEvent($(this))" name="filakid${RsNo}_${ListId}Kids" value=${i} /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Kids ${i}</span> </label></div></li>`
            }
            for(var i = li; i < RsNo; i++){
                var addons = `<div class="flex room_list_rep" data-room=${a.parents('.listCard').attr('data-room')} data-roomname=${RoomName} data-roomimage=${a.parents('.listCard').attr('data-roomimage')} data-roomKidsAge=${a.parents('.listCard').attr('data-roomKidsAge')} data-roomKidsAgePrice=${a.parents('.listCard').attr('data-roomKidsAgePrice')} data-roomprice=${a.parents('.listCard').attr('data-roomprice')} data-roomtax=${a.parents('.listCard').attr('data-roomtax')} data-roomrxtraprice=${a.parents('.listCard').attr('data-roomrxtraprice')} data-roomrxtrapricetax=${a.parents('.listCard').attr('data-roomrxtrapricetax')} data-adult="1" data-kids="0" data-adindex="liindex_${i}" data-roomtype=${RoomType}><input type="hidden" class="input_hidden_adults" value="1"> <input type="hidden" class="input_hidden_kids" value="0">
                <div class="cola"><div class="romLiLabel">Room ${i+1}</div></div><div class="colb"><div class="dropdbokrom dropdAdultJs"><div class="dropdAdultSelect select"><p>1 Adult</p></div><div class="dropDownAdl droRECss"><ul>${liofAdults}</ul></div></div></div> ${KIDS_Allowed == 0 ? '' : '<div class="colb"><div class="dropdbokrom dropdChildJs"><div class="dropchildSelect select"><p>0 Kids</p></div><div class="dropDownChi droRECss"><ul>'+liofKids+'</ul></div></div></div>'} </div>`;            
                $this.append(addons)[i];
            }
        }
        else{
            $this.children('.flex').eq((RsNo-1)).nextAll().remove();
            a.parents('.listCard').children().find('.add_to_cart').show();
        };
            $('.room_list_rep').each(function(){
                var ind = $(this).attr('data-adindex');
                $(this).children().find('input[type="radio"]').attr('name', $(this).children().find('input[type="radio"]').attr('name')+"_"+ind)
            });

        AdultClikHandler();
        KidsClikHandler();
        kidsAgeHandler();
    }

    // Room Price As per the Runtime Bind in Right Side Cart
        function roomAddtoCart(ListId, Room_Name, Room_Type, No_Rooms, Room_Price, Room_Tax){
            //alert();
            if(No_Rooms == 0){
                $('.list-selectedRomm-js .list[data-id="R0"]').remove(); 
                //$('.disply_hide').hide();
            }
            else{
                var cartList = `<div class="list" data-id="${ListId}"><input type="hidden" class="inputHideenPriAddon" value="${Room_Price}" /><input type="hidden" class="inputHideenPritax" value="${Room_Tax}" /><div class="card"> <div class="card-header"> <div class="romname jsrommname">${Room_Name}</div> <div class="altr jsaltr">${Room_Type}</div> <div class="forday jsforday">${FROM_DATE}, ${TO_DATE} | ${TotalNight} Nights</div> <div class="cartAvtion"> <ul> <li><button type="button"><img src="assets/icons/pen.png" alt=""><span>Edit</span></button></li> <li><button type="button"><img src="assets/icons/delete.png" alt=""><span>Delete</span></button></li> </ul> </div> </div> <div class="card-body"> <div class="totrooms_" onClick="toggleDetails($(this))"> <div class="rooms jstotlaRoomselected">${No_Rooms} Rooms</div> <div class="totpersi jsTotalPersion">1 Adult</div> </div> <div class="price jstotlaPris">Rs. ${Room_Price}.00</div>  <div class="rombokde jsrombokdetail" style="display: none;"></div> </div> </div> </div> </div>`;        
                $('.list-selectedRomm-js .list[data-id="'+ListId+'"]').remove();
                $('.list-selectedRomm-js').append(cartList);
                //$('.disply_hide').show();
                gettotalPrice();
            }
    }

   

    // Adult Dropdown
    function AdultClikHandler(){
        $('.dropdAdultJs .select').on('click', function(){
            $(this).parents('.flex').siblings().children().find('.dropDownAdl').slideUp();
            $(this).siblings('.dropDownAdl').slideDown();
        });
        $('body').click(function(e) {
            var catFilterCont = $(".dropdAdultJs");
            if (!catFilterCont.is(e.target) && catFilterCont.has(e.target).length === 0) {
                $('.dropdAdultJs .dropDownAdl').slideUp();
            }
        });
        $('.dropDownAdl input').on('change', function(){
            
            if($(this).prop('checked', true)){
                $(this).parents('li').siblings().children().find('input').prop('checked', false).removeClass('adult-check');
            }
            if($(this).is(":checked")){
                var val = $(this).val();
                $(this).parents('.dropDownAdl').siblings('.dropdAdultSelect').children('p').text(val+" Adult");
                $(this).parents('.dropDownAdl').slideUp();
                $(this).parents('.room_list_rep').children('.input_hidden_adults').val(val);
                $(this).parents('.room_list_rep').attr('data-adult', val);
                $(this).addClass('adult-check');
            }
            else{
                $(this).removeClass('adult-check');
                AdultchArray.pop($(this).val());
            }
    // __________________________________________________________________________________________________________
            var AdultchArray = new Array();
            $(this).parents('.room_addin_list').children().find('.dropdAdultJs input:checked').each(function(){
                AdultchArray.push($(this).val());
            });
            var totroom = $(this).parents('.room_addin_list').attr('data-romlist');
            var totroomd = $(this).parents('.room_addin_list').children().find('.input_noroom').val();
            $('.list-selectedRomm-js .list').each(function(){
                if($(this).attr('data-id') == totroom){
                    $(this).children().find('.jstotlaRoomselected').text(totroomd+ " Rooms")
                }
            });
        });
    };
    AdultClikHandler();

    // Kids Dropdown
    function KidsClikHandler(){
        $('.dropdChildJs .select').on('click', function(){
            $(this).parents('.flex').siblings().children().find('.dropDownChi').slideUp();
            $(this).siblings('.dropDownChi').slideDown();
        })
        $('body').click(function(e) {
            var catFilterCont = $(".dropdChildJs");
            if (!catFilterCont.is(e.target) && catFilterCont.has(e.target).length === 0) {
                $('.dropdChildJs .dropDownChi').slideUp();
            }
        });

        $('.dropDownChi input').on('change', function(){
            if($(this).is(":checked")){
                var val = $(this).val();
                $(this).parents('.dropDownChi').siblings('.dropchildSelect').children('p').text(val+" Kids")
                $(this).parents('.dropDownChi').slideUp();
                $(this).parents('.room_list_rep').children('.input_hidden_kids').val(val)
                $(this).parents('.room_list_rep').attr('data-kids', val)
            }
            else{

            }
            var a = $(this).parents('.room_list_rep');
            KidsAddon(a, $(this).val());
        });

        function KidsAddon(a,b){
            $this = a;
            var rid = $this.parents('.listCard').attr('data-romlist');
            var li =  $this.children('.colc').length;
            if(li < b){
                for (let i = li; i < b; i++) {
                    var kidsbox = `<div class="colc"> <div class="dropdbokrom dropdChildAgeJs"> <div class="dropchildage select"> <p>Age</p> </div> <div class="dropDownChi droRECss"> <ul> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="1" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 1</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="2" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 2</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="3" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 3</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="4" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 4</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="5" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 5</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="6" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 6</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="7" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 7</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="8" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 8</span> </label> </div> </li> <li> <div class="checkBoxGroup"> <label for=""> <input type="radio"  onChange="handleChangeEvent($(this))" name="filakid_${i}_age_${rid}" value="9" /> <div class="fakeBox"><img src="assets/icons/check_iocnswn.png" alt=""></div> <span>Age 9</span> </label> </div> </li> </ul> </div> </div> </div>`
                    a.append(kidsbox)[i];
                }
            }
            else{
                $this.children('.colc').eq((b-1)).nextAll().remove()
            };
            if(b == 0 ){
                $this.children('.colc').remove()
            }
            kidsAgeHandler()
        }
        
    }
    KidsClikHandler();


    // Kids Age
    function kidsAgeHandler()
    {
        $('.dropdChildAgeJs .select').on('click', function(){
            $(this).parents('.flex').siblings().children().find('.dropDownChi').slideUp();
            $(this).siblings('.dropDownChi').slideDown();
        })
        $('body').click(function(e) {
            var catFilterCont = $(".dropdChildAgeJs");
            if (!catFilterCont.is(e.target) && catFilterCont.has(e.target).length === 0) {
                $('.dropdChildAgeJs .dropDownChi').slideUp();
            }
        });
        kidsOpdtionDromDown()
    }

    function kidsOpdtionDromDown(){
        $('.dropdChildAgeJs .dropDownChi input').on('change', function(){
            if($(this).is(":checked")){
                var val = $(this).val();
                $(this).parents('.dropDownChi').siblings('.dropchildage').children('p').text(val+" Age")
                $(this).parents('.dropDownChi').slideUp();
            }
        });
    }
    kidsAgeHandler();

   

})


function handleChangeEvent(e){
    $this = e.parents('.listCard');
    var roomID = $this.attr('data-romlist');
    var roomArray = "";
    var roomPrice = "";
    var roomNameArray = new Array();
    var adultArray = new Array();
    var KidsArray = new Array();

    // No of Rooms
    roomArray = $this.children().find('.input_noroom').val();
    roomPrice = $this.children().find('.rommSelecHiInpPrice').val();

    // Adult
    $this.children().find('.dropdAdultJs input[type="radio"]:checked').each(function(){
        adultArray.push($(this).val());
    })

    // Kids
    $this.children().find('.dropdChildJs input[type="radio"]:checked').each(function(){
        KidsArray.push($(this).val());
    })
        
        
    // Room Name
    roomNameArray.push($this.children().find('.roomName').text());
    handaleRoomListyin(roomID,roomArray,roomNameArray,adultArray,KidsArray,roomPrice)

   function handaleRoomListyin(roomID,roomArray,roomNameArray,adultArray,KidsArray,roomPrice){
    const totalAdult = adultArray.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
    const totalKids = KidsArray.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
    $('.list-selectedRomm-js .list').each(function(){
        if($(this).attr('data-id') == roomID){
            var temp = ""
            if(parseInt(totalKids) > 0)
                $(this).children().find('.jsTotalPersion').text(totalAdult+" Adult, "+totalKids+" Children");
            else
                $(this).children().find('.jsTotalPersion').text(totalAdult+" Adult");
            for (let i = 0; i < parseInt(roomArray); i++) {
                if(parseInt(totalKids) > 0){
                    temp += `<div class="li"> <p>Room ${i+1}</p> <span>${adultArray[i]} Adults, ${KidsArray[i]} Children</span> <div class="price">Rs. ${roomPrice}.00</div> </div>`;
                }
                else{
                    temp += `<div class="li"> <p>Room ${i+1}</p> <span>${adultArray[i]} Adults</span> <div class="price">Rs. ${roomPrice}.00</div> </div>`;
                }
            }
            $(this).children().find('.jsrombokdetail').html(temp);  
            $(this).children().find('.jstotlaPris').text("Rs. "+(parseInt(roomPrice)*parseInt(roomArray))+".00")          
        }
    })
    gettotalPrice()
    
   }
}

function gettotalPrice() {
    var TotalRoomPrice = new Array();
    var TotalTax = 0;
    $(".inputHideenPriAddon").each(function () {
        TotalRoomPrice.push($(this).val());        
    });
    $(".inputHideenPritax").each(function () {
        TotalTax = (parseInt(TotalTax) + parseInt($(this).val()));
    });
    const pri = TotalRoomPrice.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a),0);
    TOTAL_ROOM_PRICE = pri;
    TAXAPPLIED = TotalTax    
    $(".finalTotlaPrice").text("Rs. " + TOTAL_ROOM_PRICE + ".00");
    TOTAL_ROOM_PRICE = parseInt(TOTAL_ROOM_PRICE) - parseInt(TOTAL_DESCOUNT);
    TOTAL_PAY_AMOUNT = parseInt(TOTAL_ROOM_PRICE) + parseInt(TAXAPPLIED);
    $(".jsdisprice").text("Rs. -" + TOTAL_DESCOUNT + ".00");
    $(".jstaxamoun").text("Rs. " + TAXAPPLIED + ".00");
    $(".ttotlaPayAmount").text("Rs. " + TOTAL_PAY_AMOUNT + ".00");
    
  }

  function ApplyCoupanHandler(){
    $('.couponModelPop .input-coupon:checked').val();
    TOTAL_DESCOUNT = $('.couponModelPop .input-coupon:checked').val();
    COUPON_NAME = $('.couponModelPop .input-coupon:checked').attr('data-name');
    TAXAPPLIED = $('.couponModelPop .input-coupon:checked').attr('data-descount');
    $('.inputProMocode').val(COUPON_NAME)
    gettotalPrice();
  }


  function toggleDetails(e){
        $this = e;
        $this.siblings('.rombokde').slideToggle();
  }


  //$('.btnadtocart').on('click', function(e){
  //  e.preventDefault();
  //  $this = $(this).parents('.listCard');
  //  if(FROM_DATE == "" || TO_DATE == ""){
  //      alert('Please select date!')
  //      return false;
  //  }
  //  if($this.children().find('.input_noroom').val() == "" || $this.children().find('.input_noroom').val() == 0){
  //      alert('Please select Room!')
  //      return false;
  //  }

  //})