//script.js
var base_url = "/wp-content/themes/charityfoundation";
var absolute_url = "https://www.muslimcharity.org.uk";

jQuery(document).ready(function ($) {
  $("img").each(function (t) {
    $(this).removeAttr("title");
  });

  $(".vc_btn3-icon.fa").each(function (f) {
    $(this).removeClass("fa");
  });
  $(".vc_btn3-icon").each(function (f) {
    $(this).addClass("fab");
  });

  $(".vc_btn3-icon.fa-facebook").each(function (f) {
    $(this).addClass("fa-facebook-f");
  });

  display_donation_amount();
  load_cart(0);

  $("ul#menu-main-menu > .menu-item-has-children").click(function (e) {
    var ww = $(window).width();
    if (ww <= 1199) {
      console.log(e.target.nodeName);
      if (e.target.nodeName == "LI") {
        e.preventDefault();
        $(this).toggleClass("active");
      }
    }
  });
  $("ul#menu-main-menu > .menu-item-has-children > a").click(function (e) {
    var ww = $(window).width();
    if (ww <= 1199) {
      //e.preventDefault();
      //e.preventDefault();
      $(this).parent().toggleClass("active");
    }
  });
  $(
    "ul#menu-main-menu > .menu-item-has-children .menu-item-has-children > a"
  ).click(function (e) {
    var ww = $(window).width();
    if (ww <= 1199) {
      e.preventDefault();
      $(this).parent().toggleClass("active");
    }
  });

  $(".show_cart").click(function (e) {
    e.preventDefault();
    show_cart();
  });

  $(".product .related.products h2").html("More Gifts");
  //$("form.ajax_donate_form").submit(function(e){
  $(document).on(
    "submit",
    "form.ajax_donate_form, form#popup_cart_form, form.popup_cart_form",
    function (e) {
      //alert('a');
      e.preventDefault(); // avoid to execute the actual submit of the form.

      var form = $(this);
      var submit_text = form.find("button span").html();
      form
        .find("button span")
        .html('Please Wait <i class="fas fa-spinner fa-spin"></i>');
      form.find("button").attr("disabled", "disabled");
      $.ajax({
        type: "POST",
        url: base_url + "/ajax.php?add=1",
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
          //console.log(data); // show response from the php script.
          //alert('Good');
          display_donation_amount();
          load_cart(form);
          //show_cart();
          //$(".show_cart").trigger('click');
          /*form.find("button span").html('Added');
				setTimeout(function() {
					form.find("button span").html(submit_text);
				}, 3000);*/
        },
      });
    }
  );

  /*$(".parent_appeal .appeals_main_appeal_banner").each(function(i){
		var img_width = $(this).find("img").width();
		var container_width = $(this).width();
		//console.log(container_width+"="+img_width);
		var remaining_width = parseInt((container_width - img_width)/2) - 35;
		$(this).find(".left_bar").css('width',remaining_width);
		$(this).find(".right_bar").css('width',remaining_width);
	});*/
  /*$(document).on('submit','form#popup_cart_form',function(e){
   
		//alert('a');
		e.preventDefault(); // avoid to execute the actual submit of the form.

		var form = $(this);
		var submit_text = form.find("button span").html();
		form.find("button span").html('<i class="fas fa-spinner fa-spin"></i>');
		$.ajax({
			type: "POST",
			url: base_url+'/ajax.php?add=1',
			data: form.serialize(), // serializes the form's elements.
			success: function(data)
			{
				//console.log(data); // show response from the php script.
				display_donation_amount();
				load_cart();
				$(".show_cart").trigger('click');
				form.find("button span").html('Added');
				setTimeout(function() {
					form.find("button span").html(submit_text);
				}, 3000);
			}
		});
	});
	*/

  $("form.ajax_cart_form").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var item_parent = $(this).parents(".sub_cause");
    item_parent.addClass("loading");
    $.ajax({
      type: "POST",
      url: base_url + "/ajax.php?load_form=1",
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        item_parent.removeClass("loading");
        $(".mc__cart").addClass("c3cols");
        $(".mc__cart .mc__container").prepend(
          '<div class="mc__form_content mc__column green  dark-theme" data-label="form"><div class="nd_options_navigation_2_sidebar"></div></div>'
        );
        $(".mc__form_content .nd_options_navigation_2_sidebar").html(data);
        $("body").addClass("__mc_open");
        $(".mc__cart").addClass(" __show-one-column __showing_form");
      },
    });
  });

  $("#checkout_btn").click(function (e) {
    e.preventDefault();
  });

  $(document).on("change", ".mradio", function () {
    if ($(this).val() == "1") {
      $(".form_content-single").hide();
      $(".form_content-regular").show();
    } else {
      $(".form_content-regular").hide();
      $(".form_content-single").show();
    }
    var itval = $("input[name='damount']:checked").val();
    if (itval) {
      $(".form_content-field .damount").val(itval);
    }
    $("#qty_field").val("1");
  });
  $(document).on("change", ".sradio", function () {
    var ds_id = $(this).attr("data-ds");
    //console.log(ds_id);
    if (isNaN(ds_id)) {
      $(".form_content-field input[name='ds_id']").val("");
    } else {
      $(".form_content-field input[name='ds_id']").val(ds_id);
    }
    $(".form_content-field .damount").val($(this).val());
    $("#qty_field").val("1");
  });

  //$(document).on('keyup mouseup paste', ".form_content-field input[name='amount']",function(){
  $(document).on(
    "change",
    ".form_content-field input[name='amount']",
    function () {
      //console.log('aa');
      $(".sradio").each(function (i) {
        $(this).prop("checked", false);
      });
      $(".form_content-field input[name='ds_id']").val("");
    }
  );
  $(document).on("change", "#qty_field", function () {
    var check_amt = $("input[name='damount']:checked").val();
    var t_amt = $(this).val() * check_amt;
    //console.log(check_amt+"="+$(this).val()+"="+t_amt);

    $(".form_content-field .damount").val(t_amt);
  });

  $(document).on("input", ".qty_field", function () {
    var vfrom = $(this).parents("form");
    var check_amt = vfrom.find("input[name='damount']").val();

    var t_amt = $(this).val() * check_amt;
    //console.log(check_amt+"="+$(this).val()+"="+t_amt);
    vfrom.find(".damount").val(t_amt);
    //$(".damount").val(t_amt);
  });

  $(".mc__close").click(function (e) {
    e.preventDefault();
    close_cart();
  });

  $(".nd_options_open_navigation_2_sidebar_content").click(function () {
    $("body").addClass("menu_open");
  });
  $(".close_menu, #nd_options_site_filter").click(function () {
    //$(".nd_options_navigation_2_sidebar_content").css('right','-320px');
    $("body").removeClass("menu_open");
  });

  $(".page-id-4354 > .nicdark_site").addClass("strips_bg");
  $(".blog #nd_options_archives_header_img_layout_4 h1").html("News");

  /*if($("body").hasClass('home') || $("body").hasClass('single-causes') || $("body").hasClass('page-id-4354'))
	{
		
		$(".project_quick_donate").parents(".vc_row").addClass('quick_home_donate');
		
		var stickyOffset = $(".project_quick_donate").parents(".vc_row").offset().top;//$('.quick_home_donate').offset().top;
		
		$(window).scroll(function(){
			var sticky = $(".project_quick_donate").parents(".vc_row"), //$('.quick_home_donate'),
			scroll = $(window).scrollTop();
			//console.log(scroll+"="+stickyOffset);
			if (scroll >= (stickyOffset - 137))
			{
				sticky.addClass('fixed');
				//$(".vc_row.fixed").addClass('closed');
			}
			else{
				sticky.removeClass('fixed');
			}
		});
	}*/

  $(".wpcf7-cf7_button").click(function () {
    var id = $(this).attr("id");
    if (id) {
      $("input[name='cf7_type']").val(id);
    }
  });

  $(".registration_content textarea").each(function (index) {
    $(this).parents(".field").addClass("textaread_field");
  });

  $(".appeal-donate-box").click(function () {
    var pq_parent = $(this).parents(".quick_box");
    if (pq_parent.hasClass("opened")) {
      pq_parent.removeClass("opened");
    } else {
      pq_parent.addClass("opened");
    }
  });
  $(".cquick").click(function () {
    $(this).parents(".quick_box").removeClass("opened");
  });

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var inputs = event.detail.inputs;
      for (var i = 0; i < inputs.length; i++) {
        if ("cf7_type" == inputs[i].name && inputs[i].value == "pay") {
          //$('.wpcf7-response-output').html('some text');
          location = absolute_url + "/checkout/";
          break;
        }
      }
    },
    false
  );

  $(".hover_box").each(function (indx) {
    var href = $(this).find(".vc_single_image-wrapper").attr("href");
    var target = $(this).find(".vc_single_image-wrapper").attr("target");
    //console.log(href);
    if (href) {
      var html = $(this).find(".vc_figure-caption").html();
      //console.log(html);
      $(this)
        .find(".vc_figure-caption")
        .wrapAll(
          "<a href='" +
            href +
            "' target='" +
            target +
            "' class='caption_link' />"
        );
    }
  });

  $("#phone, #mobile").on("change paste keyup", function () {
    if ($(this).val() != "") {
      $("#phone, #mobile").removeAttr("required");
      $("#phone").attr("placeholder", "Home Telephone");
      $("#mobile").attr("placeholder", "Mobile Number");
    } else {
      if ($("#phone").val() == "" && $("#mobile").val() == "") {
        $("#phone, #mobile").attr("required", true);
        $("#phone").attr("placeholder", "Home Telephone*");
        $("#mobile").attr("placeholder", "Mobile Number*");
      }
    }
  });
});

