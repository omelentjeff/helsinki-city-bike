package com.omelentjeff.citybike.dto;

import com.omelentjeff.citybike.entity.Station;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JourneyDTO {

    private long id;

    private LocalDateTime departureTime;

    private LocalDateTime returnTime;

    private Station departureStation;

    private Station returnStation;

    private int coveredDistance;

    private int duration;
}
