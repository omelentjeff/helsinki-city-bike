package com.omelentjeff.citybike.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "journeys")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "departure")
    private LocalDateTime departureTime;

    @Column(name = "return")
    private LocalDateTime returnTime;

    // Many journeys can depart from the same station
    @ManyToOne
    @JoinColumn(name = "departure_station_id", referencedColumnName = "id")
    private Station departureStation;

    // Many journeys can return to the same station
    @ManyToOne
    @JoinColumn(name = "return_station_id", referencedColumnName = "id")
    private Station returnStation;


    @Column(name = "covered_distance")
    private int coveredDistance;

    @Column(name = "duration")
    private int duration;
}