jQuery(window).load(function () {});

function display_donation_amount() {
  jQuery.ajax({
    url: base_url + "/ajax.php?get_amount=1",
    type: "GET",
    success: function (data) {
      jQuery("li.menu-item-cart .show_cart > span").html(data);
      jQuery("div.menu-item-cart .show_cart > span").html(data);
    },
  });
}

function load_cart(t) {
  jQuery(document).ajaxStart(function () {
    jQuery(".cart_content").addClass("removing");
  });
  jQuery(document).ajaxStop(function () {
    jQuery(".cart_content").removeClass("removing");
  });

  jQuery.ajax({
    url: base_url + "/ajax.php?load_cart=1",
    type: "GET",
    success: function (data) {
      var d = jQuery.parseJSON(data);
      //jQuery(".mc__container > div .cart_content").html(d.cart);
      jQuery(".cart_content").html(d.cart);
      //jQuery(".mc__container .mc__addons_content > div").html(d.addon);
      jQuery("._addons_content").html(d.addon);

      if (t != 0) {
        show_cart();

        if (t) {
          var prev_t = t.find("button span").html();
          t.find("button span").html("Added");

          t.find("button").removeAttr("disabled");

          if (t.find("button").hasClass("ovcbtn")) {
            var ttt = t.find("button").attr("data-html");
            setTimeout(function () {
              t.find("button").html(ttt);
            }, 3000);
          } else {
            setTimeout(function () {
              var ttt = t.find("button").attr("data-html");
              if (ttt) {
                t.find("button span").html(ttt);
              } else {
                t.find("button span").html("Donate Now");
              }
            }, 3000);
          }
        }
      }
    },
  });
  display_donation_amount();
}

