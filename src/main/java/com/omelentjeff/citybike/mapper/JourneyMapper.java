package mapper;

import dto.JourneyDTO;
import entity.Journey;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JourneyMapper {
    JourneyMapper INSTANCE = Mappers.getMapper(JourneyMapper.class);

    JourneyDTO toDTO(Journey employee);

    Journey toEntity(JourneyDTO employeeDTO);
}
