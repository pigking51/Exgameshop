package dw.gameshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/login")
    public String login_form() {
        return "login_form";
    }

    @GetMapping("/articles")
    public String article() {
        return "article";
    }

    @GetMapping("/gameshop/index.html")
    public String index2(){return "index";}

    @GetMapping("/gameshop/login.html")
    public String login2(){return "login";}

    @GetMapping("/gameshop/mypage.html")
    public String mypage2(){return "mypage";}

    @GetMapping("/gameshop/singleProduct.html")
    public String singleProduct(){return "singleProduct";}

    @GetMapping("/gameshop/cart.html")
    public String cart2(){return "cart";}
}