function close_cart() {
  jQuery("body").removeClass("__mc_open");
  jQuery(".mc__cart").removeClass(
    "c3cols __show-one-column __showing_form __showing_cart __show-two-column __showing_addons __show-three-column"
  );
  setTimeout(function () {
    jQuery(".mc__form_content").remove();
  }, 600);

  //jQuery(".mc__form_content").show();
}

function show_cart() {
  if (!jQuery("body").hasClass("__mc_open")) {
    jQuery("body").addClass("__mc_open");
  }
  jQuery(".mc__cart").addClass("__showing_cart");
  if (jQuery(".mc__cart").hasClass("__show-one-column")) {
    jQuery(".mc__cart").removeClass("__show-one-column");
    jQuery(".mc__cart").addClass("__show-two-column");
  } else {
    jQuery(".mc__cart").addClass("__show-one-column");
  }
}
function show_addons() {
  jQuery(".mc__cart").removeClass("__showing_cart");
  jQuery(".mc__cart").addClass("__showing_addons");
  //jQuery(".mc__cart").attr('disabled');
  if (jQuery(".mc__cart").hasClass("__show-two-column")) {
    jQuery(".mc__cart").removeClass("__show-two-column");
    jQuery(".mc__cart").addClass("__show-three-column");
  } else {
    jQuery(".mc__cart").removeClass("__show-one-column");
    jQuery(".mc__cart").addClass("__show-two-column");
  }
}

function remove_item(pid, cid, tid, amount) {
  jQuery(document).ajaxStart(function () {
    jQuery(".cart_content").addClass("removing");
  });
  jQuery(document).ajaxStop(function () {
    jQuery(".cart_content").removeClass("removing");
  });

  jQuery.ajax({
    url:
      base_url +
      "/ajax.php?remove=1&pid=" +
      encodeURIComponent(pid) +
      "&cid=" +
      encodeURIComponent(cid) +
      "&tid=" +
      encodeURIComponent(tid) +
      "&amount=" +
      encodeURIComponent(amount),
    type: "GET",
    success: function (data) {
      load_cart(0);
      update_qurbanis(data);
    },
  });
}

function add_addon(pid, cid, tid, amount, recur) {
  jQuery(document).ajaxStart(function () {
    jQuery("._addons_content").addClass("removing");
    jQuery(".cart_content").addClass("removing");
  });
  jQuery(document).ajaxStop(function () {
    jQuery("._addons_content").removeClass("removing");
    jQuery(".cart_content").removeClass("removing");
  });

  jQuery.ajax({
    url:
      base_url +
      "/ajax.php?add=1&pid=" +
      encodeURIComponent(pid) +
      "&cid=" +
      encodeURIComponent(cid) +
      "&tid=" +
      encodeURIComponent(tid) +
      "&amount=" +
      encodeURIComponent(amount) +
      "&recur=" +
      encodeURIComponent(recur),
    type: "GET",
    success: function (data) {
      var x = data;
      jQuery(".cart_item.addon.cart_total .cart_item_price b").html(
        parseFloat(x.replace(/\D/g, "")).toFixed(2)
      );
      display_donation_amount();
      load_cart(0);
    },
  });
}
