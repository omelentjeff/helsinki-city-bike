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

    public Page<StationDTO> getAllStations(Pageable pageable) {
        Page<Station> stationPage = stationRepository.findAll(pageable);
        List<StationDTO> stationDTOs = stationPage.stream()
                .map(stationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(stationDTOs, pageable, stationPage.getTotalElements());
    }

    public StationDTO getStationById(long id) {
        Station tempStation = stationRepository.findById(id).orElseThrow(() -> new StationNotFoundException("Station with id: " + id + " not found"));
        return stationMapper.toDTO(tempStation);
    }

    public Page<StationDTO> searchStations(String name, String address, Pageable pageable) {
        Page<Station> stationPage = stationRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(name, address, pageable);

        List<StationDTO> stationDTOs = stationPage.stream()
                .map(stationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(stationDTOs, pageable, stationPage.getTotalElements());
    }
}