$.fn.calculator = function (options) {
    const version = "1.1.0";
 
    var settings = $.extend({
        resize: true,
        draggable: true,
        language: "en",
        timeout: null,
        copy: function () { },
        texts: { 'errorText': 'error', 'copy': 'copy' },
        precision: 0,
        x: "2px",
        y: "2px"

    }, options);

    if (options == "show") { 
        $(".calculator_container").show();
        return this;
    }
   

    if (options == "hide") {
        $(".calculator_container").hide();
        return this;
    }


    if (options == "remove") {
        $('.calculator_container').remove();
        return this;
    }
    if (options == "version") {
        return version;
    }

    Insere_dans_DOM();

    function Insere_dans_DOM() {

        calculator_instance = $('.glbl_cnt').length + 1;

        $("body").append(
            '<div   class="glbl_cnt calculator_container"  id="calculator_ID' + calculator_instance + '"    style="position:absolute; top:' + settings.x + '; left:' + settings.y + '" data-id="' + calculator_instance + '" >  ' +
            '<span    data-id="' + calculator_instance + '" class="calc_cls_btn_fermer">   &times; </span> <div > ' +
            '<div   id="id_msg_copy' + calculator_instance + '" style=" position: absolute;"  class="   hide" >mon msg iciCopy</div>' +
            '  <input   type="text" class="form-control mb-2 calclator_Champ_Copy myChampsCalc' + calculator_instance + '" data-id="' + calculator_instance + '"    >  ' +
            ' <div class="calcula_div_btn"> <div class="row calcul_row justify-content-around mb-2"> ' +
            '  <button class="col-5 col-5_calcu caclculator_btn btn btn-dark  val" data-id="' + calculator_instance + '" value="C">C</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="/">/</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark vall    pourcentage"    data-id="' + calculator_instance + '"  value="/100">%</button> ' +
            ' </div> ' +
            ' <div class="row calcul_row justify-content-around mb-2"> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val"  data-id="' + calculator_instance + '" value="7">7</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="8">8</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="9">9</button> ' +
            ' <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="*">*</button> ' +
            '  </div> ' +
            '  <div class="row calcul_row justify-content-around mb-2"> ' +
            ' <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="4">4</button> ' +
            ' <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="5">5</button> ' +
            '<button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="6">6</button> ' +
            ' <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="-">-</button> ' +
            ' </div> ' +
            ' <div class="row calcul_row justify-content-around mb-2"> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="1">1</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="2">2</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="3">3</button> ' +
            '  <button class="col-2 caclculator_btn btn btn-dark val" data-id="' + calculator_instance + '" value="+">+</button> ' +
            ' </div>   ' +
            ' <div class="row calcul_row justify-content-around mb-2"> ' +
            ' <button class="col-2 caclculator_btn  btn btn-dark val" data-id="' + calculator_instance + '" value="-/+">±</button> ' +
            ' <button class="col-2 caclculator_btn  btn btn-dark val" data-id="' + calculator_instance + '" value="0">0</button> ' +
            ' <button class="col-2 caclculator_btn  btn btn-dark val" data-id="' + calculator_instance + '" value=".">.</button> ' +
            ' <button class="col-2 caclculator_btn  btn btn-dark val  totaux"   data-id="' + calculator_instance + '" value="=">=</button> ' +
            ' </div> </div> </div></div> </div><style>  .hide{  display:none;  } .show{display: block;  }</style> ');

        css_calculat(calculator_instance);


        var timeoutId_2;

        $(".glbl_cnt[data-id=" + calculator_instance + "]").mouseenter(function () {

            if (settings.timeout) { clearTimeout(timeoutId_2); }

        })  .mouseleave(function () {
                if (settings.timeout) {

                    $id_calc = $(this).attr("id");

                    timeoutId_2 = setTimeout(function () {

                        $('#' + $id_calc).hide();
                    }, settings.timeout * 1000);

                }
            });
        //on load
        if (settings.timeout) {
            timeoutId_2 = setTimeout(function () {

                $('#calculator_ID' + calculator_instance).hide();
            }, settings.timeout * 1000);
        }

       

        if (settings.resize) {
            $(".calculator_container").resizable({
                ghost: true
            });
        }

        if (settings.draggable) {
            $(".calculator_container").draggable();

            $(".calculator_container")
                .css('cursor', 'move');
        }

        $("input.calclator_Champ_Copy[data-id=" + calculator_instance + "]").dblclick(function () {

            var id_inss = $(this).attr('data-id');


            var hiddenClipboard = $('#_hiddenClipboard_');
            if (!hiddenClipboard.length) {
                $('body').append('<textarea readonly style="position:absolute;top: -9999px;" id="_hiddenClipboard_"></textarea>');
                hiddenClipboard = $('#_hiddenClipboard_');
            }
            hiddenClipboard.html($('input.myChampsCalc' + id_inss).val());

            hiddenClipboard.select();
            document.execCommand('copy');
            document.getSelection().removeAllRanges();
            hiddenClipboard.remove();

            if ($.isFunction(settings.copy))
                settings.copy.call($('#id_msg_copy' + id_inss));

            $msg_copy = settings.texts ? settings.texts["copy"] : ($.calculator.regional[settings.language] ? $.calculator.regional[settings.language]["copy"] : settings.texts["copy"]);
            $('#id_msg_copy' + id_inss).text($msg_copy);

        });


        $(".val[data-id=" + calculator_instance + "]").click(function (e) {

            var num = $(this).val(), id_inss = $(this).attr('data-id');

            $btn_cal = $(this);


            $(this).css('boxShadow', '0px 0px 0px 3px #86929d');
            setTimeout(function () { $btn_cal.css('boxShadow', 'none') }, 400);


            if ($(this).val() === '-/+') {
                $(".myChampsCalc" + id_inss).val(plusMoins(id_inss));
            }
            else insert(num, id_inss);

            if ($(this).val() === 'C') { clear(id_inss); }

        });


        $(".totaux[data-id=" + calculator_instance + "]").click(function () {
            total($(this).attr('data-id'));
        });


        $(".pourcentage[data-id=" + calculator_instance + "]").click(function () {
            $var_indic = $(this).attr('data-id');
            setTimeout(function () { $(this).css('Color', 'red') }, 800);
            key_tap_val($var_indic, 165);

            $btn_cal = $(this);
            setTimeout(function () { $btn_cal.css('boxShadow', 'none') }, 800);

            if ($.isNumeric($(".myChampsCalc" + $var_indic).val())) {
                insert("/100", $var_indic);
                total($var_indic);
            }
        });

        $(".calc_cls_btn_fermer[data-id=" + calculator_instance + "]").click(function () {
            $("#calculator_ID" + $(this).attr('data-id')).hide();
        });


        $("input.calclator_Champ_Copy[data-id=" + calculator_instance + "]").keyup(function (e) {

            $value = jQuery(this).val().trim();

            $msg_err = settings.texts ? settings.texts["errorText"] : ($.calculator.regional[settings.language] ? $.calculator.regional[settings.language]["errorText"] : settings.texts["errorText"]);

            if ($value !== $msg_err) {
                jQuery(this).val(regex_calcu($value));
            }

            $id_cal = $(this).attr('data-id');

            key_tap_val($id_cal, e.keyCode);

            if ((e.keyCode == 165 && $(".myChampsCalc" + $id_cal).val() === "")) return this;

            if (e.keyCode == 32 || e.keyCode == 67) {
                clear($id_cal);
            }
            else if (e.keyCode == 13 || e.keyCode == 61 || e.keyCode == 13) {

                total($id_cal);
            }
            else if (e.keyCode == 165) {

                insert("/100", $id_cal);
                total($id_cal);
            }
        });

        function css_calculat(var_id_cal) {
            $("#calculator_ID" + var_id_cal)
                .css('display', 'none')
                .css('z-index', '1000')
                .css('backgroundColor', '#ffff')
                .css('border', ' #000 solid 2px')
                .css('border-radius', ' 5px')
                .css('boxShadow', '0px 0px 3px rgb(0, 0, 0)')
                .css('padding', '5px')
                .css('min-width', '180px')
                .css('min-height', '235px')
                .css('max-height', '235px')
                .css('width', '180px')
                .css('height', '235px');


            $(".calc_cls_btn_fermer")
                .css('position', 'absolute')
                .css('font-size', '19px')
                .css('top', '-11px')
                .css('right', '-1px')
                .css('padding', '0px')
                .css('margin', '0px')
                .css('cursor', 'pointer');

            $(".caclculator_btn")
                .css('height', '26px')
                .css('padding', ' 0px 7px 0px 7px')

            $(".calcula_div_btn")
                .css('padding', ' 0px 7px 0px 7px');

            var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (is_safari) {
                $(".calcul_row")
                    .css('textAlign', 'center  !important')

                $(".caclculator_btn")
                    .css('textAlign', 'center   !important')
                    .css('padding', '5px  !important')
                    .css('margin', 'auto 4px !important')
                    .css('height', '28px  !important')
                    .css('width', '70px !important');
            }
        }

        function insert(num, calss_champ) {


            if (num === "=" || (num === "/100" && (!$.isNumeric($(".myChampsCalc" + calss_champ).val())))) return;

            $(".myChampsCalc" + calss_champ).val(regex_calcu($(".myChampsCalc" + calss_champ).val() + num).trim());

        };

        function total($indic_cal) {
            $msg_err = settings.texts ? settings.texts["errorText"] : ($.calculator.regional[settings.language] ? $.calculator.regional[settings.language]["errorText"] : settings.texts["errorText"]);

            try {
                $resultat = eval($(".myChampsCalc" + $indic_cal).val()) + "".trim();

                if (!$.isNumeric($resultat))
                    $(".myChampsCalc" + $indic_cal).val($msg_err);

                else {
                    if (settings.precision >= 0) {
                        for (var i = 0; i < $resultat.length; i++) {

                            if ($resultat[i] === ".") {
                                $resultat = $resultat.substring(0, i + (settings.precision == 0 ? 0 : settings.precision + 1));
                                break;
                            }
                        }
                    }
                    $(".myChampsCalc" + $indic_cal).val($resultat);
                }
            } catch (error) {
                $(".myChampsCalc" + $indic_cal).val($msg_err);
            }
        }
        function clear($nbr_cal) {
            $(".myChampsCalc" + $nbr_cal).val('');
        }

        function key_tap_val($id_calc, $key_code) {

            $id_cal_id = "#calculator_ID" + $id_calc;

            $key_ = convert_code_en_lettre($key_code);
            for (var index in $('button[data-id="' + $id_calc + '"]')) {
                const el = $(index);
                el.css('boxShadow', '');
                if (el.text().trim() === $key_) {
                    el.css('boxShadow', '0px 0px 0px 3px #86929d');
                    setTimeout(function () { el.css('boxShadow', ''); }, 800);
                }
            }
        }

        function convert_code_en_lettre($code_key) {
            if ($code_key >= 96 && $code_key <= 105) {
                return (($code_key) - 96) + "";
            }
            else if ($code_key == 110) $code_key = ".";
            else if ($code_key == 109) $code_key = "-";
            else if ($code_key == 106) $code_key = "*";
            else if ($code_key == 107) $code_key = "+";
            else if ($code_key == 111) $code_key = "/";
            else if ($code_key == 165) $code_key = "%";

            else if ($code_key == 32 || $code_key == 67)
                $code_key = "C";

            else if ($code_key == 13 || $code_key == 61)
                $code_key = "=";

            return $code_key;
        }

        function regex_calcu($value) {


            $value = $value.replace(/[^0-9\-\/\+\*\.]+/g, '');

            $value = $value.replace(/(\.{2,}|\.\*|\.\+|\.\-|\.\/)/g, '.');

            $value = $value.replace(/(\*{2,}|\*\.|\*\+|\*\/)/g, '*');

            $value = $value.replace(/(\+{2,}|\+\.|\+\*|\+\/)/g, '+');

            $value = $value.replace(/(\-{2,}|\-\.|\-\*|\-\/)/g, '-');

            $value = $value.replace(/(\/{2,}|\/\.|\/\*|\/\+)/g, '/');

            $value = $value.replace(/(^[/.*+]|\-\+|\.[0-9]{1,}\.)/g, '');

            return $value;
        }

        function plusMoins($indi_insts) {

            var text_PM = $(".myChampsCalc" + $indi_insts).val();

            var debut = true, arr_Opr = new Array("*", "+", "-", "/");

            var nmb_Ary = text_PM.split('');

            for (var i_ = nmb_Ary.length; i_ >= 0; i_--) {

                if (jQuery.inArray(nmb_Ary[i_], arr_Opr) !== -1) {

                    if (nmb_Ary[i_] == "-") {
                        nmb_Ary[i_] = '+';
                        i_ = -1; debut = false;;
                    } else
                        if (nmb_Ary[i_] == "+") {
                            nmb_Ary[i_] = '-';
                            i_ = -1; debut = false;
                        } else
                            if (nmb_Ary[i_] == "*" || nmb_Ary[i_] == "/") {
                                nmb_Ary.splice(i_ + 1, 0, '-');
                                i_ = -1; debut = false;
                            }

                }
            };

            if (debut == false) return nmb_Ary.join('');

            if (nmb_Ary[0] + "" === "-") {
                nmb_Ary.splice(0, 0, '+');
            }

            else if ((nmb_Ary[0] === "+") || jQuery.inArray(nmb_Ary[0], arr_Opr) == -1)
                nmb_Ary.splice(0, 0, '-');



            nmb_Ary = nmb_Ary.join('');

            return nmb_Ary;

        }
        return this;
    }
    return this;
};



