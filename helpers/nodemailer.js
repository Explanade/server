// const nodemailer = require('nodemailer');

function mailer(receivers, name) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'afifahrk96@gmail.com',
            pass: 'Kust8672091AfRa'
        }
    });
    const mailOptions = {
        from: 'afifahrk96@gmail.com', // sender address
        to: receivers, // list of receivers
        subject: 'Subscription one-take', // Subject line
        html: `
    <!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Thanks!</title>
    <style type="text/css">
        img {
            max-width: 600px;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        a img {
            border: none;
        }

        table {
            border-collapse: collapse !important;
        }

        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .backgroundTable {
            margin: 0 auto;
            padding: 0;
            width: 100% !important;
        }

        table td {
            border-collapse: collapse;
        }

        .ExternalClass * {
            line-height: 115%;
        }

        /* General styling */

        td {
            font-family: Arial, sans-serif;
        }

        body {
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100%;
            height: 100%;
            color: #6f6f6f;
            font-weight: 400;
            font-size: 16px;
        }

        h1 {
            margin: 10px 0;
        }

        a {
            color: #27aa90;
            text-decoration: none;
        }

        .force-full-width {
            width: 100% !important;
        }

        .body-padding {
            padding: 0 75px;
        }
    </style>
    <style media="screen" type="text/css">
        @media screen {
            @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);

            * {
                font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
            }

            .w280 {
                width: 280px !important;
            }
        }
    </style>
    <style media="only screen and (max-width: 480px)" type="text/css">
        @media only screen and (max-width: 480px) {
            table[class*="w320"] {
                width: 320px !important;
            }

            td[class*="w320"] {
                width: 280px !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            img[class*="w320"] {
                width: 250px !important;
                height: 67px !important;
            }

            td[class*="mobile-spacing"] {
                padding-top: 10px !important;
                padding-bottom: 10px !important;
            }

            *[class*="mobile-hide"] {
                display: none !important;
            }

            *[class*="mobile-br"] {
                font-size: 12px !important;
            }

            td[class*="mobile-w20"] {
                width: 20px !important;
            }

            img[class*="mobile-w20"] {
                width: 20px !important;
            }

            td[class*="mobile-center"] {
                text-align: center !important;
            }

            table[class*="w100p"] {
                width: 100% !important;
            }

            td[class*="activate-now"] {
                padding-right: 0 !important;
                padding-top: 20px !important;
            }
        }
    </style>
</head>

<body bgcolor="#FFFFFF" class="body"
    style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none">
    <table align="center" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td align="center" style="background-color:#ffffff" valign="top" width="100%">
                    <center>
                        <table cellpadding="0" cellspacing="0" class="w320" width="600">
                            <tbody>
                                <tr>
                                    <td align="center" valign="top">
                                        <table cellpadding="0" cellspacing="0" style="margin:0 auto;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#58585B"
                                                        style="text-align: center; background-color: rgb(224, 172, 77)"
                                                        ;>
                                                        <a href="/"> <img alt="company logo" class="500" height="70"
                                                                src="../../client/image/one-take.jpg"
                                                                style="border-radius:50%;">
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table cellpadding="0" cellspacing="0" style="background-color:#58585b;"
                                            width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="background-color:#ffffff;">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                        </table>

                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <center>
                                                                            <div><br>
                                                                                <br>
                                                                                <img src="https://www.filepicker.io/api/file/HzTafLg5RVCRZkzEmxqN"
                                                                                    style="max-width:100%; display:block;">
                                                                            </div>
                                                                        </center>
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                            <tbody>
                                                                <tr>
                                                                    <td class="mobile-spacing"
                                                                        style="font-size:40px; font-weight: 600; color: #58585b; text-align:center;">
                                                                        <div class="mobile-br">
                                                                            <br>
                                                                        </div>
                                                                        Hi
                                                                        <span id="first_name">
                                                                            ${name}
                                                                        </span>!
                                                                        <br>
                                                                        <br>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td class="w320 mobile-spacing"
                                                                        style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;">
                                                                        Thank you for your subscribe <b>One-take</b>!
                                                                        influence the world has never been easier with
                                                                        one-take!
                                                                        <br>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="background-color:#ffffff;">
                                                        <table cellpadding="0" cellspacing="0" class="force-full-width">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="mobile-center body-padding w320"
                                                                        style="text-align:left;">
                                                                        <br>
                                                                        <center>
                                                                        </center>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table cellpadding="10" cellspacing="0" style="margin:0 auto;"
                                                            width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="text-align:center; margin:0 auto;">
                                                                        <br>

                                                                        <div>
                                                                            <!--[if mso]> <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.sendwithus.com" style="height:45px;v-text-anchor:middle;width:180px;" stroke="f" fillcolor="#f5774e"> <w:anchorlock></w:anchorlock> <center> <![endif]-->
                                                                            <a href=""
                                                                                style="background-color:#585858;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:180px;-webkit-text-size-adjust:none;">
                                                                                <span id="button_text">
                                                                                    one-take
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                        <br>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table bgcolor="#363636" cellpadding="0" cellspacing="0"
                                                            class="force-full-width"
                                                            style="text-align: center; background-color: rgb(224, 172, 77)">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        style="background-color:#58585b; text-align:center;">
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td
                                                                        style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                                                                        <br>
                                                                        <br>
                                                                        <br>
                                                                        <br>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td style="font-size:12px;">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
    `// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            throw err
        else
            console.log(info);
    });
}

module.exports = mailer