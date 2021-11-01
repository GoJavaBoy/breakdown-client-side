package com.pigustralas.breakdown.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {

    @GetMapping("/index")
    public String showMainPage() {
        return "index";
    }

    @GetMapping("/right_place")
    public String showRightPlacePage() {
        return "map_page";
    }

    @GetMapping("/drop_off_place")
    public String showDropOffPlacePage() {
        return "drop_off_map_page";
    }

    @GetMapping("/address_manual")
    public String showPostcodeEntryPage() {
        return "address_manual";
    }

    @GetMapping("/do_you_know_address")
    public String showKnowAddressPage() {
        return "do_you_know_address";
    }

    @GetMapping("/is_it_right_address")
    public String showIsItRightAddressPage() {
        return "is_it_right_address";
    }

    @GetMapping("/vehicle_details")
    public String getVehicleDetailsPage() {
        return "vehicle_details";
    }

    @GetMapping("/personal_details")
    public String getPersonalDetailsPage() {
        return "personal_details";
    }

    @PostMapping("/personal_details")
    public String getPersonalDetails() {
        return "personal_details";
    }

    @GetMapping("/problem")
    public String getProblemPage() {
        return "problem";
    }

    @GetMapping("/successful")
    public String getSuccessfulPage() {
        return "successful_page";
    }
}