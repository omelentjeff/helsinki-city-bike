package com.omelentjeff.citybike.controller;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.dto.StationDTO;
import com.omelentjeff.citybike.service.StationService;
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
@RequestMapping("api/stations")
public class StationController {

    private final StationService stationService;

    @Autowired
    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping({"/", ""})
    public ResponseEntity<Page<StationDTO>> getAllStations(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<StationDTO> stations = stationService.getAllStations(pageable);
        return ResponseEntity.ok(stations);
    }
}
