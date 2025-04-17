package az.esam.kredit.kredit.services.internal.subscriber;

public class ContentHtml {

        public static final String subscribeHtmlContent = "<!DOCTYPE html>" +
                        "<html>" +
                        "<head>" +
                        "<style>" +
                        "body {font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;}" +
                        ".container {max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px;}"
                        +
                        ".header {background-color: #007BFF; padding: 20px; color: white; text-align: center; font-size: 24px;}"
                        +
                        ".content {padding: 20px; font-size: 16px; color: #333333;}" +
                        ".footer {background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #888888;}"
                        +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<div class='container'>" +
                        "<div class='header'>Wunderkingə xoş gəldiniz!</div>" +
                        "<div class='content'>" +
                        "<p>Salam,</p>" +
                        "<p>Bloqumuza abunə olduğunuz üçün təşəkkür edirik. Sizi Wunderkindin bir hissəsi kimi görməkdən məmnunuq!</p>"
                        +
                        "<p>Wunderking-dən ən son xəbərlər və yeniləmələr üçün bizi izləyin.</p>" +
                        "</div>" +
                        "<div class='footer'>" +
                        "© 2024 Wunderking. All rights reserved." +
                        "</div>" +
                        "</div>" +
                        "</body>" +
                        "</html>";

        public static String unSubscribeHtmlContent(String url) {
                String htmlContent = "<!DOCTYPE html>" +
                                "<html>" +
                                "<head>" +
                                "<style>" +
                                "body {font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;}" +
                                ".container {max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px;}"
                                +
                                ".header {background-color: #FF6B6B; padding: 20px; color: white; text-align: center; font-size: 24px;}"
                                +
                                ".content {padding: 20px; font-size: 16px; color: #333333;}" +
                                ".footer {background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #888888;}"
                                +
                                "</style>" +
                                "</head>" +
                                "<body>" +
                                "<div class='container'>" +
                                "<div class='header'>Abunəlikdən çıxmısınız</div>" +
                                "<div class='content'>" +
                                "<p>Salam,</p>" +
                                "<p>Getdiyinizi gördüyümüz üçün təəssüf edirik. Siz Wunderking bloqlarının abunəliyini uğurla ləğv etdiniz.</p>"
                                +
                                "<p>Fikrinizi dəyişsəniz, hər zaman <a href='" + url
                                + "'>yenidən abunə ola bilərsiniz</a></p>" +
                                "</div>" +
                                "<div class='footer'>" +
                                "© 2024 Wunderking. All rights reserved." +
                                "</div>" +
                                "</div>" +
                                "</body>" +
                                "</html>";
                return htmlContent;
        }
}
