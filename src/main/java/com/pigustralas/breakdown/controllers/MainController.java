package com.pigustralas.breakdown.controllers;

import com.pigustralas.breakdown.models.Address;
import com.pigustralas.breakdown.repo.BreakdownRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {
    @Autowired
    private BreakdownRepo breakdownRepo;

    @GetMapping("/index")
    public String showMainPage() {
        return "index";
    }

    @GetMapping("/right_place")
    public String showRightPlacePage() {
        return "map_page";
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

    @GetMapping("/testMap")
    public String tesMap() {
        return "test";
    }

    @GetMapping("/successful")
    public String getSuccessfulPage() {
        return "successful_page";
    }


}