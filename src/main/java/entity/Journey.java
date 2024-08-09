package entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(mappedBy = "departureStation")
    private List<Journey> departingJourneys;
    
    @OneToMany(mappedBy = "returnStation")
    private List<Journey> returningJourneys;

    @Column(name = "covered_distance")
    private int coveredDistance;

    @Column(name = "duration")
    private int duration;
}
