package com.omelentjeff.citybike.service;

import com.omelentjeff.citybike.mapper.StationMapper;
import com.omelentjeff.citybike.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StationService {

    private final StationRepository stationRepository;
    private final StationMapper stationMapper;

    @Autowired
    public StationService(StationRepository stationRepository, StationMapper stationMapper) {
        this.stationRepository = stationRepository;
        this.stationMapper = stationMapper;
    }
}
