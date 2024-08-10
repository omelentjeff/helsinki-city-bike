package com.omelentjeff.citybike.mapper;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.dto.StationDTO;
import com.omelentjeff.citybike.entity.Journey;
import com.omelentjeff.citybike.entity.Station;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StationMapper {

    StationMapper INSTANCE = Mappers.getMapper(StationMapper.class);

    StationDTO toDTO(Station station);

    Station toEntity(StationDTO stationDTO);
}
