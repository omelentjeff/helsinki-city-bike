package com.omelentjeff.citybike.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StationDTO {

    private long id;
    private String name;
    private String address;
    private String city;
    private float x;
    private float y;
    private int numberOfJourneysStarting;
    private int numberOfJourneysReturning;
    private double averageDepartingJourneyDistance;
    private double averageReturningJourneyDistance;
}
