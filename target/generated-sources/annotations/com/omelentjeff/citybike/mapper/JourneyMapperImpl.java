package com.omelentjeff.citybike.mapper;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.entity.Journey;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-14T19:56:23+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.1 (Eclipse Adoptium)"
)
@Component
public class JourneyMapperImpl implements JourneyMapper {

    @Override
    public JourneyDTO toDTO(Journey journey) {
        if ( journey == null ) {
            return null;
        }

        JourneyDTO journeyDTO = new JourneyDTO();

        journeyDTO.setId( journey.getId() );
        journeyDTO.setDepartureTime( journey.getDepartureTime() );
        journeyDTO.setReturnTime( journey.getReturnTime() );
        journeyDTO.setDepartureStation( journey.getDepartureStation() );
        journeyDTO.setReturnStation( journey.getReturnStation() );
        journeyDTO.setCoveredDistance( journey.getCoveredDistance() );
        journeyDTO.setDuration( journey.getDuration() );

        return journeyDTO;
    }

    @Override
    public Journey toEntity(JourneyDTO journeyDTO) {
        if ( journeyDTO == null ) {
            return null;
        }

        Journey journey = new Journey();

        journey.setId( journeyDTO.getId() );
        journey.setDepartureTime( journeyDTO.getDepartureTime() );
        journey.setReturnTime( journeyDTO.getReturnTime() );
        journey.setDepartureStation( journeyDTO.getDepartureStation() );
        journey.setReturnStation( journeyDTO.getReturnStation() );
        journey.setCoveredDistance( journeyDTO.getCoveredDistance() );
        journey.setDuration( journeyDTO.getDuration() );

        return journey;
    }
}
