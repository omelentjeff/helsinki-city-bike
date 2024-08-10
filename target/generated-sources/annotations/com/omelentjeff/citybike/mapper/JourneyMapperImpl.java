package com.omelentjeff.citybike.mapper;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.entity.Journey;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-10T08:21:32+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.1 (Eclipse Adoptium)"
)
@Component
public class JourneyMapperImpl implements JourneyMapper {

    @Override
    public JourneyDTO toDTO(Journey employee) {
        if ( employee == null ) {
            return null;
        }

        JourneyDTO journeyDTO = new JourneyDTO();

        journeyDTO.setId( employee.getId() );
        journeyDTO.setDepartureTime( employee.getDepartureTime() );
        journeyDTO.setReturnTime( employee.getReturnTime() );
        journeyDTO.setDepartureStation( employee.getDepartureStation() );
        journeyDTO.setReturnStation( employee.getReturnStation() );
        journeyDTO.setCoveredDistance( employee.getCoveredDistance() );
        journeyDTO.setDuration( employee.getDuration() );

        return journeyDTO;
    }

    @Override
    public Journey toEntity(JourneyDTO employeeDTO) {
        if ( employeeDTO == null ) {
            return null;
        }

        Journey journey = new Journey();

        journey.setId( (int) employeeDTO.getId() );
        journey.setDepartureTime( employeeDTO.getDepartureTime() );
        journey.setReturnTime( employeeDTO.getReturnTime() );
        journey.setDepartureStation( employeeDTO.getDepartureStation() );
        journey.setReturnStation( employeeDTO.getReturnStation() );
        journey.setCoveredDistance( employeeDTO.getCoveredDistance() );
        journey.setDuration( employeeDTO.getDuration() );

        return journey;
    }
}
