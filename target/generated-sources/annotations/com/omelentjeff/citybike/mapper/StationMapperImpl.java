package com.omelentjeff.citybike.mapper;

import com.omelentjeff.citybike.dto.StationDTO;
import com.omelentjeff.citybike.entity.Station;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-14T19:56:23+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.1 (Eclipse Adoptium)"
)
@Component
public class StationMapperImpl implements StationMapper {

    @Override
    public StationDTO toDTO(Station station) {
        if ( station == null ) {
            return null;
        }

        StationDTO stationDTO = new StationDTO();

        stationDTO.setId( station.getId() );
        stationDTO.setName( station.getName() );
        stationDTO.setAddress( station.getAddress() );
        stationDTO.setCity( station.getCity() );

        return stationDTO;
    }

    @Override
    public Station toEntity(StationDTO stationDTO) {
        if ( stationDTO == null ) {
            return null;
        }

        Station station = new Station();

        station.setId( stationDTO.getId() );
        station.setName( stationDTO.getName() );
        station.setAddress( stationDTO.getAddress() );
        station.setCity( stationDTO.getCity() );

        return station;
    }
}