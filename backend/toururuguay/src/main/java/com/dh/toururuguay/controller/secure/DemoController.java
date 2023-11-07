package com.dh.toururuguay.controller.secure;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DemoController {

    @PostMapping(value="demo")
    public String welcome(){
        return "Bienvenido al entorno de rutas protegidas de TOURuguay";
    }
}
