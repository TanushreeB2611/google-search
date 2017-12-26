$(document).ready(function () {
    var alreadyFilled = false;
    var list = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    function initDialog() {
        clearDialog();
        for (var i = 0; i < list.length; i++) {
            $('.dialog').append('<div>' + list[i] + '</div>');
        }
    }

    function clearDialog() {
        $('.searchList').empty();
        $('.suggestionList').hide();
    }

    $('.search input').click(function () {
        if (!alreadyFilled) {
            $('.searchList').addClass('open');
        }
    });

    $('body').on('click', '.searchList > div', function () {
        $('.search input').val($(this).text()).focus();
        $('.search .close').addClass('visible');
        alreadyFilled = true;
        $('.suggestionList').show();
    });

    $('.search .close').click(function () {
        alreadyFilled = false;
        $('.searchList').addClass('open');
        $('.search input').val('').focus();
        $(this).removeClass('visible');
    });

    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var i = 0; i < list.length; i++) {
            if (list[i].toLowerCase().startsWith(str)) {
                $('.searchList').append('<div>' + list[i] + '</div>');
            }
        }
    }
    $('.search input').on('input', function () {
        $('.searchList').addClass('open');
        alreadyFilled = false;
        match($(this).val());
    });

    $('body').click(function (e) {
        if (!$(e.target).is("input, .close")) {
            $('.searchList').removeClass('open');
        }
    });

    $('.tablinks').click(function (e) {        
        onTabSelected(e, e.target.textContent);
        fetchTabData(e.target.textContent);
    });

    function onTabSelected(evt, tabId) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabId).style.display = "block";
        evt.currentTarget.className += " active";
    }
    initDialog();

    function fetchTabData(id) {
        $.ajax({
            url: id+".json",
            //data: { id: id },
            type: "GET",
            dataType: "json",
            success: function (json) {    
                var html = " ";            
                json.forEach(function(data) {
                var obj = JSON.parse(JSON.stringify(data));
                html= html + "<br><h3><a href='https://www.google.co.in/search?q=id'>"+obj.title+''+"</a></h3><p>"+obj.description+"</p>";
                });
                $('#'+id).html(html);
            },
            error: function (error) {
                alert("Failed to fetch data for Tab");
            }
        })
    }
});