package service;

import dto.JourneyDTO;
import entity.Journey;
import mapper.JourneyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import repository.JourneyRepository;

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
        // Validate and adjust pageable parameters
        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();

        // Handle negative page numbers
        if (pageNumber < 0) {
            pageNumber = 0;
        }

        // Calculate total pages to handle large page numbers
        long total = journeyRepository.count();
        int totalPages = (int) Math.ceil((double) total / pageSize);

        // Handle excessively large page numbers
        if (pageNumber >= totalPages) {
            pageNumber = totalPages - 1;
        }

        // Create a corrected Pageable object
        Pageable correctedPageable = PageRequest.of(pageNumber, pageSize, pageable.getSort());

        Page<Journey> employeePage = journeyRepository.findAll(correctedPageable);
        List<JourneyDTO> employeeDTOs = employeePage.stream()
                .map(journeyMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(employeeDTOs, correctedPageable, total);
    }
}


