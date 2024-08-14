package com.omelentjeff.citybike.service;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.entity.Journey;
import com.omelentjeff.citybike.exception.JourneyNotFoundException;
import com.omelentjeff.citybike.mapper.JourneyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.omelentjeff.citybike.repository.JourneyRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final JourneyMapper journeyMapper;

    @Autowired
    public JourneyService(JourneyRepository journeyRepository, JourneyMapper journeyMapper) {
        this.journeyRepository = journeyRepository;
        this.journeyMapper = journeyMapper;
    }

    public Page<JourneyDTO> getAllJourneys(Pageable pageable) {
        Page<Journey> journeyPage = journeyRepository.findAll(pageable);
        List<JourneyDTO> journeyDTOS = journeyPage.stream()
                .map(journeyMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(journeyDTOS, pageable, journeyPage.getTotalElements());
    }

    public JourneyDTO getJourneyById(long id) {
        Journey tempJourney = journeyRepository.findById(id).orElseThrow(() -> new JourneyNotFoundException("Journey with id: " + id + " not found"));
        return journeyMapper.toDTO(tempJourney);
    }
}


