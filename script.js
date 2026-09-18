(function() {
    // URL Google Apps Script Anda yang sudah di-encode ke Base64 (Aman dari intipan publik)
    var _0xEncEndpoint = "dHRwczovL3NjcmlwdC5nb29nbGUuY29tL21hY3Jvcy9zL0FLZnljYnlkQjY3RUswRkpoWXJvTHFFejhOSl9IQ3pIeVgyQW4zR2JpMkRtRFVVejN3Wm9HUW1tbVpyWTdDd1ZycWt2eWZpUS9leGVj";
    
    // Fungsi internal untuk mendekode URL secara dinamis saat runtime di browser
    function _resolveEndpoint() {
        try {
            return atob(_0xEncEndpoint);
        } catch (e) {
            return "";
        }
    }

    window.GoSmartVerify = function(licenseKey, callback) {
        var dataLicense = licenseKey.split('-');
        var arrayIndex = dataLicense[dataLicense.length - 1];
        var targetUrl = _resolveEndpoint();

        if (!targetUrl) {
            console.error("Gagal memuat parameter otorisasi sistem.");
            return;
        }

        $.ajax({
            url: targetUrl,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var jsonUsers = data.user || [];
                var sheetLicense = jsonUsers[arrayIndex];

                if (!sheetLicense) {
                    callback({ valid: false, message: "Lisensi tidak terdaftar dalam database." });
                    return;
                }

                // Pengecekan Masa Aktif (Expired Date 1 Tahun / Custom)
                var expiryDateStr = sheetLicense.expiredDate; // Format: "YYYY-MM-DD" atau "SEUMUR HIDUP (LIFETIME)"
                
                if (expiryDateStr && expiryDateStr !== "SEUMUR HIDUP (LIFETIME)") {
                    var expiryTime = new Date(expiryDateStr).getTime();
                    var currentTime = new Date().getTime();

                    if (currentTime > expiryTime) {
                        callback({ valid: false, message: "Masa aktif lisensi template Anda telah kedaluwarsa (Expired)!" });
                        return;
                    }
                }

                // Jika lolos semua validasi
                callback({ 
                    valid: true, 
                    token: sheetLicense.token, 
                    expiredDate: expiryDateStr,
                    message: "Lisensi Sah dan Aktif." 
                });
            },
            error: function (err) {
                console.error("Gagal terhubung ke server validasi lisensi.");
                callback({ valid: false, message: "Server lisensi sedang gangguan." });
            }
        });
    };
})();
