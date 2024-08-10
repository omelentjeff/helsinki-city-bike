package com.omelentjeff.citybike.controller;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.service.JourneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/journeys")
public class JourneyController {

    private final JourneyService journeyService;

    @Autowired
    public JourneyController(JourneyService journeyService) {
        this.journeyService = journeyService;
    }

    @GetMapping({"/", ""})
    public ResponseEntity<Page<JourneyDTO>> getAllJourneys(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<JourneyDTO> journeys = journeyService.getAllJourneys(pageable);
        return ResponseEntity.ok(journeys);
    }
}
