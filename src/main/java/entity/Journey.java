package entity;

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

    @Column(name = "departure_station_id")
    private int departureStationId;

    @Column(name = "return_station_id")
    private int returnStationId;

    @Column(name = "covered_distance")
    private int coveredDistance;

    @Column(name = "duration")
    private int duration;
}
