(function() {
    var gasEndpoint = "https://script.google.com/macros/s/AKfycbydB67EK0FJhYroLqEz8NJ_HCzHyX2An3Gbi2DmDUUz3wZoGQmmmZrY7CwVrqkvyfiQ/exec";
    
    window.GoSmartVerify = function(licenseKey, callback) {
        var dataLicense = licenseKey.split('-');
        var arrayIndex = dataLicense[dataLicense.length - 1];

        $.ajax({
            url: gasEndpoint,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var jsonUsers = data.user || [];
                var sheetLicense = jsonUsers[arrayIndex];
                callback(sheetLicense);
            },
            error: function (err) {
                console.error("Gagal memuat sistem lisensi.");
            }
        });
    };
})();
