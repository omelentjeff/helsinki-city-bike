package com.omelentjeff.citybike.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StationDTO {

    private int id;
    private String name;
    private String address;
    private String city;
}