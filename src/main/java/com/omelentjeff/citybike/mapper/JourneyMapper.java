package com.omelentjeff.citybike.mapper;

import com.omelentjeff.citybike.dto.JourneyDTO;
import com.omelentjeff.citybike.entity.Journey;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface JourneyMapper {
    JourneyMapper INSTANCE = Mappers.getMapper(JourneyMapper.class);

    JourneyDTO toDTO(Journey employee);

    Journey toEntity(JourneyDTO employeeDTO);
}
