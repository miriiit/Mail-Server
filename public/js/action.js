const CallAjax = (options, cb) => {
         $.ajax(
            {
                type: options.type,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url: '',
                data: "userId=12345&userName=test",
                success: function (data) {
                    cb(null, data);
                },
                error: function (error) {
                    cb(error);
                }
            }
        ); 
        /* var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("demo").innerHTML = this.message;
            }
        };
        xhttp.open("POST", '', true);
        xhttp.send(); */
    }
    $('#btn-send-mail').on('click', () => {
        CallAjax({ url: 'send/mail', type: 'POST' }, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(result);
        });
    })
