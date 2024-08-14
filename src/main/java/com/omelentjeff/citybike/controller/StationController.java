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
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<StationDTO> getStationById(@PathVariable long id) {
        return ResponseEntity.ok(stationService.getStationById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<StationDTO>> searchStations (
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<StationDTO> stations = stationService.searchStations(name, address, pageable);

        if (stations.hasContent()) {
            return ResponseEntity.ok(stations);
        }

        return ResponseEntity.noContent().build();
    }
}
