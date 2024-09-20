package com.omelentjeff.citybike.service;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.dto.StationDTO;
import com.omelentjeff.citybike.entity.Journey;
import com.omelentjeff.citybike.entity.Station;
import com.omelentjeff.citybike.exception.JourneyNotFoundException;
import com.omelentjeff.citybike.exception.StationNotFoundException;
import com.omelentjeff.citybike.mapper.StationMapper;
import com.omelentjeff.citybike.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StationService {

    private final StationRepository stationRepository;
    private final StationMapper stationMapper;

    @Autowired
    public StationService(StationRepository stationRepository, StationMapper stationMapper) {
        this.stationRepository = stationRepository;
        this.stationMapper = stationMapper;
    }

    @Cacheable(value = "stations", key = "'page:' + #pageable.pageNumber + ',size:' + #pageable.pageSize + ',sort:' + #pageable.sort.toString()")
    public Page<StationDTO> getAllStations(Pageable pageable) {
        Page<Station> stationPage = stationRepository.findAll(pageable);
        List<StationDTO> stationDTOs = stationPage.stream()
                .map(stationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(stationDTOs, pageable, stationPage.getTotalElements());
    }

    @Cacheable(value = "station", key = "#id")
    public StationDTO getStationById(long id) {
        Station tempStation = stationRepository.findById(id).orElseThrow(() -> new StationNotFoundException("Station with id: " + id + " not found"));

        int totalJourneysStarting = getTotalNumberOfJourneysStarting(tempStation);
        int totalJourneysEnding = getTotalNumberOfJourneysReturning(tempStation);
        double averageDepartingJourneysDistance = getAverageDepartingJourneyDistance(tempStation);

        StationDTO stationDTO = stationMapper.toDTO(tempStation);
        stationDTO.setNumberOfJourneysStarting(totalJourneysStarting);
        stationDTO.setNumberOfJourneysReturning(totalJourneysEnding);
        stationDTO.setAverageReturningJourneyDistance(averageDepartingJourneysDistance);

        return stationDTO;
    }

    public Page<StationDTO> searchStations(String name, String address, Pageable pageable) {
        Page<Station> stationPage = stationRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(name, address, pageable);

        List<StationDTO> stationDTOs = stationPage.stream()
                .map(stationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(stationDTOs, pageable, stationPage.getTotalElements());
    }

    private int getTotalNumberOfJourneysStarting(Station station) {
        return station.getDepartingJourneys().size();
    }

    private int getTotalNumberOfJourneysReturning(Station station) {
        return station.getReturningJourneys().size();
    }

    private double getAverageDepartingJourneyDistance(Station station) {
        List<Journey> departingJourneys = station.getDepartingJourneys();
        double averageDistance = departingJourneys.stream()
                .mapToDouble(Journey::getCoveredDistance)
                .average()
                .orElse(0.0);

        // Round to 2 decimal places
        return Math.round(averageDistance * 100.0) / 100.0;
    }
}
